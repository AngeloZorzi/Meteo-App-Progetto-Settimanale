import React, { useEffect, useState } from "react";
import { Col, Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CloudSun, Droplets, Wind, Trash2, Info, Shell } from "lucide-react";

const token = "70d19afe684454ee5a969711733823ef";

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      .catch((err) => {
        console.log("MANNAGGIA ERRORE", err);
        setError("Errore nel recupero dati");
        setLoading(false);
      });
  }, [city]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <p className="weather-error-text">{error}</p>;

  return (
    <Col xs={12} sm={6} md={4} lg={3} key={city}>
      <Card className="mb-4 shadow-sm rounded-4 weather-card soft-colors">
        <Card.Body className="p-4">
          <Card.Title className="weather-card-title text-center mb-3">
            {weather.name}
          </Card.Title>
          <div className=" d-flex justify-content-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
          </div>

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
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => navigate(`/dettagli/${city}`)}
            >
              <Info size={16} className="me-1" /> Dettagli
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default WeatherCard;
