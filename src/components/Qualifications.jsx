import styled from "styled-components";
import { BiBookReader, BiBriefcase, BiCalendarWeek } from "react-icons/bi";
import { PiGraduationCapBold } from "react-icons/pi";
import { useState } from "react";

const Section = styled.section`
  padding-block: 9rem;
`;

const Container = styled.div`
  max-width: 120rem;
  width: 80%;
  margin-inline: auto;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin-bottom: 3.2rem;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #555;
  cursor: pointer;

  &.active {
    color: #415cd4;
    svg {
      fill: #415cd4;
    }
  }
`;

const H5 = styled.h5`
  font-size: 1.8rem;
  font-weight: 600;

  @media (max-width: 35em) {
    font-size: 1.6rem;
  }
`;

const TabContents = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 6rem;
`;

const TabContent = styled.li`
  display: grid;
  grid-template-columns: 1fr 0.1rem 1fr;
  gap: 2rem;
  position: relative;
  padding-bottom: 2rem;

  &::before {
    content: "";
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: #415cd4;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & div:nth-child(2) {
    background-color: #415cd4;
  }
`;

const H4 = styled.h4`
  font-size: 1.8rem;
  font-weight: 500;
  color: #333;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: 35em) {
    font-size: 1.6rem;
  }
`;

const H6 = styled.h6`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1rem;

  @media (max-width: 35em) {
    font-size: 1.35rem;
  }
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: #666;
  line-height: 1.4;
  margin-bottom: 1.2rem;

  @media (max-width: 35em) {
    font-size: 1.2rem;
  }
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  & span {
    color: #777;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.4;

    @media (max-width: 35em) {
      font-size: 1.05rem;
    }
  }
`;

function Qualifications() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Section id="qualifications">
      <Container>
        <TabContainer>
          <Tab
            className={activeTab === 0 ? "active" : ""}
            onClick={() => setActiveTab(0)}
          >
            <BiBriefcase size={24} />
            <H5>Experience</H5>
          </Tab>
          <Tab
            className={activeTab === 1 ? "active" : ""}
            onClick={() => setActiveTab(1)}
          >
            <PiGraduationCapBold size={24} />
            <H5>Education</H5>
          </Tab>
        </TabContainer>
        {activeTab === 0 ? (
          <TabContents>
            <TabContent>
              <div></div>
              <div></div>
              <div>
                <H4>Backend Developer</H4>
                <H6>PacifyLabs Technologies Limited</H6>
                <P>Remote • Contract</P>
                <Date>
                  <BiCalendarWeek size={16} />
                  <span>May - June</span>
                </Date>
              </div>
            </TabContent>
            <TabContent>
              <div>
                <H4>Backend Developer</H4>
                <H6>Tobams Group.</H6>
                <P>Remote • Contract</P>
                <Date>
                  <BiCalendarWeek size={16} />
                  <span>December - April </span>
                </Date>
              </div>
              <div></div>
              <div></div>
            </TabContent>
          </TabContents>
        ) : (
          <TabContents>
            <TabContent>
              <div></div>
              <div></div>
              <div>
                <H4>Student</H4>
                <H6>Ekiti State University, Ado, Ekiti State. </H6>
                <P>B.Sc Chemistry</P>
                <Date>
                  <BiCalendarWeek size={16} />
                  <span>2016 - 2022</span>
                </Date>
              </div>
            </TabContent>
          </TabContents>
        )}

        <TabContainer>
          <Tab className="active">
            <BiBookReader size={24} />
            <H5>Licenses and Certifications</H5>
          </Tab>
        </TabContainer>

        <TabContents>
          <TabContent>
            <div></div>
            <div></div>
            <div>
              <H4>Backend Development</H4>
              <H6>DevCareer Academy</H6>
              <P>
                <strong>Skills: </strong>NodeJS, express, NestJS, MongoDB,
                PostgressDB
              </P>
              <Date>
                <BiCalendarWeek size={16} />
                <span>April 2024</span>
              </Date>
            </div>
          </TabContent>

          <TabContent>
            <div>
              <H4>Introduction to Career Skills in Software Development</H4>
              <H6>LinkedIn</H6>
              <P>
                <strong>Skills: </strong>Agile methodology • Design patterns •
                MVC architecture • Functional Programming • OOP
              </P>
              <Date>
                <BiCalendarWeek size={16} />
                <span>Issued June 2021</span>
              </Date>
            </div>
            <div></div>
            <div></div>
          </TabContent>
        </TabContents>
      </Container>
    </Section>
  );
}

export default Qualifications;
