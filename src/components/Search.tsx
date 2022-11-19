import React from "react";
import { useLocation } from "react-router-dom";

function Search() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get("keyword");

  return <div>Search</div>;
}

export default Search;
