import React from 'react'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NotSubscribed() {
    const navigate= useNavigate();

  return (
    <Container>
    <div className="ubinge-container">
      <h1>Please Subscribe to UBinge</h1>
      <p>Watch your favorite movies and shows anytime, anywhere.</p>
      <button onClick={()=>{navigate("/pay")}}>Subscribe Now</button>
    </div>
    </Container>
  )
}

const Container = styled.div`
.ubinge-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #121212; /* Dark background */
    color: #fff; /* Light text */
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  button {
    background-color: #007bff; /* Blue button */
    color: #fff; /* White text */
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }`;
