import React from 'react'
import { useTable, usePagination } from 'react-table'
import { arrayOf, string, bool, number, shape, func } from 'prop-types'
import styled from '@emotion/styled'
import {
  FaEdit,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight } from 'react-icons/fa'

import { romanize } from '../../util/romanize'

const Styles = styled.div`
  padding: 1rem;
  max-height: 1000px;

  table {
    border-spacing: 0;
    background-color: #fff;
    width: 100%;
    max-height: 1000px;

    th {
      background-color: #f9fafb;
      font-size: 16px;
      color: #626669;
      font-weight: 600;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      text-align: center;
      border-bottom: 1px solid #ced1d5;
      height: 35px;
    }

    td {
      font-size: 14px;
    }
  }
`
const IconBox = styled.span`
  cursor: pointer;
  width: 100%;
  height: 100%;
`

const Pagination = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9fafb;
  font-size: 16px;
  color: #626669;
  padding: 0 16px;

  button {
    cursor: pointer;
    background: transparent;
    border: none;
  }

  section {
    display: flex;
    align-items: center;
  }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable ({ convertToRoman, editTransaction, data = [] }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'User ID',
        accessor: 'user_id'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Merchant ID',
        accessor: 'merchant_id'
      },
      {
        Header: 'Debit',
        accessor: d => d.debit.toString()
      },
      {
        Header: 'Credit',
        accessor: d => d.credit.toString()
      },
      {
        Header: 'Amount',
        accessor: d => convertToRoman ? romanize(d.amount) : '$' + d.amount.toString()
      },
      {
        Header: '',
        id: d => d.id + 'edit',
        // eslint-disable-next-line react/display-name
        Cell: (d) => <IconBox onClick={() => editTransaction(d.row.original)} ><FaEdit size={20} /></IconBox>
      }
    ],
    [convertToRoman]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({ columns,
    data,
    initialState: { pageIndex: 0 } }, usePagination)

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={`row-${i}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  key={column.header}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr key={`transaction-${row.id}`} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      data-testid={makeDataTestId(cell.row.id, cell.column.id)}
                      key={`transaction-${makeDataTestId(cell.row.id, cell.column.id)}`}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <Pagination>
        <section>
          <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
            <FaAngleDoubleLeft size={20} />
          </button>
          <button disabled={!canPreviousPage} onClick={() => previousPage()}>
            <FaAngleLeft size={20} />
          </button>
          <span data-testid='pagination-count'>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button disabled={!canNextPage} onClick={() => nextPage()}>
            <FaAngleRight size={20} />
          </button>
          <button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
            <FaAngleDoubleRight size={20} />
          </button>
        </section>

        <section>
          Go to page:
          <input
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px', padding: '2px 4px', margin: '0 20px 0 10px' }}
            type='number'
          />

          <select
            onBlur={e => {
              setPageSize(Number(e.target.value))
            }}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
            value={pageSize}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
            Show {pageSize}
              </option>
            ))}
          </select>
        </section>
      </Pagination>
    </Styles>
  )
}

TxTable.propTypes = {
  convertToRoman: bool,
  data: arrayOf(
    shape({
      id: string,
      user_id: string,
      description: string,
      merchant_id: string,
      debit: bool,
      credit: bool,
      amount: number
    })
  ),
  editTransaction: func
}
