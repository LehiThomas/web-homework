export function cleanPieChartData (data) {
  let chartDataObj = {}

  data.forEach(t => {
    if (chartDataObj.hasOwnProperty(t.description)) {
      chartDataObj[t.description] = Math.round((chartDataObj[t.description] + t.amount) * 100) / 100
    } else {
      chartDataObj[t.description] = t.amount
    }
  })

  let chartDataArr = Object.entries(chartDataObj)
  chartDataArr.unshift(['Category', 'Amount'])

  return chartDataArr
}

export function cleanBarChartData (data) {
  let chartDataObj = {}

  data.forEach(t => {
    if (chartDataObj.hasOwnProperty(t.description)) {
      chartDataObj[t.date] = Math.round((chartDataObj[t.date] + t.amount) * 100) / 100
    } else {
      chartDataObj[t.date] = t.amount
    }
  })

  // let chartDataArr = Object.entries(chartDataObj)
  let chartDataObjKeys = Object.keys(chartDataObj)
  let chartDataArr = chartDataObjKeys.map(key => {
    return [chartDataObj[key], new Date(key)]
  })

  chartDataArr.unshift(['Amount', 'Date'])
  return chartDataArr
}
