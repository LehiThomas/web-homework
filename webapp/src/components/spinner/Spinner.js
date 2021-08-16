import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 250px;
  height: 100%;
`

const spin = keyframes`
  to {transform: rotate(360deg)}
`

const Spinning = styled.span`
  position: relative;
  width: 60px;
  height: 60px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 55px;
    height: 55px;
    border: 15px solid #e7e8ea;
    border-radius: 50%;
    background-color: #0390de;
    border-top-color: transparent;
    border-bottom-color: transparent;
    animation: ${spin} 1.5s linear infinite;
  }

`

export default function Spinner () {
  return (
    <Container>
      <Spinning />
    </Container>
  )
}
