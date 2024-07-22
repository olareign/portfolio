import styled from "styled-components";
import { Container } from "../ui/Container";
import AccordionItem from "./AccordionItem";
import { useState } from "react";
import { frontendSkills, backendSkills, csSkills } from "../data/data";

const Section = styled.section`
  padding-top: 8rem;
`;

const Accordion = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 35rem);
  gap: 6rem;
  justify-content: center;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
  }
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: #415cd4;
  text-align: center;
  margin-bottom: 1rem;
`;
const P = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  text-align: center;
  margin-bottom: 4rem;
`;

function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickedItem = function (index) {
    setActiveIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <Section id="skills">
      <Container>
        <Heading>My Skills</Heading>
        <P>My Technical Level</P>
        <Accordion>
          <AccordionItem
            index={0}
            isOpen={activeIndex === 0}
            onClick={() => handleClickedItem(0)}
            data={frontendSkills}
          />
          <AccordionItem
            index={1}
            isOpen={activeIndex === 1}
            onClick={() => handleClickedItem(1)}
            data={backendSkills}
          />
          <AccordionItem
            index={2}
            isOpen={activeIndex === 2}
            onClick={() => handleClickedItem(2)}
            data={csSkills}
          />
        </Accordion>
      </Container>
    </Section>
  );
}

export default Skills;
