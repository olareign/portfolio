import styled from "styled-components";
import Testimonial from "./Testimonial";
import { Container } from "../ui/Container";
import { recommendations } from "../data/data";

const Section = styled.section`
  padding-block: 8rem;
`;

const StyledTestimonials = styled.div`
  display: flex;
  /* grid-template-columns: repeat(3, 1fr); */

  @media (max-width: 50em) {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 80%;
    gap: 1.4rem;

    overflow-x: auto;
    overscroll-behavior-inline: contain;
  }

  -webkit-mask: linear-gradient(
    90deg,
    transparent,
    #edf2f8 10%,
    #edf2f8 90%,
    transparent
  );
  mask: linear-gradient(
    90deg,
    transparent,
    #edf2f8 10%,
    #edf2f8 90%,
    transparent
  );

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  text-align: center;
  margin-bottom: 1.2rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 4.8rem;
  text-align: center;
`;

function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <Heading>Testimonials</Heading>
        <P>Employers/Clients/Collaborators saying</P>
        <StyledTestimonials>
          {recommendations.map((recommendation, index) => (
            <Testimonial key={index} data={recommendation} />
          ))}
        </StyledTestimonials>
      </Container>
    </Section>
  );
}

export default Testimonials;
