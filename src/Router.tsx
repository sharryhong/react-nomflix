import PageNotFound from "components/pages/PageNotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Tv from "./components/pages/Tv";

function router() {
  return (
    <Routes>
      <Route
        path={`${process.env.PUBLIC_URL}/`}
        element={<Navigate replace to={`${process.env.PUBLIC_URL}/movies`} />}
      />
      <Route path={`${process.env.PUBLIC_URL}/movies`} element={<Home />} />
      <Route
        path={`${process.env.PUBLIC_URL}/movies/:movieId`}
        element={<Home />}
      />
      <Route path={`${process.env.PUBLIC_URL}/tv`} element={<Tv />} />
      <Route path={`${process.env.PUBLIC_URL}/tv/:tvId`} element={<Tv />} />
      <Route path={`${process.env.PUBLIC_URL}/search`} element={<Search />} />
      <Route
        path={`${process.env.PUBLIC_URL}/search/:id`}
        element={<Search />}
      />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
}

export default router;
