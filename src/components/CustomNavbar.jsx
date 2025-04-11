import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function CustomNavbar() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const magari = () => {
    navigate("/notfound");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">
            Meteo App
            <img src="/sun.png" alt="" className="ms-2" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={goHome}>Home</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="#memes" onClick={magari}>
                Download
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
