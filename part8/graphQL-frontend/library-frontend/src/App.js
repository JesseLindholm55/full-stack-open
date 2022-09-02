import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(
        `Added book: ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name}`
      );
    },
  });

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    setPage("login");
    setLoggedIn(false);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {loggedIn ? (
          <div>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => logout()}>Log out</button>
          </div>
        ) : (
          <button onClick={() => setPage("login")}>Login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login
        show={page === "login"}
        updateLoggedIn={setLoggedIn}
        updatePage={setPage}
      />
    </div>
  );
};

export default App;
