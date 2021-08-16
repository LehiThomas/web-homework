import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Chart } from 'react-google-charts'

import { transactionData } from '../../data/consts'
import Spinner from '../../components/spinner/Spinner'
import { cleanPieChartData } from '../../util/polish-graph-data'

const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
`
const H1 = styled.h1`
  font-size: 26px;
  color: #2f3337;
  margin: 10px 0;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const Toggle = styled.section`
  display: flex;
  height: 60px;
  margin-left: 70px;
`

const ToggleButton = styled.button`
  font-size: 24px;
  border: 1px solid black;
  width: 100px;
  cursor: pointer;
  background-color: ${props => props.active ? '#ced1d5' : 'transparent'};
`

const PieButton = styled(ToggleButton)`
  border-right: none;
  border-radius: 4px 0 0 4px;
`
const BarButton = styled(ToggleButton)`
  border-radius: 0 4px 4px 0;
`

export function Graphs () {
  const [chart, setChart] = useState('pie')

  const pieChartData = cleanPieChartData(transactionData)
  // const barChartData = cleanBarChartData(transactionData)

  return (
    <>
      <Header>
        <H1>Graphs</H1>
      </Header>
      <Body>
        <Toggle>
          <PieButton active={chart === 'pie'} onClick={() => setChart('pie')}>Pie</PieButton>
          <BarButton active={chart === 'bar'} onClick={() => setChart('bar')}>Bar</BarButton>
        </Toggle>
        { chart === 'pie' && (
          <Chart
            chartType='PieChart'
            data={pieChartData}
            height={'300px'}
            loader={<Spinner />}
            options={{
              title: 'Spend by Category',
              backgroundColor: 'transparent'
            }}
            rootProps={{ 'data-testid': 'pie' }}
            width={'500px'}
          />
        )}
        { chart === 'bar' && (
          <>This is a really nice looking histogram chart :) </>
        )}
      </Body>
    </>
  )
}
