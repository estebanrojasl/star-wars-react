import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Films from "./pages/Films";
import FilmPage from "./pages/FilmPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/:filmId" element={<FilmPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Router>
  );
}

export default App;
