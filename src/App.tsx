import React from "react";

// router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import "./App.css";

// components
import Countries from "./pages/countries/countries.page";
import Country from "./pages/country/country.page";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/:code" element={<Country />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
