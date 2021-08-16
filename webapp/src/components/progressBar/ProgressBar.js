import React from 'react'
import { number, string } from 'prop-types'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  background-color: #fff;
  border-radius: 50px;
`

const Filler = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: ${props => props.completed + '%'};
  background-color: ${props => props.bgcolor};
  border-radius: inherit;
`

const Label = styled.span`
  padding: 5px;
  color: #fff;
  font-weight: 600;
`

export default function ProgressBar ({ bgcolor, completed }) {
  return (
    <Container>
      <Filler bgcolor={bgcolor} completed={completed}>
        { completed > 0 && <Label>{completed}%</Label> }
      </Filler>
    </Container>
  )
}

ProgressBar.propTypes = {
  bgcolor: string,
  completed: number
}
