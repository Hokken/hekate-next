import Link from "next/link";
import Image from "next/image";
import LoginState from "./LoginState";
import styled from "styled-components";
type Props = {};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 1rem;
`;
const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = (props: Props) => {
  return (
    <Container>
      <LogoContainer>
        <Link href="/">
          <a>
        <Image width={48} height={48} alt="logo" src="/images/48x48.png" />
          </a>
        </Link>
        <div>
          <div className="logo-title">HEKATE</div>
          <div className="logo-subtitle">Astrological Interpretations</div>
        </div>
      </LogoContainer>

      <NavItems className="right">
        <Link href="/">CONTACT US</Link>
        <LoginState />
      </NavItems>
    </Container>
  );
};

export default Navbar;