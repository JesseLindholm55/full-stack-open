import { useDispatch, useSelector } from "react-redux"

const AnecdoteList = () => {

    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => {

        return state.anecdote.filter(anecdote => anecdote.content.includes(filter))})
    const dispatch = useDispatch()
    

    const vote = (anecdote) => {
      dispatch({type: 'ADD_VOTE', id: anecdote.id})
      dispatch({type: 'CHANGE_NOTIFICATION', payload: `Added ${anecdote.content}`})
    }

    return (
      <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            Has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>Vote</button>
          </div>
        </div>
        )}
      </div>
    )
}

export default AnecdoteList