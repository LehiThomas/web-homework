import React from 'react'
import styled from '@emotion/styled'
import { IconContext } from 'react-icons'
import { FaInfoCircle } from 'react-icons/fa'

const Page = styled.div`
  display: grid;
  height: 100%;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-template-columns: 100px 1fr 100px;
  grid-template-rows: 100px 1fr 1fr;
`

const ErrorMessage = styled.section`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Message = styled.p`
  color: #545658;
  font-size: 20px;
  margin: 5px 0 0 0;
`

const ErrorBody = styled.section`
  text-align: center;
`

export function Error () {
  return (
    <Page>
      <ErrorMessage>
        <IconContext.Provider value={{ color: '#026089' }}>
          <div>
            <FaInfoCircle size={100} />
          </div>
        </IconContext.Provider>
        <ErrorBody>
          <Message>Sorry, we are having trouble loading this page.</Message>
          <Message>Please try again later.</Message>
        </ErrorBody>
      </ErrorMessage>
    </Page>
  )
}
