import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import IndexPage from "./pages/IndexPage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import FunPage from "./pages/FunPage";
import ContactPage from "./pages/ContactPage";

// 中英文共用同一組頁面，差別只在網址有沒有 /en 前綴
const pageRoutes = (
  <>
    <Route index element={<IndexPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="projects" element={<ProjectsPage />} />
    <Route path="fun" element={<FunPage />} />
    <Route path="contact" element={<ContactPage />} />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          {pageRoutes}
        </Route>
        <Route path="/en" element={<PageLayout />}>
          {pageRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
