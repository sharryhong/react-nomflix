import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

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
const Movie = styled(motion.li)`
  background-color: yellow;
  height: 200px;
  color: red;
`;

const rowVariants = {
  hidden: { x: window.innerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.innerWidth - 5 },
};

function Slider() {
  const [isClickable, setIsClickable] = useState(true);
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (!isClickable) return;
    toggleClickable();
    setIndex((prev) => prev + 1);
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
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Movie key={i}>{i}</Movie>
          ))}
        </Row>
      </AnimatePresence>
    </Container>
  );
}

export default Slider;
