import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Tv from "./components/Tv";

function router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tv" element={<Tv />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default router;
