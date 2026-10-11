import { useState, useEffect } from 'react';

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Fill in keys added to initialValue after the visitor's data was first saved
function withDefaults(parsed, initialValue) {
  return isPlainObject(parsed) && isPlainObject(initialValue)
    ? { ...initialValue, ...parsed }
    : parsed;
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>{
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? withDefaults(JSON.parse(item), initialValue) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() =>{
    if (typeof window === 'undefined') return;
    try{
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }catch (error){
      console.error(`Error reading localStorage key "${key}"`, error);
    }
  }, [key, storedValue]);

  useEffect(() =>{
    const handleStorageChange = (event) => {
      if(event.key === key && event.newValue !== null) {
        try {
          setStoredValue(withDefaults(JSON.parse(event.newValue), initialValue));
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storedValue, setStoredValue]);

  return [storedValue, setStoredValue];
}
