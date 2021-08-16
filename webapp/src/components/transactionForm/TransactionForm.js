import React, { useState, useEffect } from 'react'
import { string, bool, number, shape, func } from 'prop-types'
import styled from '@emotion/styled'
import { AiOutlineClose } from 'react-icons/ai'
import uuid from 'react-uuid'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const ModalHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 10px 16px;
  border-radius: 4px 4px 0 0;
  background: #f9fafb;
  border-bottom: 1px solid #dadcdf;
`

const Header = styled.h2`
  font-size: 20px;
  color: #2f3337;
  margin: 0;
`

const Body = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const CloseButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 10px;
`

const FormRow = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Label = styled.label`
  color: #2f3337;
  width: 120px;
  font-size: 14px;
  letter-spacing: 0;
`

const RadioLabel = styled.label`
  color: #2f3337;
  width: 40px;
  font-size: 14px;
  letter-spacing: 0;
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

const ModalFooter = styled.section`
  display: flex;
  justify-content: ${props => props.isNew ? 'flex-end' : 'space-between'};
  align-items: center;
  height: 50px;
  padding: 12px 16px 12px 24px;
  border-radius: 4px 4px 0 0;
  background: #f9fafb;
  border-top: 1px solid #dadcdf;
`

const SaveButton = styled.button`
  display:flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-size: 14px;
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

const CancelButton = styled.button`
  display:flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-size: 14px;
  padding: 8px 16px;
  background-color: #e7e8ea;
  border-color: #fff;
  color: #2f3337;
  cursor: pointer;
  border-radius: 2px;
  margin-right: 15px;

  &:hover {
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
  }

  &:active, &:focus {
    border-color: #ced1d5;
    background-color: #fff;
    background-color: #014f71;
  }
`

export default function TransactionForm (props) {
  const [isNew, setIsNew] = useState(true)
  const [transactionId, setTransactionId] = useState('')
  const [userId, setUserId] = useState('')
  const [description, setDescription] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (props.transaction) {
      const { transaction } = props
      setIsNew(false)
      setTransactionId(transaction.id)
      setUserId(transaction.user_id)
      setDescription(transaction.description)
      setMerchantId(transaction.merchant_id)
      setAmount(transaction.amount)

      if (transaction.debit) {
        setPaymentType('debit')
      } else {
        setPaymentType('credit')
      }
    }
  }, [])

  const saveTransaction = () => {
    let transaction = {
      user_id: userId,
      description: description,
      merchant_id: merchantId,
      debit: paymentType === 'debit',
      credit: paymentType === 'credit',
      amount: +amount,
      id: isNew ? uuid() : props.transaction.id
    }

    // normally I would take this obj and call an api to save it on the backend,
    // then reload the app to pull down the new data
    props.updateTransactions(transaction)
  }

  const title = isNew ? 'Create New Transaction' : transactionId

  return (
    <Container>
      <ModalHeader>
        <Header>{title}</Header>
        <CloseButton onClick={props.closeModal}><AiOutlineClose /></CloseButton>
      </ModalHeader>
      <Body>
        <Form>
          <FormRow>
            <Label htmlFor='user_id'>User ID</Label>
            <Input id='user_id' onChange={(e) => setUserId(e.target.value)} value={userId} />
          </FormRow>
          <FormRow>
            <Label htmlFor='description'>Description</Label>
            <Input id='description' onChange={(e) => setDescription(e.target.value)} value={description} />
          </FormRow>
          <FormRow>
            <Label htmlFor='merchantId'>Merchant ID</Label>
            <Input id='merchantId' onChange={(e) => setMerchantId(e.target.value)} value={merchantId} />
          </FormRow>
          <FormRow>
            <Label htmlFor='isDebit'>Debit/Credit</Label>
            <RadioLabel htmlFor='isDebit'>Debit</RadioLabel>
            <input
              checked={paymentType === 'debit'}
              id='isDebit'
              onChange={() => setPaymentType('debit')}
              style={{ marginRight: '20px' }}
              type='radio' />
            <RadioLabel htmlFor='isCredit'>Credit</RadioLabel>
            <input
              checked={paymentType === 'credit'}
              id='isCredit'
              onChange={() => setPaymentType('credit')}
              type='radio' />
          </FormRow>
          <FormRow>
            <Label htmlFor='amount'>Amount</Label>
            <Input id='amount' onChange={(e) => setAmount(e.target.value)} type='number' value={amount} />
          </FormRow>
        </Form>
      </Body>
      <ModalFooter isNew={isNew}>
        { !isNew && <SaveButton onClick={() => props.deleteTransaction(props.transaction.id)}>Delete</SaveButton> }
        <span style={{ display: 'flex' }}>
          <CancelButton onClick={props.closeModal}>Cancel</CancelButton>
          <SaveButton onClick={saveTransaction}>Save</SaveButton>
        </span>

      </ModalFooter>
    </Container>
  )
}

TransactionForm.propTypes = {
  closeModal: func,
  deleteTransaction: func,
  transaction: shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }),
  updateTransactions: func
}
