import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Tv from "./components/pages/Tv";

function router() {
  return (
    <Routes>
      <Route path={`/`} element={<Navigate replace to={`/movies`} />} />
      <Route path={`/movies`} element={<Home />} />
      <Route path={`/movies/:movieId`} element={<Home />} />
      <Route path={`/tv`} element={<Tv />} />
      <Route path={`/tv/:tvId`} element={<Tv />} />
      <Route path={`/search`} element={<Search />} />
      <Route path={`/search/:id`} element={<Search />} />
    </Routes>
  );
}

export default router;
