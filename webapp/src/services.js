import { transactionData } from './data/consts'

const waitFor = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getTransactionData () {
  // mock api call
  let response = await transactionData
  await waitFor(500)
  return response
}
