import { Container, Nav, Navbar } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {GetMenu} from '../routes'

const MenuApp = () => {
  return <Navbar bg="secondary" variant="dark" className={"menu-container"} expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">{process.env.REACT_APP_NAME}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <GetMenu/>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default MenuApp