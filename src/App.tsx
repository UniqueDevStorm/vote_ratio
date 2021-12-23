import { BrowserRouter, Routes, Route } from "react-router-dom";

import Manage from "./pages/manage";
import Index from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </BrowserRouter>
  );
}
