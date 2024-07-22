import styled from "styled-components";
import { Container } from "../ui/Container";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiLogoLinkedinSquare, BiMailSend, BiPhone } from "react-icons/bi";
import { LuSendHorizonal } from "react-icons/lu";

const Section = styled.section`
  padding-block: 8rem;
  background-color: #edf1f6;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  gap: 6rem;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
    gap: 8rem;
  }
`;

const Socials = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Name = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.6;
  color: #333;
`;
const SocialLink = styled.a`
  display: inline-block;
  text-decoration: none;
  font-size: 1.4rem;
  color: #777;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;

const ContactForm = styled.form`
  display: grid;
  gap: 3rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 1.2rem;
`;
const NameInput = styled.input`
  border-radius: 9px;
  /* background-color: #edf2f8; */
  background-color: #fff;
  border: 0;
  width: 80%;
  padding: 1.2rem 2.4rem;

  @media (max-width: 50em) {
    width: 100%;
  }
`;

const EmailInput = styled.input`
  border-radius: 9px;
  /* background-color: #edf2f8; */
  background-color: #fff;
  border: 0;
  width: 80%;
  padding: 1.2rem 2.4rem;

  @media (max-width: 50em) {
    width: 100%;
  }
`;

const MessageInput = styled.textarea`
  border-radius: 9px;
  background-color: #fff;
  border: 0;
  width: 80%;
  resize: none;
  padding: 1.2rem 2.4rem;

  @media (max-width: 50em) {
    width: 100%;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  border-radius: 11px;
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
  background-color: #415cd4;
  padding: 1.2rem 1.8rem;
  cursor: pointer;
  transform: all 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

function Contact() {
  return (
    <Section id="contact">
      <Container>
        <Heading>Contact me</Heading>
        <P>Get in touch</P>
        <Grid>
          <Socials>
            <Social>
              <BiLogoLinkedinSquare color="#415cd4" size={32} />
              <FlexCol>
                <Name>Connect</Name>
                <SocialLink href="https://www.linkedin.com/in/taofeekabdulazeez">
                  LinkedIn
                </SocialLink>
              </FlexCol>
            </Social>
            <Social>
              <MdOutlineLocationOn color="#415cd4" size={32} />
              <FlexCol>
                <Name>Location</Name>
                <SocialLink href="https://www.google.com/maps/place/Nigeria/@9.0067208,3.3731211,6z/data=!3m1!4b1!4m6!3m5!1s0x104e0baf7da48d0d:0x99a8fe4168c50bc8!8m2!3d9.081999!4d8.675277!16zL20vMDVjZ3Y?entry=ttu">
                  Nigeria
                </SocialLink>
              </FlexCol>
            </Social>
            <Social>
              <BiMailSend color="#415cd4" size={32} />
              <FlexCol>
                <Name>Email</Name>
                <SocialLink href="mailto:taofeekabdulazeez2020@gmail.com">
                  taofeekabdulazeez2020@gmail.com
                </SocialLink>
              </FlexCol>
            </Social>
            <Social>
              <BiPhone color="#415cd4" size={32} />
              <FlexCol>
                <Name>Phone Number</Name>
                <SocialLink href="tel:2348163231124">+2348163231124</SocialLink>
              </FlexCol>
            </Social>
          </Socials>
          <ContactForm>
            <div>
              <Label htmlFor="name">Name</Label>
              <NameInput type="text" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <EmailInput type="email" name="email" required />
            </div>
            <div>
              <Label htmlFor="message">Type your message</Label>
              <MessageInput required></MessageInput>
            </div>
            <div>
              <Button>
                <span>Send Message</span>
                <LuSendHorizonal size={20} />
              </Button>
            </div>
          </ContactForm>
        </Grid>
      </Container>
    </Section>
  );
}

export default Contact;
