/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Tags from "./Tags";
import { FiEye } from "react-icons/fi";
import { IoLogoGithub } from "react-icons/io";

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6rem;
  width: 80rem;
  margin-inline: auto;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
    width: auto;
  }
`;

const ProjectItem = styled.div`
  background-color: #fff;
  border-radius: 9px;
  overflow: hidden;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.15);
`;

const Content = styled.div`
  padding: 1.2rem;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  border-radius: 9px;
`;

const H4 = styled.h4`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.6rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.4rem;
  background: none;
  border: 0;
  padding: 1rem 1.5rem;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  ${(props) =>
    props.type === "live" &&
    css`
      background-color: #415cd4;
      color: #fff;
      border-radius: 9px;
    `}

  ${(props) =>
    props.type === "repo" &&
    css`
      background-color: #edf2f8;
      /* color: #415cd4; */
      color: #333;
      border-radius: 9px;
    `}
`;

function Project({ project }) {
  const { img, name, description, technologies, github_link, live_link } =
    project;
  return (
    <ProjectItem>
      <Img src={img} />
      <Content>
        <H4>{name}</H4>
        <P>{description}</P>
        <Tags data={technologies} />
        <Flex>
          <Button type="live" as="a" href={live_link} target="_blank">
            <span>Live Demo</span>
            <FiEye size={16} color="#fff" />
          </Button>
          {/* <Button type="repo" as="a" href={github_link} target="_blank">
            <span>View Code</span>
            <IoLogoGithub size={16} color="" />
          </Button> */}
        </Flex>
      </Content>
    </ProjectItem>
  );
}

Project.propTypes = {
  project: PropTypes.object,
};

function Projects({ projects }) {
  return (
    <ProjectList>
      {projects.map((project) => (
        <Project key={project.name} project={project} />
      ))}
    </ProjectList>
  );
}

Projects.propTypes = {
  projects: PropTypes.array,
};

export default Projects;
