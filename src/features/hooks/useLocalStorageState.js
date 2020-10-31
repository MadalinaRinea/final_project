import { useState } from 'react';

export default function useLocalStorageState(key, initialValue) {
    const [value, setValue] = useState(() => {
        const oldValue = JSON.parse(window.localStorage.getItem(key));
        if (oldValue) {
            return oldValue;
        }
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
    });

    function updateValue(newVal) {
        if (newVal !== undefined && newVal !== null) {
            window.localStorage.setItem(key, JSON.stringify(newVal));
        } else {
            window.localStorage.removeItem(key);
        }
        setValue(newVal);
    }

    return [value, updateValue];
}