import styled from "styled-components";

export const Container = styled.div``;
export const Banner = styled.div<{ bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 3em;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
export const Title = styled.h2`
  font-size: 4.25rem;
  margin-bottom: 1rem;
`;
export const Overview = styled.p`
  font-size: 1.4rem;
  width: 50%;
`;
