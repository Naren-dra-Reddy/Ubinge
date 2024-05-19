import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Ubinge from "./pages/Ubinge";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import Player from "./pages/Player";
import TvShows from "./pages/TvShows";
import Pay from "./pages/Pay";
import NotSubscribed from "./pages/NotSubscribed";
import MyList from "./pages/MyList";
import Card from "./components/Card";
import MovieInfo from "./pages/MovieInfo";
import RequireAuth from "./components/RequireAuth";
import AddMovie from "./pages/AddMovie";
import AdminProtected from "./components/AdminProtected";
import { AuthProvider } from "./context/AuthProvider";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route exact path="/" element={<Ubinge />} />
          <Route element={<AdminProtected />}>
            <Route exact path="/add-movie" element={<AddMovie />} />
          </Route>
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/tv" element={<TvShows />} />
          {/* <Route exact path="/pay" element={<Pay />} /> */}
          <Route exact path="/notsub" element={<NotSubscribed />} />
          <Route exact path="/mylist" element={<MyList />} />
          <Route exact element={<Card />} />
          <Route exact path="/movieinfo" element={<MovieInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
