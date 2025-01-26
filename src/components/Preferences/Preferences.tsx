import React, { useState } from "react";
import { categories, sources } from "../../config/config";
import Button from "../elements/Button/Button";
import { Preferences as PreferencesInterface, savePreferences, removePreferences, getPreferences } from "../../utils/localstorage";
import { useArticles } from "../../context/ArticlesContext";

interface PreferencesProps {
    onClose: () => void; // onClose function prop
  }

  const Preferences: React.FC<PreferencesProps> = ({ onClose }) => {
  const [preferences, setPreferences] = useState<PreferencesInterface>(getPreferences());
  const {setFilters} = useArticles()

  // Handle Source change
  const handleSourceChange = (value: string) => {
    setPreferences((prev) => ({
      ...prev,
      source: value, // Update source correctly
    }));
  };

  // Handle Category change
  const handleCategoryChange = (value: string) => {
    setPreferences((prev) => ({
      ...prev,
      category: value, // Update category correctly
    }));
  };

  // Save preferences to local storage
  const handleSave = () => {
    savePreferences(preferences);
    onClose()
    
  };

  // Remove preferences from local storage
  const removeAllPreferences = () => {
    setPreferences({category: "", source: ""})
    setFilters(prev => ({...prev, category : "", source: ""}))
    removePreferences();
    onClose()
  };

  return (
    <div className="p-2 sm:p-6 bg-white rounded-md ">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      {/* Sources Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Sources</h3>
        {sources.map((source) => (
          <div key={source} className="flex items-center mb-2">
            <input
              type="radio"
              id={`source-${source}`}
              name="source"
              className="mr-2 cursor-pointer"
              checked={preferences.source === source} // Corrected comparison
              onChange={() => handleSourceChange(source)} // Update state correctly
            />
            <label htmlFor={`source-${source}`} className="cursor-pointer">
              {source}
            </label>
          </div>
        ))}
      </div>

      {/* Categories Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              id={`category-${category}`}
              name="category"
              className="mr-2 cursor-pointer"
              checked={preferences.category === category} // Corrected comparison
              onChange={() => handleCategoryChange(category)} // Update state correctly
            />
            <label htmlFor={`category-${category}`} className="cursor-pointer">
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6 flex-col sm:flex-row">
        <Button
          text="Remove Preferences"
          className="transition-colors bg-slate-200 hover:bg-slate-300 px-6 py-2"
          onClick={removeAllPreferences}
        />
        <Button
          text="Save Preferences"
          className="transition-colors bg-slate-200 hover:bg-slate-300 px-6 py-2 mt-3 sm:mt-0"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default Preferences;
