import { useState, useEffect } from "react"; //*These are Hooks
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
  console.log("render");

  const [searchField, setSearchField] = useState(""); //[value, setVAlue]
  //console.log(searchField)
  const [monsters, setMonsters] = useState([]);

  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  const [title, setTitle] = useState("");

  //!How to fetch api in functional component
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []); //* [] means dependincy so we leave it empty to not call the function again

  useEffect(() => {
    //* this method is a side effect method
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]); ///* Once monsters or searchfield are changes, then re-render the function

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>

      <SearchBox
        className="monster-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <br />
      <SearchBox
        className="title-search-box"
        onChangeHandler={onTitleChange}
        placeholder="set title"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
