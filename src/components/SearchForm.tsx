import * as S from "styles/header";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IForm {
  keyword: string;
}

function SearchForm() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchControls = useAnimationControls();
  const { register, handleSubmit, setFocus, setValue } = useForm<IForm>();
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    isSearchOpen
      ? searchControls.start({ scaleX: 0 })
      : searchControls.start({ scaleX: 1 });
  };
  const onValid = ({ keyword }: IForm) => {
    navigate(`${process.env.PUBLIC_URL}/search?keyword=${keyword}`);
    setValue("keyword", "");
  };

  useEffect(() => {
    setFocus("keyword");
  }, [setFocus]);

  return (
    <S.Search onSubmit={handleSubmit(onValid)}>
      <S.SearchButton onClick={toggleSearch}>
        <motion.svg
          animate={{ x: isSearchOpen ? -187 : 0 }}
          transition={{ type: "linear" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
        </motion.svg>
      </S.SearchButton>
      <S.Input
        {...register("keyword", { required: true })}
        animate={searchControls}
        initial={{ scaleX: 0 }}
        transition={{ type: "linear" }}
        placeholder="Search for movie or TV show"
      />
    </S.Search>
  );
}

export default SearchForm;
