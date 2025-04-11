import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import CustomFooter from "./components/CustomFooter";
import WeatherDashboard from "./components/WeatherDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dettagli from "./components/Dettagli";
import WeatherCard from "./components/WeatherCard";
import { Container, Row } from "react-bootstrap";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <CustomNavbar />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Container fluid>
                <h3 className="text-center fw-bold m-3">
                  Most Searched Locations
                </h3>
                <Row className=" justify-content-center">
                  <WeatherCard city="Ospitaletto" />
                  <WeatherCard city="Bagolino" />
                  <WeatherCard city="Atlanta" />
                  <WeatherCard city="Cape North" />
                </Row>{" "}
              </Container>
            }
          />
        </Routes>
        <main>
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/dettagli/:city" element={<Dettagli />} />
          </Routes>
        </main>
        <CustomFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
