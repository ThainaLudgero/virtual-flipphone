import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import keyMap from "./PhoneKeyboard/keyMap";

const PhoneInputContext = createContext(null);
const EMPTY_KEYBOARD_CONTROLS = {
    onCenterPress: null,
    operatorsEnabled: false,
};

export function PhoneInputProvider({ children }) {
    const [value, setValue] = useState("");
    const [keyboardControls, setKeyboardControls] = useState(EMPTY_KEYBOARD_CONTROLS);
    const valueRef = useRef("");
    const lastKeyRef = useRef(null);
    const letterIndexRef = useRef(0);
    const lastCharPositionRef = useRef(null);
    const timeoutRef = useRef(null);
    const keyPressHandlerRef = useRef(null);
    const keyPressFilterRef = useRef(null);

    const resetMultiTap = useCallback(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        lastKeyRef.current = null;
        letterIndexRef.current = 0;
        lastCharPositionRef.current = null;
    }, []);

    useEffect(() => resetMultiTap, [resetMultiTap]);

    const updateValue = useCallback((nextValue) => {
        valueRef.current = nextValue;
        setValue(nextValue);
    }, []);

    const getValue = useCallback(() => valueRef.current, []);

    const handleChange = useCallback((event) => {
        updateValue(event.target.value);
        resetMultiTap();
    }, [resetMultiTap, updateValue]);

    const clearValue = useCallback(() => {
        updateValue("");
        resetMultiTap();
    }, [resetMultiTap, updateValue]);

    const removeLastCharacter = useCallback(() => {
        updateValue(valueRef.current.slice(0, -1));
        resetMultiTap();
    }, [resetMultiTap, updateValue]);

    const registerKeyPressHandler = useCallback((handler) => {
        keyPressHandlerRef.current = handler;
        resetMultiTap();

        return () => {
            if (keyPressHandlerRef.current === handler) {
                keyPressHandlerRef.current = null;
            }
        };
    }, [resetMultiTap]);

    const registerKeyPressFilter = useCallback((filter) => {
        keyPressFilterRef.current = filter;
        resetMultiTap();

        return () => {
            if (keyPressFilterRef.current === filter) {
                keyPressFilterRef.current = null;
            }
        };
    }, [resetMultiTap]);

    const registerKeyboardControls = useCallback((controls) => {
        setKeyboardControls(controls);

        return () => {
            setKeyboardControls((currentControls) =>
                currentControls === controls ? EMPTY_KEYBOARD_CONTROLS : currentControls
            );
        };
    }, []);

    const handleKeyPress = useCallback((key) => {
        if (keyPressFilterRef.current?.(key)) {
            return;
        }

        if (keyPressHandlerRef.current) {
            keyPressHandlerRef.current(key);
            return;
        }

        const characters = keyMap[key];
        if (!characters) return;

        const isSameKey =
            timeoutRef.current !== null &&
            lastKeyRef.current === key &&
            lastCharPositionRef.current !== null;

        if (isSameKey) {
            const nextIndex = (letterIndexRef.current + 1) % characters.length;
            const position = lastCharPositionRef.current;
            const currentValue = valueRef.current;

            updateValue(
                currentValue.slice(0, position) +
                characters[nextIndex] +
                currentValue.slice(position + 1)
            );
            letterIndexRef.current = nextIndex;
        } else {
            const position = valueRef.current.length;
            updateValue(valueRef.current + characters[0]);
            lastCharPositionRef.current = position;
            lastKeyRef.current = key;
            letterIndexRef.current = 0;
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(resetMultiTap, 500);
    }, [resetMultiTap, updateValue]);

    return (
        <PhoneInputContext.Provider
            value={{
                value,
                keyboardControls,
                handleChange,
                handleKeyPress,
                clearValue,
                removeLastCharacter,
                updateValue,
                getValue,
                registerKeyPressHandler,
                registerKeyPressFilter,
                registerKeyboardControls,
            }}
        >
            {children}
        </PhoneInputContext.Provider>
    );
}

export function usePhoneInput() {
    const context = useContext(PhoneInputContext);
    if (!context) {
        throw new Error("usePhoneInput must be used within a PhoneInputProvider");
    }

    return context;
}
