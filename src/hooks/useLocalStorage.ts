import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

const isPlainObject = (v: unknown) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Fill in keys added to initialValue after the visitor's data was first saved
function withDefaults<T>(parsed: any, initialValue: T): T {
  return isPlainObject(parsed) && isPlainObject(initialValue)
    ? { ...initialValue, ...parsed }
    : parsed;
}

export function useLocalStorage<T>(key: string, initialValue:T):[T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() =>{
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
    const handleStorageChange = (event: StorageEvent) => {
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
