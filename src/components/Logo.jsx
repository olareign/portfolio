import styled from "styled-components";

const StyledLogo = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
`;

function Logo() {
  return <StyledLogo>{`<Sirfeeky/>`}</StyledLogo>;
}

export default Logo;