import React, { useState } from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Pay(props) {
const subscriber=props.subscriber;
const setSubscriber=props.setSubscriber; 
const navigate= useNavigate();
const [cardholderName, setCardholderName] = useState('');
const [cardNumber, setCardNumber] = useState('');
const [expirationDate, setExpirationDate] = useState('');
const [cvv, setCvv] = useState('');
const [paid, setPaid] = useState('');

const handleInputChange = (event) => {
  const { target: { name, value } } = event;
  switch (name) {
    case 'cardholderName':
      setCardholderName(value);
      break;
    case 'cardNumber':
      setCardNumber(value.replace(/[^0-9]/g, '')); 
      break;
    case 'expirationDate':
      setExpirationDate(value);
      break;
    case 'cvv':
      setCvv(value.replace(/[^0-9]/g, '')); 
      break;
    default:
      break;
  }
};

const handlePaid=()=>{
    setSubscriber(true);
    navigate("/")
}

const isValid = () => {
    return cardholderName && cardNumber.length === 16 && expirationDate && cvv.length === 3;
  };

  return (
    <Container>
    <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Payment Information</h2>
      <div className="form-group">
        <label htmlFor="cardholderName">Cardholder Name</label>
        <input
          type="text"
          id="cardholderName"
          name="cardholderName"
          required
          value={cardholderName}
          onChange={handleInputChange}
          className={cardholderName ? '' : 'invalid'}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          required
          maxLength="16"
          value={cardNumber}
          onChange={handleInputChange}
          className={cardNumber.length === 16 ? '' : 'invalid'}
        />
      </div>
      <div className="form-group">
        <label htmlFor="expirationDate">Expiration Date</label>
        <input
          type="month"
          id="expirationDate"
          name="expirationDate"
          required
          value={expirationDate}
          onChange={handleInputChange}
          className={expirationDate ? '' : 'invalid'}
        />
        <input
          type="number"
          id="cvv"
          name="cvv"
          required
          placeholder="CVV"
          maxLength="3"
          value={cvv}
          onChange={handleInputChange}
          className={cvv.length === 3 ? '' : 'invalid'}
        />
      </div>
      <button type="submit" disabled={!isValid()} onClick={handlePaid}>
        Pay Now
      </button>
    </form>
    </Container>
  )
}

const Container = styled.div`
.payment-form {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: sans-serif;
  }
  
  .payment-form h2 {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
  
  .form-group input[type="month"],
  .form-group input[type="number"] {
    width: calc(50% - 10px);
    display: inline-block;
    margin-right: 10px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #3e8e41;
  }
  .payment-form .invalid {
    border-color: red;
  }
  
  button[disabled] {
    background-color: #ddd;
    cursor: not-allowed;
  }`;
