import { romanize } from './romanize'
import { cleanPieChartData } from './polish-graph-data'
import { transactionData } from '../data/consts'

describe('when the arguments passed are numbers', () => {
  test('should return "CL"', () => {
    expect(romanize(150)).toBe('CL')
  })

  test('should return "LXXIX"', () => {
    expect(romanize(79.84)).toBe('LXXIX')
  })
})

// const result = [ [ 'Category', 'Amount' ], [ 'Shoes', 257.12 ], [ 'Tools', 248.81 ], [ 'Home', 319.69 ], [ 'Movies', 50.93 ], [ 'Automotive', 247.31 ], [ 'Clothing', 191.56 ], [ 'Kids', 68.64 ], [ 'Sports', 151.99 ], [ 'Garden', 247 ], [ 'Industrial', 226.25 ], [ 'Toys', 272.25 ], [ 'Music', 385.31 ], [ 'Computers', 199.64 ], [ 'Grocery', 228.95 ], [ 'Jewelry', 320.81 ], [ 'Beauty', 284.2 ], [ 'Games', 222.09 ], [ 'Outdoors', 249.52 ], [ 'Books', 165.49 ], [ 'Baby', 275.23 ], [ 'Health', 118.8 ], [ 'Electronics', 187.68 ] ]

describe('When test data is provided', () => {
  test('should return "CL"', () => {
    console.log(cleanPieChartData(transactionData)[1])
    expect(cleanPieChartData(transactionData)[1][0]).toBe('Shoes')
    expect(cleanPieChartData(transactionData)[1][1]).toBe(257.12)
  })
})
