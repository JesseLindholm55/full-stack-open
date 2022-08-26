import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({ type: "NEW_ANECDOTE", content: newAnecdote });
    dispatch({ type: "CHANGE_NOTIFICATION", payload: `Added ${anecdote}` });
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">Create new anecdote</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
