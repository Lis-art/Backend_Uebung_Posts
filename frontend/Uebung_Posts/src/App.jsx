import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import EditPage from "./pages/EditPage";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogPage" element={<BlogPage />} />
          <Route path="/editPage" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
