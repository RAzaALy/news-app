import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useArticles } from "../../context/ArticlesContext";

const SearchBar = () => {
  const {setFilters} = useArticles()
  const [query, setQuery] = useState<string>("");

  // Function to handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({...prev, keyword : query}))

  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[800px] rounded-md flex bg-white items-center">
      <input
        type="text"
        className="px-3 py-1 lora outline-none text-gray-500 w-11/12"
        placeholder="Explore News ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update the query state
      />
      <button
        type="submit"
        className="w-1/12 border-l-2 border-gray-300 flex justify-center items-center"
      >
        <FaSearch className="text-lg min600:text-xl text-gray-400" />
      </button>
    </form>
  );
};

export default SearchBar;
