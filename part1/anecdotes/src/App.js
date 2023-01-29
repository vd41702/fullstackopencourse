import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const incAnecdote = (newIndex) => {
    console.log("Incrementing anecdote index to", newIndex)
    setSelected(newIndex)
  }

  const registerVote = (voteIndex) => {
    console.log("Incrementing vote to", votes[voteIndex] + 1)
    const temp = [...votes]
    temp[voteIndex]++
    setVotes(temp)
  }
  


  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button label="vote" func={() => registerVote(selected)}></Button>
      <Button label="next" func={() => incAnecdote((selected + 1) % anecdotes.length)}></Button>
      <hr></hr>
      <h3>Anecdote with the most votes</h3>
      <p>{anecdotes[topAnec(votes)]}</p>
      <p>has {votes[topAnec(votes)]} votes</p>
    </div>
  )
}


const Button = ({label, func}) => <button onClick={func}>{label}</button>

const topAnec = (votes) => {
  let bestIndex = 0
  for(let i = 1; i<votes.length; i++) {
    if(votes[bestIndex] < votes[i]) {
      bestIndex = i
    }
  }
  return bestIndex
}

export default App
