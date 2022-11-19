import { IMovie } from "api";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";

const Container = styled.div`
  position: relative;
  top: -5em;
`;
const Title = styled.strong`
  font-size: 1.5rem;
  margin-left: 0.5em;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  z-index: 10;
  top: 32px;
  width: 100%;
`;
const Movie = styled(motion.ul)<{ bgphoto: string }>`
  width: 100%;
  height: 0;
  padding-top: 56%;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.li)`
  width: 100%;
  opacity: 0;
  padding: 0.5em;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.black.darker};
`;
const Button = styled(motion.button)`
  position: absolute;
  color: white;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  width: 30px;
`;

const rowVariants = {
  hidden: { x: window.innerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.innerWidth - 5 },
};
const movieVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.2, duration: 0.3, type: "tween" },
  },
};
const InfoVariant = {
  hover: {
    opacity: 1,
    transition: { delay: 0.2, duration: 0.3, type: "tween" },
  },
};

interface IProps {
  title: string;
  movies: IMovie[];
  selectMovie: (item: IMovie) => void;
}

function Slider({ title, movies, selectMovie }: IProps) {
  const navigate = useNavigate();

  const offset = 6;
  const totalMovies = movies.length;
  const maxIndex = Math.floor(totalMovies / offset) - 1;

  const [isClickable, setIsClickable] = useState(true);
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (!isClickable) return;
    toggleClickable();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const toggleClickable = () => setIsClickable((prev) => !prev);
  const onClickMovie = (item: IMovie) => {
    selectMovie(item);
    navigate(`${process.env.PUBLIC_URL}/movies/${String(item.id)}`);
  };

  return (
    <Container>
      <Title>{title}</Title>
      <AnimatePresence initial={false} onExitComplete={toggleClickable}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {movies.slice(index * offset, index * offset + offset).map((item) => (
            <Movie
              layoutId={`${item.id}`}
              key={item.id}
              bgphoto={makeImagePath(
                item.backdrop_path || item.poster_path,
                "w300"
              )}
              variants={movieVariants}
              initial="initial"
              whileHover="hover"
              transition={{ type: "tween" }}
              onClick={() => onClickMovie(item)}
            >
              <Info variants={InfoVariant}>
                <h3>{item.title}</h3>
              </Info>
            </Movie>
          ))}
        </Row>
      </AnimatePresence>
      <Button onClick={increaseIndex}>
        <motion.svg
          fill="rgba(255,255,255,0.3)"
          whileHover={{ fill: "rgba(255,255,255,0.8)" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
        </motion.svg>
      </Button>
    </Container>
  );
}

export default Slider;
