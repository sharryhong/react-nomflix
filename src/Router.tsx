import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Tv from "./components/Tv";

function router() {
  return (
    <Routes>
      <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
      <Route path={`${process.env.PUBLIC_URL}/tv`} element={<Tv />} />
      <Route path={`${process.env.PUBLIC_URL}/search`} element={<Search />} />
    </Routes>
  );
}

export default router;
