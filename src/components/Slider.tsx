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
  padding-top: 140%;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

const rowVariants = {
  hidden: { x: window.innerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.innerWidth - 5 },
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
              bgphoto={makeImagePath(item.poster_path, "w300")}
            />
          ))}
        </Row>
      </AnimatePresence>
    </Container>
  );
}

export default Slider;
