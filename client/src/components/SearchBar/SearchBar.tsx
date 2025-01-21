import { ChangeEvent, FC, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.style.css";
import useDebounce from "../../hooks/useDebounce";

interface SearchBarProps {
  updateData: (input: string) => void;
  delay: number;
}

const SearchBar: FC<SearchBarProps> = ({ updateData, delay }) => {
  const [userInput, setUserInput] = useState("");
  const debounceValue = useDebounce(delay, userInput);

  useEffect(() => {
    updateData(debounceValue);
  }, [debounceValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSearchButton = () => {
    updateData(userInput);
  };

  return (
    <div className="search">
      <input
        className="searchInput"
        value={userInput}
        onChange={handleInputChange}
        placeholder="You can search the supplier here"
      ></input>
      <button className="searchButton" onClick={handleSearchButton}>
        <SearchIcon className="icon" />
      </button>
    </div>
  );
};

export default SearchBar;
