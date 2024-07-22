import styled from "styled-components";
// import PropTypes from "prop-types";
import { IoMdDownload } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

const Section = styled.section`
  padding-block: 6rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 6rem;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
  }
`;

const AnimatedBox = styled.div`
  display: inline-block;
  vertical-align: top;
  /* min-width: 30ch; */
  position: relative;
`;

const AnimatedItem = styled.span`
  font-size: 2.8rem;
  color: #415cd4;
  line-height: inherit;
  display: block;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  animation: BottomTotop 6s linear infinite 0s;

  &:nth-child(2n + 2) {
    animation-delay: 2s;
  }

  &:nth-child(3n + 3) {
    animation-delay: 4s;
  }
`;

const H1 = styled.h1`
  color: #212121;
  font-size: 2.8em;

  display: grid;
  grid-template-columns: 12ch auto;

  position: relative;
  vertical-align: top;
  margin-bottom: 2.4rem;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    margin-bottom: 6rem;
  }
`;

const Span = styled.span`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 2.4rem;
`;

const P = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2.4rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Mockup = styled.img`
  width: 100%;
  display: block;
`;

function Intro() {
  return (
    <Section id="Home">
      <Container>
        <Grid>
          <div>
            <Span>Welcome to my portfolio website!</Span>
            <H1>
              <span>Hi 👋, I am Taofeek</span>
              <AnimatedBox>
                <AnimatedItem>Software Developer</AnimatedItem>
                <AnimatedItem>Front-End Developer</AnimatedItem>
                <AnimatedItem>Back-End Developer</AnimatedItem>
              </AnimatedBox>
            </H1>
            <P>
              {`Welcome to my corner of the web! I'm a full-stack web developer
              passionate about crafting dynamic digital experiences. Explore my portfolio to see how I've leveraged a diverse skill set encompassing web technologies.`}
            </P>
            <Flex>
              <Button
                as="a"
                href="TaofeekAbdulazeezResume.pdf"
                type="primary"
                download
              >
                <span>Download Resume</span>
                <IoMdDownload />
              </Button>
              {false && (
                <Button type="primary">
                  <span>Contact me</span>
                  {false && <MdMailOutline />}
                </Button>
              )}
            </Flex>
          </div>
          <div>
            <Mockup src="Programming.png" alt="software engineer" />
          </div>
        </Grid>
      </Container>
    </Section>
  );
}

// Intro.propTypes = {
//   ref: PropTypes.oneOfType([
//     PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
//   ]),
// };

export default Intro;
