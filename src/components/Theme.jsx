import { HiMoon } from "react-icons/hi";
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  background: none;
  border: 0;
  cursor: pointer;
`;

function Theme() {
  return (
    <Button>
      <HiMoon size={28} />;
    </Button>
  );
}

export default Theme;
