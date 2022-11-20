import { IMovie } from "api";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";

const Container = styled.div`
  position: relative;
  top: -5em;
  height: 150px;
  margin-bottom: 3em;
`;
const Title = styled.strong`
  font-size: 1.5rem;
  margin: 12px;
`;
const Row = styled(motion.ul)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  top: 32px;
`;
const Movie = styled(motion.li)`
  width: 100%;
  height: 120px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Info = styled(motion.div)`
  width: 100%;
  opacity: 0;
  padding: 0.5em;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.black.darker};
`;
const Button = styled(motion.button)`
  position: absolute;
  color: white;
  top: calc(50% + 18px);
  transform: translateY(-50%);
  z-index: 20;
  width: 30px;
  svg {
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  }
`;
const PrevButton = styled(Button)`
  left: 12px;
`;
const NextButton = styled(Button)`
  right: 12px;
`;
const Popular = styled.span`
  position: absolute;
  bottom: -15px;
  font-size: 7rem;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
  -webkit-text-fill-color: rgba(0, 0, 0, 0.2);
`;

interface IVariants {
  isPrev: Boolean;
}

const rowVariants = {
  hidden: ({ isPrev }: IVariants) => ({
    x: isPrev ? -(window.innerWidth + 5) : window.innerWidth + 5,
  }),
  visible: { x: 0 },
  exit: ({ isPrev }: IVariants) => ({
    x: isPrev ? window.innerWidth + 5 : -(window.innerWidth + 5),
  }),
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
  title?: string;
  ranking?: boolean;
  movies: IMovie[];
  selectMovie: (item: IMovie, title: string) => void;
}

function Slider({ title, ranking, movies, selectMovie }: IProps) {
  const navigate = useNavigate();

  const offset = 6;
  const totalMovies = movies.length;
  const maxIndex = Math.floor(totalMovies / offset) - 1;

  const [isClickable, setIsClickable] = useState(true);
  const [index, setIndex] = useState(0);
  const [isPrev, setIsPrev] = useState(false);

  const increaseIndex = () => {
    if (!isClickable) return;
    setIsPrev(false);
    toggleClickable();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const decreaseIndex = () => {
    if (!isClickable) return;
    setIsPrev(true);
    toggleClickable();
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  const toggleClickable = () => setIsClickable((prev) => !prev);
  const onClickMovie = (item: IMovie, title: string) => {
    selectMovie(item, title);
    navigate(`${process.env.PUBLIC_URL}/movies/${String(item.id)}`);
  };

  return (
    <Container>
      <Title>{title}</Title>
      <PrevButton onClick={decreaseIndex}>
        {/* <motion.svg
          fill="rgba(255,255,255,0.5)"
          whileHover={{ fill: "rgba(255,255,255,0.8)" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
        </motion.svg> */}
        <motion.svg
          fill="rgba(255,255,255,0.5)"
          whileHover={{ fill: "rgba(255,255,255,0.8)" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
        </motion.svg>
      </PrevButton>
      <AnimatePresence
        initial={false}
        custom={{ isPrev }}
        onExitComplete={toggleClickable}
      >
        <Row
          variants={rowVariants}
          custom={{ isPrev }}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {movies
            .slice(index * offset, index * offset + offset)
            .map((item, i) => (
              <Movie
                layoutId={`${title}${item.id}`}
                key={item.id}
                variants={movieVariants}
                initial="initial"
                whileHover="hover"
                transition={{ type: "tween" }}
                onClick={() => onClickMovie(item, `${title}`)}
              >
                {ranking && <Popular>{i + 1 + index * offset}</Popular>}
                <Img
                  src={makeImagePath(
                    item.backdrop_path || item.poster_path,
                    "w300"
                  )}
                />
                <Info variants={InfoVariant}>
                  <h3>{item.title}</h3>
                </Info>
              </Movie>
            ))}
        </Row>
      </AnimatePresence>
      <NextButton onClick={increaseIndex}>
        <motion.svg
          fill="rgba(255,255,255,0.5)"
          whileHover={{ fill: "rgba(255,255,255,0.8)" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
        </motion.svg>
      </NextButton>
    </Container>
  );
}

export default Slider;
