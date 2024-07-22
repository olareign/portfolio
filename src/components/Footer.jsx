import styled from "styled-components";
import { Container } from "../ui/Container";
import { BiLogoGithub, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";

const StyledFooter = styled.footer`
  padding-block: 8rem;
  background-color: #415cd4;
  color: #fff;
`;

const Copyright = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
`;

const SocialLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 4.8rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    background-color: #edf2f8;
    cursor: pointer;
  }
`;

const Heading = styled.h6`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
`;

function Footer() {
  return (
    <StyledFooter>
      <Container>
        <Heading>Let&apos;s Stay Connected</Heading>
        <SocialLinks>
          <li>
            <SocialLink href="https://www.linkedin.com/in/abdulrasaq-taofeeq-olarewaju">
              <BiLogoLinkedin size={24} color="#415cd4" />
            </SocialLink>
          </li>

          <li>
            <SocialLink href="https://twitter.com/Ola_rolatz">
              <BiLogoTwitter size={24} color="#415cd4" />
            </SocialLink>
          </li>

          <li>
            <SocialLink href="https://github.com/olareign">
              <BiLogoGithub size={24} color="#415cd4" />
            </SocialLink>
          </li>
        </SocialLinks>
        <Copyright>© Olareign, All right reserved</Copyright>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
