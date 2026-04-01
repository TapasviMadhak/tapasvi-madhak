const cleanMarkdown = (markdownText) => {
  return markdownText
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[>#*_~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getReadmeSummary = (markdown) => {
  if (!markdown) {
    return null;
  }

  const paragraphs = markdown
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((section) => section.trim())
    .filter(Boolean);

  const candidate = paragraphs.find((section) => {
    if (section.startsWith('#') || section.startsWith('![') || section.startsWith('[![')) {
      return false;
    }

    const cleaned = cleanMarkdown(section);
    return cleaned.length >= 40;
  });

  if (!candidate) {
    return null;
  }

  const summary = cleanMarkdown(candidate);
  if (summary.length <= 180) {
    return summary;
  }

  return `${summary.slice(0, 177).trim()}...`;
};

const fetchReadmeText = async (owner, repoName, defaultBranch) => {
  const rawReadmeUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${defaultBranch}/README.md`;
  const response = await fetch(rawReadmeUrl);

  if (!response.ok) {
    return null;
  }

  return response.text();
};

export const fetchLiveGithubProjects = async (username, fallbackProjects) => {
  const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

  if (!reposResponse.ok) {
    throw new Error(`GitHub API request failed with status ${reposResponse.status}`);
  }

  const repos = await reposResponse.json();
  if (!Array.isArray(repos)) {
    return fallbackProjects;
  }

  const nonForkRepos = repos.filter((repo) => !repo.fork);
  if (nonForkRepos.length === 0) {
    return fallbackProjects;
  }

  const projects = await Promise.all(
    nonForkRepos.map(async (repo) => {
      let readmeSummary = null;

      try {
        const readmeText = await fetchReadmeText(repo.owner?.login || username, repo.name, repo.default_branch || 'main');
        readmeSummary = getReadmeSummary(readmeText);
      } catch (error) {
        console.warn(`README fetch failed for ${repo.name}:`, error);
      }

      return {
        title: repo.name,
        tag: repo.language ? `${repo.language} Repository` : 'GitHub Repository',
        text: readmeSummary || repo.description || 'No README description available yet.',
        link: repo.html_url,
        stack: repo.language || 'Codebase',
      };
    })
  );

  return projects;
};
