import PropTypes from "prop-types";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
import { GrGallery } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;

  @media (max-width: 50em) {
    position: fixed;
    bottom: 0;
    left: 0;
    padding-block: 6rem;
    background-color: #fff;
    transform: translateY(100%);
    /* background-color: #415cd4; */
    width: 100%;
    border-radius: 17px 17px 0 0;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease-in;

    &.nav-open {
      transform: translateY(0%);
    }

    & ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4.8rem;
      justify-content: space-between;
    }
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2.4rem;
  margin-bottom: 2rem;
`;

const Link = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.6rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;

  &:is(:link, :visited) {
    color: #444;
  }

  &:is(:hover, :active) {
    color: #415cd4;
    svg {
      stroke: #415cd4;
    }
  }

  & svg {
    display: none;

    @media (max-width: 50em) {
      display: inline;
    }
  }
`;

function MainNav({ isOpen, onClick }) {
  return (
    <StyledNav className={isOpen ? "nav-open" : ""} onClick={onClick}>
      <NavLinks>
        <li>
          <Link href="#Home">
            <HiOutlineHome size={20} color="#415cd4" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="#skills">
            <IoDocumentTextOutline size={20} />
            <span>Skills</span>
          </Link>
        </li>
        <li>
          <Link href="#qualifications">
            <IoDocumentTextOutline size={20} />
            <span>Qualifications</span>
          </Link>
        </li>
        <li>
          <Link href="#services">
            <IoBriefcaseOutline size={20} />
            <span>Services</span>
          </Link>
        </li>
        <li>
          <Link href="#showcase">
            <GrGallery size={20} />
            <span>Showcase</span>
          </Link>
        </li>
        <li>
          <Link href="#contact">
            <LuSendHorizonal size={24} />
            <span>Contact</span>
          </Link>
        </li>
      </NavLinks>
    </StyledNav>
  );
}

MainNav.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

export default MainNav;
