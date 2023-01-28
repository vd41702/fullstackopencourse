import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = g => {
    console.log("incrementing good to", g)
    setGood(g)
  }

  const incNeutral = n => {
    console.log("incrementing neutral to", n)
    setNeutral(n)
  }

  const incBad = b => {
    console.log("incrementing bad to", b)
    setBad(b)
  }

  



  return (
    <div>
      <h3>give feedback</h3>
      <button onClick={() => incGood(good + 1)}>good</button>
      <button onClick={() => incNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => incBad(bad + 1)}>bad</button>

      <h3>statistics</h3>
      
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>

    </div>
  )
}


const StatisticsLine = ({title, val}) => {
  return (
  <tr>
    <td>{title}:</td> 
    <td>{val}</td>
  </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(totalResponses(good, neutral, bad) == 0) {
    return (<p>No feedback given</p>)
  }

  return (
  <table>
    <tbody>
      <StatisticsLine title="good" val={good}></StatisticsLine>
      <StatisticsLine title="neutral" val={neutral}></StatisticsLine>
      <StatisticsLine title="bad" val={bad}></StatisticsLine>
      <StatisticsLine title="all" val={totalResponses(good, neutral, bad)}></StatisticsLine>
      <StatisticsLine title="average" val={averageResponses(good, neutral, bad)}></StatisticsLine>
      <StatisticsLine title="positive" val={positiveResponsePercent(good, neutral, bad)}></StatisticsLine>
    </tbody>
  </table>
  )
}



/* Statistic Calculating Functions */

const totalResponses = (good, neutral, bad) => good + neutral + bad
  
  const averageResponses = (good, neutral, bad) => {
    return (good - bad) / totalResponses(good, neutral, bad)
  }
  
  const positiveResponsePercent = (good, neutral, bad) => {
    return good / totalResponses(good, neutral, bad)
  }


export default App
