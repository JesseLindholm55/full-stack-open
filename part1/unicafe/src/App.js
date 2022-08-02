import { useState, useEffect } from 'react'

const StatisticsLine = (props) => {
  if (props.text === 'percentage') return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value} %</td>
    </tr>
  )
  else return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
    )
}

const Statistics = (props) => {
  const title = 'statistics'
    if (props.total === 0) return (
      <div>
        <h2>{title}</h2>
        <div>No feedback given</div>
      </div>
    )
    else return (
      <div>
        <h2>{title}</h2>
        <table>
          <tbody>
            <StatisticsLine text="good" value={props.good}/>
            <StatisticsLine text="neutral" value={props.neutral}/>
            <StatisticsLine text="bad" value={props.bad}/>
            <StatisticsLine text="total" value={props.total}/>
            <StatisticsLine text="average" value={props.average}/>
            <StatisticsLine text="percentage" value={props.percentage}/>
          </tbody>
        </table>
      </div>
    )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if (good > 0 || bad > 0) {
      calculateAverage()
      calculatePositivePerccentage()
    }
  })

  const addGood = () => {
    setGood(good + 1)
    addTotal()
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
    addTotal()
  }

  const addBad = () => {
    setBad(bad + 1)
    addTotal()
  }

  const addTotal = () => {
    setTotal(total + 1)
  }

  const calculateAverage = () => {
    const averageTotal = (good * 1.00 +  bad * -1.00) / total
    setAverage(averageTotal)
  }

  const calculatePositivePerccentage = () => {
    const positivePerccentage = (good / total) * 100.00
    setPercentage(positivePerccentage)
  }
  
  return (
    <div>
      <h2>give feedback</h2>
      <table>
        <tbody>
          <tr>
          <td><button onClick={addGood}>good</button></td>
          <td><button onClick={addNeutral}>neutral</button></td>
          <td><button onClick={addBad}>bad</button></td>
          </tr>
        </tbody>
      </table>
      <Statistics 
      good={good} bad={bad} neutral={neutral} average={average} percentage={percentage} total={total}
      />
    </div>
  )
}

export default App