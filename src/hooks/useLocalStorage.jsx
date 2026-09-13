import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>{
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
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
          setStoredValue(JSON.parse(event.newValue));
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
