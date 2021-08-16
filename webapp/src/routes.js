import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './pages/home'
import { Graphs } from './pages/graphs'
import { Budget } from './pages/budget'
import { Error } from './pages/error'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/graphs'>Graphs</Link>
            </li>
            <li>
              <Link to='/budget'>Budget</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Error} exact path='/error' />
          <Route component={Graphs} exact path='/graphs' />
          <Route component={Budget} exact path='/budget' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: flex;
    flex-direction: column;
    background-color: #e7e8ea;
    height: 100vh;

    .main-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
`

const navStyle = css`
  grid-row: 1;
  padding: 10px 20px;
  background: #2f3337;
  font-size: 18px;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }

  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }

  a {
    color: white;
    text-decoration: none;
  }
`

const contentStyle = css`
  grid-row: 2;
`
