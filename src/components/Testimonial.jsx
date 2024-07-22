import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTestimonial = styled.div`
  padding: 1.2rem;
  border-radius: 9px;
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 50em) {
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15);
  }

  &::before {
    position: absolute;
    content: "\\201C";
    font-size: 8rem;
    font-family: monospace;
    color: #415cd4;
    top: 0;
  }
`;

const P = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: #777;
  line-height: 1.6;
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const ImgBox = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #edf2f8;
  position: relative;
`;

const Img = styled.img`
  display: block;
  position: absolute;
  width: 85%;
  margin-inline: auto;
`;

const Name = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.6;
  color: #333;
`;
const Span = styled.span`
  font-size: 1.4rem;
  color: #555;
  font-weight: 500;
`;

function Testimonial({ data }) {
  const { author, img, occupation, testimony } = data;
  return (
    <StyledTestimonial>
      <P>{testimony}</P>
      <FlexRow>
        <ImgBox>
          <Img src={img} alt={author} />
        </ImgBox>
        <FlexCol>
          <Name>{author}</Name>
          <Span>{occupation}</Span>
        </FlexCol>
      </FlexRow>
    </StyledTestimonial>
  );
}

Testimonial.propTypes = {
  data: PropTypes.array,
};

export default Testimonial;
