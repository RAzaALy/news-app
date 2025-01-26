import { FaFilter } from "react-icons/fa";
import Modal from "../elements/Modal/Modal";
import { useState } from "react";
import { categories, sources } from "../../config/config";
import Button from "../elements/Button/Button";
import { useArticles } from "../../context/ArticlesContext";
// import { Filters } from "../../services/articles";

const FilterAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { filters } = useArticles(); // Assuming filters are being managed in context

  // Count the number of non-empty filters
  const filterCount = [
    filters.source,
    filters.category,
    filters.date
  ].filter(Boolean).length;

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className="flex relative justify-center items-center bg-white text-gray-400 p-2 ml-2 rounded-md transition delay-[10] hover:bg-gray-100"
      >
        <FaFilter className="text-md min600:text-lg" />
        {/* Render badge only when filterCount is greater than 0 */}
        {filterCount > 0 && (
          <div className="absolute -top-1 -right-2 h-4 w-4 bg-red-500 rounded-full text-white text-sm flex justify-center items-center text-[12px]">
            {filterCount}
          </div>
        )}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Filter News">
        <Filter onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default FilterAction;

interface FilterProps {
  onClose: () => void;
}

const Filter = ({ onClose }: FilterProps) => {
  // State to track the input values
  const { setFilters, filters } = useArticles()
  const [selectedDate, setSelectedDate] = useState<string | "">(filters.date || "");
  const [selectedSource, setSelectedSource] = useState<string | "">(filters.source || "");
  const [selectedCategory, setSelectedCategory] = useState<string | "">(filters.category || "");

  // State to track if the apply button should be enabled
  // const isApplyDisabled = !selectedDate && !selectedSource && !selectedCategory;

  // Function to handle Apply button click
  const handleApply = () => {
  

    // Set filters only if they have values
    setFilters(prev => ({...prev, date: selectedDate, category: selectedCategory, source: selectedSource}));

    onClose(); // Close the modal after applying the filter
  };

  const removeFilterHandler = () => {
    setFilters(prev => ({...prev, date: "", category: "", source: ""}))
    onClose()
  }

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Select a Date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]} // Restrict future dates
          className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-300 "
        />

      </div>

      <div className="mt-2">
        {/* Source Select */}
        <div className="space-y-2">
          <label htmlFor="source" className="block text-sm font-medium text-gray-700">
            Source
          </label>
          <select
            id="source"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
          >
            <option value="">Select a Source</option>
            {sources.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Category Select */}
        <div className="my-2 space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
          >
            <option value="">Select a Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button
        text="Remove All Filters"
        onClick={removeFilterHandler}
        className="bg-gray-300 border-2 border-gray-200 border-opacity-50 hover:bg-gray-100 w-46 cursor-pointer"
      />
        <Button
          text="Apply"
          onClick={handleApply}
          className="bg-gray-300 border-2 border-gray-200 border-opacity-50 hover:bg-gray-100 w-28 cursor-pointer"
        />
      </div>
    </>
  );
};
