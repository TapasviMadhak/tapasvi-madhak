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
    const firstUseful = paragraphs
      .map((section) => cleanMarkdown(section))
      .find((section) => section.length >= 20);

    if (!firstUseful) {
      return null;
    }

    return firstUseful.length <= 180 ? firstUseful : `${firstUseful.slice(0, 177).trim()}...`;
  }

  const summary = cleanMarkdown(candidate);
  if (summary.length <= 180) {
    return summary;
  }

  return `${summary.slice(0, 177).trim()}...`;
};

const decodeBase64Utf8 = (base64Text) => {
  const binary = atob(base64Text);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder('utf-8').decode(bytes);
};

const fetchReadmeText = async (owner, repoName, defaultBranch) => {
  // GitHub API handles README name variations (README.md/readme.md/README.rst) in one endpoint.
  const readmeApiUrl = `https://api.github.com/repos/${owner}/${repoName}/readme`;
  const apiResponse = await fetch(readmeApiUrl, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (apiResponse.ok) {
    const payload = await apiResponse.json();
    if (payload?.content) {
      return decodeBase64Utf8(payload.content.replace(/\n/g, ''));
    }
  }

  const branchesToTry = [defaultBranch, 'main', 'master'].filter(Boolean);
  const fileNames = ['README.md', 'readme.md', 'README.MD'];

  for (const branch of branchesToTry) {
    for (const fileName of fileNames) {
      const rawReadmeUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${fileName}`;
      const response = await fetch(rawReadmeUrl);
      if (response.ok) {
        return response.text();
      }
    }
  }

  return null;
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
