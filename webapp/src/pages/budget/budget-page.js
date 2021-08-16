import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { transactionData } from '../../data/consts'
import ProgressBar from '../../components/progressBar/ProgressBar'

const Header = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 24px;
`
const H1 = styled.h1`
  font-size: 26px;
  color: #2f3337;
  margin: 10px 0 0;
`

const P = styled.p`
  margin: 0;
  font-size: 14px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const Form = styled.section`
  margin-bottom: 20px;
`

const Select = styled.select`
  font-size: 14px;
  background: #fff;
  border: 1px solid #dadcdf;
  border-radius: 2px;
  width: 200px;
  height: 40px;
  padding: 4px 16px;
  margin-right: 60px;
`

const Label = styled.label`
  color: #2f3337;
  width: 120px;
  font-size: 14px;
  letter-spacing: 0;
  margin-right: 20px;
`

const Input = styled.input`
  font-size: 14px;
  background: #fff;
  border: 1px solid #dadcdf;
  border-radius: 2px;
  width: 200px;
  height: 24px;
  padding: 8px 16px;

  &:hover {
    border-color: #0485cc;
  }
  &:active {
    border-color: #0485cc;
  }
  &:disabled {
    cursor: not-allowed;
    border-color: #e7e8ea;
    background-color: #f5f6f7;
  }
  &:error {
    border-color: #c7202c;
    color: #c7202c;
  }
`

const Numbers = styled.section`
  margin: 10px;
`

const H2 = styled.h2`
  margin: 0;
  font-size: 18px;
`

export function Budget () {
  const [category, setCategory] = useState('')
  const [budget, setBudget] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (category !== '' && budget > 0) {
      let percent = (budget / chartDataObj[category]) * 100
      setProgress(+percent.toFixed(0))
    } else {
      setProgress(0)
    }
  }, [category, budget])

  let chartDataObj = {}

  transactionData.forEach(t => {
    if (chartDataObj.hasOwnProperty(t.description)) {
      chartDataObj[t.description] = Math.round((chartDataObj[t.description] + t.amount) * 100) / 100
    } else {
      chartDataObj[t.description] = t.amount
    }
  })

  function getOptions () {
    let arr = Object.keys(chartDataObj).map(key => (
      <option key={key} value={key}>
        {key}
      </option>
    ))
    arr.unshift(<option value={''}>
      Select an option
    </option>)
    return arr
  }

  return (
    <>
      <Header>
        <H1>Budget Progress Tracker</H1>
        <P>Select an option to see how much you have spent in that category.</P>
        <small>If a category is not shown then you have not purchased anything in that category.</small>
      </Header>
      <Body>
        <Form>
          <Select
            onBlur={e => { setCategory(e.target.value) }}
            onChange={e => { setCategory(e.target.value) }}
            value={category}
          >
            {getOptions()}
          </Select>
          <Label>Enter Your Budget in this Category</Label>
          <Input onChange={e => setBudget(Number(e.target.value))} value={budget} />
        </Form>
        {category !== '' && (
          <Numbers>
            <H2>Total Spent:</H2> {chartDataObj[category]}
          </Numbers>
        )}
        {progress > 0 && <ProgressBar bgcolor={progress < 100 ? '#2dd055' : '#c7202c'} completed={progress} /> }
      </Body>
    </>
  )
}
