import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import backgroundImage from "../assets/home.jpeg";
import MovieLogo from "../assets/MovieLogo.png";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import { useAuth } from "../hooks/useAuth";

function Ubinge() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.ubinge.genresLoaded);
  const movies = useSelector((state) => state.ubinge.movies);
  const { auth, setAuth } = useAuth() || {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  if (auth?.user) {
    return (
      <Container>
        <Navbar isScrolled={isScrolled} />
        <div className="hero">
          <img
            src={backgroundImage}
            alt="background"
            className="background-image"
          />
          <div className="container">
            <div className="logo">
              <img src={MovieLogo} alt="Movie Logo" />
            </div>
            <div className="buttons flex">
              <button
                onClick={() => {
                  if (!auth?.user) {
                    navigate("/notsub");
                  } else {
                    navigate("/player");
                  }
                }}
                className="flex j-center a-center"
              >
                <FaPlay />
                Play
              </button>
              <button className="flex j-center a-center">
                <AiOutlineInfoCircle />
                More Info
              </button>
            </div>
          </div>
        </div>
        <Slider movies={movies} />
      </Container>
    );
  }

  return <Navigate to="/login" replace />;
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default Ubinge;
