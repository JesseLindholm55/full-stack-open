const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const biggestVotesOrder = (anecdotes) => {
  const sortedAnecdotes = anecdotes.sort(function (a, b) {
    return b.votes - a.votes;
  });
  return sortedAnecdotes;
};

const initialAnecdotes = anecdotesAtStart.map(asObject);

const reducer = (state = initialAnecdotes, action) => {
  switch (action.type) {
    case "ADD_VOTE":
      let voteAddedState = JSON.parse(JSON.stringify(state));
      for (let i = 0; i < voteAddedState.length; i++) {
        const element = voteAddedState[i];
        if (element.id === action.id) {
          element.votes++;
        }
      }
      return biggestVotesOrder(voteAddedState);

    case "NEW_ANECDOTE":
      let newAnecdoteAdded = JSON.parse(JSON.stringify(state));
      let newAnecdote = action.content;
      newAnecdoteAdded = [...newAnecdoteAdded, newAnecdote];
      console.log(newAnecdoteAdded);
      return newAnecdoteAdded;

    case "SET_ANECDOTES":
      return action.payload;

    default:
      return biggestVotesOrder(state);
  }
};

export default reducer;
