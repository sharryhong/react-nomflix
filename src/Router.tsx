import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Search from "./components/Search";
import Tv from "./components/Tv";

function router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/tv" element={<Tv />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default router;
