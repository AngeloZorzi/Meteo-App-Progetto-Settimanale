import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import { CloudSun, Droplets, Wind } from "lucide-react";

const token = "70d19afe684454ee5a969711733823ef";

const Dettagli = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella risposta");
        }
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Errore nel recupero dei dettagli");
        setLoading(false);
      });
  }, [city]);

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <p className="m-4">{error}</p>;

  return (
    <Container className="py-4">
      <Card className="mb-4 shadow-sm rounded-4 weather-card soft-colors">
        <Card.Body className="p-4">
          <Card.Title className="weather-card-title text-center mb-3">
            {weather.name}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
          </Card.Title>
          <Card.Text className="weather-card-text text-center">
            <span className="temperature">{weather.main.temp}°C</span>
            <br />
            <span className="condition">{weather.weather[0].description}</span>
            <br />
            <span className="humidity">
              <Droplets size={16} className="me-1" /> Umidità:{" "}
              {weather.main.humidity}%
            </span>
            <br />
            <span className="wind">
              <Wind size={16} className="me-1" /> Vento: {weather.wind.speed}{" "}
              m/s
            </span>
          </Card.Text>
          <div className="weather-card-buttons d-flex justify-content-around mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Torna indietro
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dettagli;
