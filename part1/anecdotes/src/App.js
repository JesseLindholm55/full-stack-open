import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const votes = [0,0,0,0,0,0,0]
   
  const [selected, setSelected] = useState(0)
  const [newVotes, setVotes] = useState(votes)
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState({position: 0, highestNumber: 0})

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateRandomAnecdote = () => {
    let number = randomNumberInRange(0, 5)
    while (number === selected) {
      number = randomNumberInRange(0, 5)
    }
    setSelected(number);
    
  };

  const voteForCurrentAnecdote = () => {
    let votes = [...newVotes]
    votes[selected] += 1
    setVotes(votes)
    let highestNumber = 0
    let position = 0

    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > highestNumber) {
        highestNumber = votes[i]
        position = i
      }
    }
    setMostVotedAnecdote({position: position, highestNumber: highestNumber})

  }


  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {newVotes[selected]} votes</div>
      <button onClick={voteForCurrentAnecdote}>vote</button>
      <button onClick={generateRandomAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostVotedAnecdote.position]}</div>
      <div>{mostVotedAnecdote.highestNumber}</div>
    </div>
  )
}

export default App