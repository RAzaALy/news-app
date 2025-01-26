// src/utils/localStorage.ts

export interface Preferences {
    source: string;
    category: string;
  }
  
  export const savePreferences = (preferences: Preferences): void => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  };
  
  export const getPreferences = (): Preferences => {
    const preferences = localStorage.getItem("userPreferences");
    return preferences ? JSON.parse(preferences) : { source: "", category: "" };
  };
  
  export const removePreferences = (): void => {
    localStorage.removeItem("userPreferences");
  };
  
  export const isPreferencesApplied = () : boolean => {
    return localStorage.getItem("userPreferences") ? true : false;
  }