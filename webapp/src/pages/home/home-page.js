import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import GetTransactions from '../../gql/transactions.gql'
import { getTransactionData } from '../../services'
import { TxTable } from '../../components/transactions/TxTable'
import Spinner from '../../components/spinner/Spinner'
import Switch from '../../components/switch/Switch'
import Modal from '../../components/modal/Modal'
import TransactionForm from '../../components/transactionForm/TransactionForm'

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

const AddTransactionButton = styled.button`
  height: 40px;
  font-size: 16px;
  padding: 8px 16px;
  background-color: #0485cc;
  border-color: #0485cc;
  color: #fff;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    background-color: #0390de;
    border-color: #0390de;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
  }

  &:active, &:focus {
    background-color: #026089;
  }
`

export function Home () {
  const [isFetching, setIsFetching] = useState(true)
  const [transactionData, setTransactionData] = useState(null)
  const [transaction, setTransaction] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [displayRomanNumerals, setDisplayRomanNumerals] = useState(false)

  const { loading, error } = useQuery(GetTransactions)

  useEffect(() => {
    async function getData () {
      try {
        const data = await getTransactionData()
        setTransactionData(data)
        setIsFetching(false)
      } catch (err) {
        return <Redirect to='/another' />
      }
    }

    getData()
  }, [])

  useEffect(() => {
    if (transaction !== null) {
      setIsOpen(true)
    }
  }, [transaction])

  if (loading || isFetching) {
    return <Spinner />
  }

  if (error) {
    return <Redirect to='/another' />
  }

  const closeModal = () => {
    setTransaction(null)
    setIsOpen(false)
  }

  const updateTransactions = (newTransaction) => {
    closeModal()
    let transactionIndex = transactionData.findIndex(transaction => transaction.id === newTransaction.id)

    if (transactionIndex !== -1) {
      let transactionArray = [ ...transactionData ]
      transactionArray[transactionIndex] = newTransaction
      setTransactionData([...transactionArray])
    } else {
      setTransactionData([...transactionData, newTransaction])
    }
  }

  function deleteTransaction (transToDelete) {
    closeModal()
    // normally here I would call an api that would delete the transaction and
    // then I'd get a new list of the transactions and re-render the app
    let transactions = transactionData.filter((t) => t.id !== transToDelete)
    setTransactionData(transactions)
  }

  function handleSwitchChange () {
    setDisplayRomanNumerals(!displayRomanNumerals)
    setTransactionData([...transactionData])
  }

  return (
    <>
      <Header>
        <H1>Transactions</H1>
        <AddTransactionButton onClick={() => setIsOpen(true)}>Add New Transaction</AddTransactionButton>
      </Header>
      <Switch
        handleOnChange={() => handleSwitchChange()}
        isChecked={displayRomanNumerals}
        label='Display Roman Numerals'
        switchId='roman_switch' />
      <TxTable
        convertToRoman={displayRomanNumerals}
        data={transactionData}
        editTransaction={setTransaction}
      />
      <Modal
        isOpen={isOpen}
      >
        <TransactionForm
          closeModal={closeModal}
          deleteTransaction={deleteTransaction}
          transaction={transaction}
          updateTransactions={updateTransactions}
        />
      </Modal>
    </>
  )
}
