import { HiOutlineChevronDown, HiOutlineCode } from "react-icons/hi";
import { FaComputer } from "react-icons/fa6";
import { TbCodeDots } from "react-icons/tb";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Panel = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;

  ${(props) =>
    props.state === "clicked" &&
    css`
      background-color: red;
    `}
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.6rem;
  line-height: 1.4;
`;

const Subtitle = styled.span`
  color: #666;
  font-size: 1.4rem;
  font-weight: 500;
`;

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-top: 1.6rem;
  overflow: hidden;
`;

const ListItem = styled.li`
  font-size: 1.6rem;
  font-weight: 500;
  padding-block: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.2rem solid #415cd4;
`;

const ImgIcon = styled.img`
  display: block;
  height: 2.4rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s;

  &.open {
    grid-template-rows: 1fr;
  }
`;

function AccordionItem({ isOpen, onClick, data }) {
  const [skillData] = data;
  const { title, years, skills, stack } = skillData;
  return (
    <li>
      <Panel onClick={onClick}>
        {stack === "backend" && <TbCodeDots size={28} color="#415cd4" />}
        {stack === "frontend" && <HiOutlineCode size={28} color="#415cd4" />}
        {stack === "csc" && <FaComputer size={28} color="#415cd4" />}
        <div>
          <Title>{title}</Title>
          <Subtitle>{years} years</Subtitle>
        </div>
        <HiOutlineChevronDown
          size={24}
          color="#415cd4"
          className={isOpen ? "rotate" : ""}
        />
      </Panel>
      <Content className={isOpen ? "open" : ""}>
        <List>
          {skills?.map((skill) => (
            <ListItem key={skill.name}>
              <span>{skill.name}</span>
              <ImgIcon src={skill.img} alt={skill.name} />
            </ListItem>
          ))}
        </List>
      </Content>
    </li>
  );
}

AccordionItem.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  data: PropTypes.array,
  stack: PropTypes.string,
};

export default AccordionItem;
