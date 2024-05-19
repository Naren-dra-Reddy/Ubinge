import React from 'react'
import styled from "styled-components";

export default function MyList(props) {
    console.log({props})
  return (
    <Container>
        <div>
            <h1>{props.data}</h1>
        </div>
    </Container>
  )
}

const Container= styled.div`
    h1{
        color:white
    }
`;