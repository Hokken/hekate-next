import Nav from '../Nav';
import Footer from '../Footer';
import styled from "styled-components";
import Menu from '../Menu';
import AuthProvider from '../AuthProvider';

type Props = {
  children: React.ReactNode
}

const Container = styled.div`
max-width: 1200px;
margin auto;
`;

const ContentContainer = styled.div`
display: flex;
flex-direction: row;
`

const Main = styled.div`
width: 50%;
padding: 1rem;
`;

const Layout= ({ children }:Props) => {
  return (
    <AuthProvider>
    <Container>
      <Nav />
      <ContentContainer>
      <Menu/>
      <Main>{children}</Main>
      </ContentContainer>
      <Footer />
    </Container>
    </AuthProvider>
  )
}

export default Layout;