import React from 'react'
import { string, bool, func } from 'prop-types'
import styled from '@emotion/styled'

const Container = styled.section`
  display: flex;
  height: 30px;
  margin-left: 20px;
  align-items: center;
`

const SwitchBox = styled.div`
  position: relative;
  margin-top: 1px;
  display: flex;
`

const CheckboxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 24px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 2px;
    background: #fff;
    box-shadow: 0 2px 3px #17181a4d;
    transition: 0.2s;
  }
`

const Checkbox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 40px;
  height: 24px;
  margin: 0px;
  &:checked + ${CheckboxLabel} {
    background: #2dd055;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      margin-left: 19px;
      transition: 0.2s;
    }
  }
`

const Label = styled.label`
  color: #2f3337;
  font-size: 14px;
  letter-spacing: 0;
  margin-right: 10px;
`

export default function Switch (props) {
  return (
    <Container>
      <Label>{props.label}</Label>
      <SwitchBox>
        <Checkbox
          checked={props.isChecked}
          id={props.switchId}
          onChange={props.handleOnChange}
          type='checkbox'
        />
        <CheckboxLabel htmlFor={props.switchId} />
      </SwitchBox>
    </Container>
  )
}

Switch.propTypes = {
  isChecked: bool,
  handleOnChange: func,
  label: string,
  switchId: string
}
