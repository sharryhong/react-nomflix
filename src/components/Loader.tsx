import styled, { keyframes } from "styled-components";

const circleLoading = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Circle = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  &:after {
    content: " ";
    display: block;
    width: 3em;
    height: 3em;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${(props) => props.theme.red};
    border-color: ${(props) => props.theme.black.lighter}
      ${(props) => props.theme.red} ${(props) => props.theme.black.lighter}
      ${(props) => props.theme.red};
    animation: ${circleLoading} 1.2s linear infinite;
  }
`;

function Loader() {
  return (
    <Container>
      <Circle />
    </Container>
  );
}

export default Loader;
