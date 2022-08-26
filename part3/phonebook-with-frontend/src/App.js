import { useState, useEffect } from "react";
import Person from "./components/Person/Person";
import axios from "axios";
import PersonService from "./services/PersonService";
import Message from "./components/Message/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ content: null, error: false });

  const getPersons = () => {
    PersonService.getAll().then((result) => setPersons(result));
  };

  useEffect(getPersons, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.includes(filter)
  );

  const modifyOrAddPerson = (event) => {
    event.preventDefault();
    let doesExist = false;

    const personObject = {
      name: newName,
      number: newPhone,
    };
    for (let i = 0; i < Object.keys(persons).length; i++) {
      const element = Object.values(persons)[i];
      if (element.name === newName) {
        doesExist = true;
        if (
          window.confirm(
            "Person named: " +
              element.name +
              " alreydy exists. Replace old phone with new one?"
          )
        ) {
          PersonService.update(element.id, personObject).then((result) => {
            if (result.error === false) {
              setMessage({
                content: `Person ${element.name} updated`,
                error: false,
              });
              getPersons();
            } else setMessage({ content: result.content, error: result.error });
          });

          setNewName("");
          setNewPhone("");
        }
      }
    }

    if (doesExist === false) {
      PersonService.create(personObject).then((result) => {
        if (result.error === false) {
          setMessage({ content: `Person ${newName} created`, error: false });
          getPersons();
        } else setMessage({ content: result.content, error: result.error });
      });
      setNewName("");
      setNewPhone("");
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      PersonService.delete(person.id).then(
        (result) => {
          setMessage({
            content: `Person ${person.name} deleted`,
            error: false,
          });
          getPersons();
        },
        (error) => {
          setMessage({
            content: `Person ${person.name} has been alreydy deleted`,
            error: true,
          });
        }
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <div className="Filter">
        <div>filter shown with</div>
        <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <h3>add a new</h3>
      <form onSubmit={modifyOrAddPerson}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone number:{" "}
          <input type="tel" value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            <Person person={person} key={person.id} />
            <button type="button" onClick={() => deletePerson(person)}>
              Delete person
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
