import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, db } from "../utils/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth() || {};
  const handleLogin = async () => {
    try {
      signInWithEmailAndPassword(firebaseAuth, email, password);
      onAuthStateChanged(firebaseAuth, async (currentUser) => {
        if (currentUser) {
          const isAdmin = await getDoc(
            doc(db, "AdminList", currentUser?.email)
          );
          setEmail(currentUser.email);
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: {
                ...currentUser,
                isAdmin: false,
              },
            })
          );
          if (isAdmin?.data()) {
            setAuth({
              user: {
                ...currentUser,
                isAdmin: true,
              },
            });
          } else {
            setAuth({
              user: {
                ...currentUser,
                isAdmin: false,
              },
            });
          }
          navigate("/", { replace: true });
        }
      });
    } catch (error) {
      alert("Invallid credentials");
      navigate("/login");
    }
  };

  useEffect(() => {
    const checkLocalStorageForAuth = () => {
      try {
        const userDetailsFromLocalStorage = JSON.parse(
          localStorage.getItem("user")
        );
        if (userDetailsFromLocalStorage) {
          setAuth({ user: userDetailsFromLocalStorage });
        } else {
          localStorage.clear();
        }
      } catch (err) {
        localStorage.clear();
      }
    };

    checkLocalStorageForAuth();
  }, [setAuth]);

  if (auth?.user) {
    navigate("/", { replace: true });
  }

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={handleLogin}>Login to your account</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;

export default Login;
