import styled, { css } from "styled-components";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  gap: 0.6rem;
  background: none;
  border: none;
  padding: 0.9em 1.6em;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 27px;
  cursor: pointer;
  transition: transform 0.3s;

  &:is(:hover, :active) {
    transform: translateX(-1%);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15);
  }

  ${(props) =>
    props.type === "primary" &&
    css`
      color: #fff;
      background-color: #415cd4;
    `}

  ${(props) =>
    props.type === "secondary" &&
    css`
      /* color: #415cd4; */
      color: #333;
      background-color: #eee;
    `}
`;
