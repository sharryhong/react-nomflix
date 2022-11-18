import { IMovie } from "api";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "utils";

const Container = styled.div`
  position: relative;
  top: -5em;
`;
const Row = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
const Movie = styled(motion.li)<{ bgphoto: string }>`
  width: 100%;
  height: 0;
  padding-top: 56%;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  width: 100%;
  opacity: 0;
  padding: 0.5em;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.black.darker};
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
  movies: IMovie[];
}

function Slider({ movies }: IProps) {
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

  return (
    <Container onClick={increaseIndex}>
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
              key={item.id}
              bgphoto={makeImagePath(
                item.backdrop_path || item.poster_path,
                "w300"
              )}
              variants={movieVariants}
              initial="initial"
              whileHover="hover"
              transition={{ type: "tween" }}
            >
              <Info variants={InfoVariant}>
                <h3>{item.title}</h3>
              </Info>
            </Movie>
          ))}
        </Row>
      </AnimatePresence>
    </Container>
  );
}

export default Slider;
