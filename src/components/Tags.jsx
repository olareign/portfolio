import styled from "styled-components";
import PropTypes from "prop-types";

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
  overflow-x: scroll;
  margin-bottom: 2.4rem;
`;
const StyledTag = styled.span`
  display: inline-block;
  padding: 0.8rem 1.2rem;
  color: #415cd4;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 11px;
  border: 0.1rem solid #415cd4;
`;

const Span = styled.span`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.2rem;
`;

function Tag({ stack }) {
  return <StyledTag>{stack}</StyledTag>;
}

Tag.propTypes = {
  stack: PropTypes.string,
};

function Tags({ data }) {
  return (
    <>
      <Span>Technologies</Span>
      <FlexWrapper>
        {data.split(" ").map((stack, index) => (
          <Tag key={index} stack={stack} />
        ))}
      </FlexWrapper>
    </>
  );
}

Tags.propTypes = {
  data: PropTypes.array,
};

export default Tags;
