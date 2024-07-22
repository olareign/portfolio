/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Container } from "../ui/Container";
import Projects from "./Projects";
import { projects } from "../data/data";

const Section = styled.section`
  background-color: #edf2f8;
  padding-block: 6rem;
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  text-align: center;
  margin-bottom: 4.8rem;

  & span {
    color: #415cd4;
  }
`;

const SortList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  /* overflow-y: scroll; */
  gap: 2rem;
  list-style: none;
  justify-content: center;
  margin-bottom: 6rem;
`;

const Sort = styled.li`
  padding: 1rem 1.5rem;
  background-color: #fff;
  color: #333;
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: 9px;
  width: fit-content;
  transition: all 0.3s;
  /* flex: 1; */

  &:hover {
    cursor: pointer;
    background-color: #415cd4;
    color: #fff;
  }
`;

function Showcase() {
  return (
    <Section id="showcase">
      <Container>
        <Heading>
          My Creative <span>Portfolio</span> Section
        </Heading>
        {/* <SortList>
          <Sort>All</Sort>
          <Sort>Web app</Sort>
          <Sort>React</Sort>
          <Sort>Next JS</Sort>
          <Sort>TypeScript</Sort>
          <Sort>JavaScript</Sort>
        </SortList> */}
        <Projects projects={projects} />
      </Container>
    </Section>
  );
}

export default Showcase;
