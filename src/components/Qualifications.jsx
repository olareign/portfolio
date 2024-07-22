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
                <H4>Frontend Developer</H4>
                <H6>Nigeria Association of Computing Students (NACOS)</H6>
                <P>Unilorin Chapter (On-site)</P>
                <Date>
                  <BiCalendarWeek size={16} />
                  <span>October 2023 - present</span>
                </Date>
              </div>
            </TabContent>
            <TabContent>
              <div>
                <H4>Academic Mentor</H4>
                <H6>Darewood Students Association (DSA)</H6>
                <P>University of Ilorin, Nigeria</P>
                <Date>
                  <BiCalendarWeek size={16} />
                  <span>December 2023 - present</span>
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
                <H6>University Of Ilorin, Nigeria</H6>
                <P>B.Sc Computer Science</P>
                <Date>
                  <BiCalendarWeek size={16} />
                  <span>November 2020 - October 2025</span>
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
              <H4>The Ultimate React Course 2024</H4>
              <H6>Udemy</H6>
              <P>
                <strong>Skills: </strong>React • Supabase • Tailwin CSS • Redux
              </P>
              <Date>
                <BiCalendarWeek size={16} />
                <span>Issued Dec 2023</span>
              </Date>
            </div>
          </TabContent>

          <TabContent>
            <div>
              <H4>The Complete JavaScript Course</H4>
              <H6>Udemy</H6>
              <P>
                <strong>Skills: </strong>JavaScript • OOP • Functional
                Programming
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
