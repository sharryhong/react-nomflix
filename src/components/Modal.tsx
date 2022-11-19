import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;
const ModalBox = styled(motion.div)`
  width: 80vw;
  height: 80vh;
  background-color: yellow;
`;

interface IProps {
  isShow: boolean;
  id?: string;
  children?: React.ReactNode;
}

function Modal({ isShow, id, children }: IProps) {
  return (
    <AnimatePresence>
      {isShow && (
        <Container>
          <ModalBox layoutId={id}>{children}</ModalBox>
        </Container>
      )}
    </AnimatePresence>
  );
}

export default Modal;
