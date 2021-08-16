import React from 'react'
import { render, screen } from '@testing-library/react'

import { TxTable } from './TxTable'
import { transactionData } from '../../data/consts'

describe('Transactions Table', () => {
  beforeEach(async () => {
    render(<TxTable convertToRoman={false}
      data={transactionData}
      editTransaction={() => {}} />)
  })

  test('should show user "employee4" with amount "$150"', () => {
    const user = screen.getByTestId('transaction-0-user_id')
    const amount = screen.getByTestId('transaction-0-Amount')

    expect(user.textContent).toBe('employee4')
    expect(amount.textContent).toBe('$150')
  })

  test('should show "Page 1 of 10"', async () => {
    const pagination = screen.getByTestId('pagination-count')
    expect(pagination).toBeInTheDocument()
  })
})
