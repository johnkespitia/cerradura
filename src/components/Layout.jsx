import { Container } from 'react-bootstrap'
import MenuApp from './MenuApp'
const Layout = (props) => {
  return <>
    <MenuApp />
    <Container fluid={true} className={'main-container'} >
    <Container className={'main-content'}>
      {props.children}
    </Container>
  </Container>
    </>
}

 export default Layout