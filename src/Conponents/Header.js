import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";

function Header() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (
      window.localStorage.getItem("passName") &&
      window.localStorage.getItem("passKey")
    ) {
      setUsers(window.localStorage.getItem("passName"));
    } else {
      setUsers("Inconnu");
    }
  }, []);
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Mon site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Nav.Link href="">Bonjour {users}</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>s
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link href="/listusers">List users</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
