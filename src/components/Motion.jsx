import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import styled from "styled-components";

export default function Motion() {
  return (
    <Section>
      <Container>
        <MotionDiv
          animate={{ x: 50, y: 50 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
        >
          <h1>Hello Taofeek</h1>
        </MotionDiv>
        <List />
      </Container>
    </Section>
  );
}

function List() {
  const list = { hidden: { opacity: 0 } };
  const item = { hidden: { x: -10, opacity: 0 } };

  return (
    <motion.ul animate="hidden" variants={list}>
      <motion.li variants={item} />
      <motion.li variants={item} />
      <motion.li variants={item} />
    </motion.ul>
  );
}

const Section = styled.section`
  padding-block: 9rem;
`;

const MotionDiv = styled(motion.div)`
  height: 8rem;
  aspect-ratio: 1/1;
  background-color: yellowgreen;
`;
