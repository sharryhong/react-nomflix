import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  padding: 1.25rem 2.5rem;
  color: #fff;
  background-color: #000;
`;
export const Column = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;
export const Logo = styled(motion.svg)`
  width: 5.94em;
  height: 1.56em;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;
export const Nav = styled.nav`
  display: flex;
  align-items: center;
`;
export const NavItem = styled(NavLink)`
  margin-right: 2em;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
export const Search = styled.button`
  svg {
    height: 25px;
    fill: #fff;
  }
`;