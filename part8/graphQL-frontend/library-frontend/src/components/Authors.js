import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  let authors = [];

  let selectOptions = [];

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  } else {
    authors = result.data.allAuthors;
    const options = [];
    for (let i = 0; i < authors.length; i++) {
      const element = authors[i];
      options.push({ value: element.name, label: element.name });
    }
    selectOptions = options;
  }

  if (!props.show) {
    return null;
  }

  const updateAuthor = () => {
    if (selectedOption === null) alert("Select name");
    else {
      editAuthor({
        variables: { name: selectedOption.value, year: parseInt(year) },
      });
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={selectOptions}
      />
      <input
        type="number"
        value={year}
        onChange={({ target }) => setYear(target.value)}
      />
      <button onClick={updateAuthor}>Update author</button>
    </div>
  );
};

export default Authors;
