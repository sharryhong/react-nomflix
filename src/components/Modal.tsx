import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;
const ModalBox = styled(motion.div)`
  position: relative;
  width: 500px;
  border-radius: 0.5em;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

interface IProps {
  isShow: boolean;
  id?: string;
  children?: React.ReactNode;
}

function Modal({ isShow, id, children }: IProps) {
  const navigate = useNavigate();
  const onClose = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <Overlay
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            onClose();
          }}
        >
          <ModalBox
            layoutId={id}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </ModalBox>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Modal;
