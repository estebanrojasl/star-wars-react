import React, { createContext, useContext } from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Films from "./pages/Films";
import FilmPage from "./pages/FilmPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Characters from "./pages/Characters";
import Footer from "./components/Footer";
import { useIsLoggedIn } from "./components/utils";

import "./App.css";

export const SessionContext = createContext<string>("");

function App() {
  const session = useIsLoggedIn();

  return (
    <BrowserRouter>
      <SessionContext.Provider value={session ?? ''}>
        <Header />
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:filmId" element={<FilmPage />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Switch>
      </SessionContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
