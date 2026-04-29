import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout   from './Layout';
import Home     from './pages/Home';
import Skills   from './pages/Skills';
import Projects from './pages/Projects';
import Blog     from './pages/Blog';
import Contact  from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index          element={<Home />}     />
          <Route path="skills"  element={<Skills />}   />
          <Route path="projects" element={<Projects />} />
          <Route path="blog"    element={<Blog />}     />
          <Route path="contact" element={<Contact />}  />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
