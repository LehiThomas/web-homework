import React from 'react'
import styled from '@emotion/styled'
import { bool, node } from 'prop-types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 475px;
  background: #fff;
  box-shadow: 0 1px 4px #00000029;
  border-radius: 4px;
  opacity: 1;
  z-index: 100;
`

export default function Modal (props) {
  if (!props.isOpen) {
    return null
  }

  return (
    <Container>
      <ModalBody>{props.children}</ModalBody>
    </Container>
  )
}

Modal.propTypes = {
  isOpen: bool,
  children: node
}
