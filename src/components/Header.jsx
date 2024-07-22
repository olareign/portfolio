import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MainNav from "./MainNav";
import Logo from "./Logo";
import Theme from "./Theme";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

const StyledHeader = styled.header`
  width: 100%;
  height: 7.2rem;
  z-index: 6;
  background-color: #fff;
  transition: all 0.3s;

  &.sticky {
    position: fixed;
    top: 0;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
    opacity: 0.99;

    @media (max-width: 50em) {
      top: auto;
      bottom: 0;
    }
  }

  @media (max-width: 50em) {
    height: 6rem;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  max-width: 120rem;
  width: 85%;
  margin-inline: auto;
  /* temp */
  padding-block: 2rem;

  @media (max-width: 50em) {
    padding-block: 1rem;
    display: flex;
    justify-content: space-between;
  }
`;

const Button = styled.button`
  background: none;
  border: 0;

  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 50em) {
    z-index: 40;
    display: flex;
  }

  svg {
    z-index: 40;
    transition: scale 0.1s;
  }

  &:hover {
    svg {
      scale: 1.1;
      color: #415cd4;
    }
  }
`;

function Header({ isIntersecting }) {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const handleMobileNav = function () {
    setNavIsOpen((open) => !open);
  };

  return (
    <StyledHeader className={isIntersecting ? "" : "sticky"}>
      <Container>
        <Logo />
        <MainNav isOpen={navIsOpen} onClick={handleMobileNav} />
        <div>
          <Button onClick={handleMobileNav}>
            {navIsOpen ? (
              <IoCloseSharp size={24} />
            ) : (
              <HiOutlineViewGrid size={24} />
            )}
          </Button>
          {false && <Theme />}
        </div>
      </Container>
    </StyledHeader>
  );
}

Header.propTypes = {
  isIntersecting: PropTypes.bool,
};

export default Header;
