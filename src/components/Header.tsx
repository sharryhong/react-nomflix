import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  height: 3em;
  padding: 0 1em;
  font-size: 1.2rem;
  color: #fff;
  background-color: #37c8cb;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;
const Title = styled.h1`
  float: left;
`;
const Logo = styled.svg`
  width: 1.7em;
  fill: #fff;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
`;
const NavItem = styled(NavLink)`
  margin-right: 2em;
`;

function Header() {
  return (
    <Wrapper>
      <Column>
        <Title>
          <Link to="/">
            <Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M0 392l0 24 48 0 0-24 0-8 144 0 0 32-64 64 0 32 112 0 0-48 0-16 32 0 0 16 0 48 112 0 0-32-64-64 0-32 144 0 0 8 0 24 48 0 0-24 0-112 0-24-48 0 0 24 0 16L320 216l0-88L272 0 240 0 192 128l0 88L48 296l0-16 0-24L0 256l0 24L0 392z" />
            </Logo>
          </Link>
        </Title>
        <Nav>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/tv">TV Shows</NavItem>
        </Nav>
      </Column>
      <Column>
        <button>search</button>
      </Column>
    </Wrapper>
  );
}

export default Header;
