import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Container className="text-center mt-5">
      <img src="/cat.jpg" alt="Confused cat" style={{ maxWidth: "300px" }} />
      <h1 className="mt-4">Ooops! Questa pagina non esiste.</h1>
      <p>Un gatto molto confuso ci sta pensando su... 🐱💭</p>
      <Button variant="warning" onClick={goHome}>
        Torna alla Home
      </Button>
    </Container>
  );
}

export default NotFound;
