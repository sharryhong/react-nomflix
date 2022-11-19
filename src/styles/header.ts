import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

export const Container = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  padding: 1.25rem 2.5rem;
  color: #fff;
  /* background-color: ${(props) => props.theme.black.veryDark}; */
`;
export const Column = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;
export const Home = styled(Link)`
  display: block;
`;
export const Logo = styled(motion.svg)`
  width: 5.94em;
  height: 1.56em;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: ${(props) => props.theme.red};
  }
`;
export const Nav = styled.nav`
  display: flex;
  align-items: center;
`;
export const NavItem = styled(NavLink)`
  position: relative;
  margin-right: 2em;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
export const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.red};
`;
export const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;
export const SearchButton = styled.button`
  position: absolute;
  z-index: 10;
  right: 0;
  svg {
    height: 25px;
    fill: #fff;
  }
`;
export const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  width: 230px;
  left: -220px;
  padding: 10px 12px 10px 40px;
  color: ${(props) => props.theme.white.darker};
  background-color: ${(props) => props.theme.black.lighter};
  border: 1px solid ${(props) => props.theme.white.darker};
`;
