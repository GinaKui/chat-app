import { useEffect, useState } from 'react'

const PREFIX = "CHAT-WHATSAPP-";

/**
 * @param {string} localStorageKey 
 * @param {*} initialValue 
 * @description this custom hook will work like useState, while maintain data persistant by localStorage
 */

export default function useLocalStorage(localStorageKey, initialValue) {
  const prefixedKey = PREFIX + localStorageKey;
  const [value, setValue] = useState(() => {
    const strValue = localStorage.getItem(prefixedKey);
    if(strValue != null) {
      return JSON.parse(strValue)
    }

    if(typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value]);

  return [value, setValue];
}
