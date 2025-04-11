import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Button, ListGroup } from "react-bootstrap";
import { Droplets, Wind } from "lucide-react";

const token = "70d19afe684454ee5a969711733823ef";

const Dettagli = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);

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
        navigate("/notfound");
      });
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${token}&units=metric`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nelle previsioni");
        }
      })
      .then((data) => {
        setForecast(data);
      })
      .catch(() => {
        setError("Errore nel recupero delle previsioni");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]);

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <p className="m-4">{error}</p>;

  return (
    <>
      <Container
        fluid
        className="py-4 d-flex  justify-content-center gap-2 align-items-baseline"
      >
        <Card className="mb-4 shadow-sm rounded-4 weather-card soft-colors detcard flex-grow-1">
          <Card.Body className="p-4">
            <Card.Title className="weather-card-title text-center mb-3 fs-1">
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
              <span className="condition">
                {weather.weather[0].description}
              </span>
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
          </Card.Body>
        </Card>

        <Card className="shadow-sm rounded-4 weather-card soft-colors forecast">
          <Card.Body className="p-4">
            <Card.Title className="weather-card-title text-center mb-3">
              Previsioni per i prossimi 5 giorni
            </Card.Title>
            <ListGroup>
              {forecast &&
                forecast.list.slice(0, 5).map((forecastItem, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center custom-bg"
                  >
                    <div>
                      <strong>
                        {new Date(forecastItem.dt * 1000).toLocaleDateString()}
                      </strong>
                      <br />
                      <img
                        src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}
                        alt={forecastItem.weather[0].description}
                        className="weather-icon"
                      />
                      <span>{forecastItem.main.temp}°C</span>
                      <br />
                      <span>{forecastItem.weather[0].description}</span>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
      <div className="weather-card-buttons d-flex justify-content-center mt-4">
        <Button variant="outline-dark" onClick={() => navigate("/")}>
          Torna indietro
        </Button>
      </div>
    </>
  );
};

export default Dettagli;
