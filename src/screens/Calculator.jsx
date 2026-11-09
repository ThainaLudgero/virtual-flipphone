import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import images from "../assets/images";
import { usePhoneInput } from "../components/phone/PhoneInputContext";

const OPERATORS = new Set(["+", "-", "*", "/"]);
const NUMBER_PATTERN = /^-?(?:\d+(?:\.\d*)?|\.\d+)$/;

function calculateExpression(tokens) {
    if (tokens.length < 3 || tokens.length % 2 === 0) {
        return null;
    }

    const values = [Number(tokens[0])];
    const lowPriorityOperators = [];

    for (let index = 1; index < tokens.length; index += 2) {
        const operator = tokens[index];
        const nextValue = Number(tokens[index + 1]);
        const currentValue = values[values.length - 1];

        if (!Number.isFinite(nextValue)) {
            return null;
        }

        if (operator === "*") {
            values[values.length - 1] = currentValue * nextValue;
        } else if (operator === "/") {
            if (nextValue === 0) {
                return null;
            }
            values[values.length - 1] = currentValue / nextValue;
        } else if (operator === "+" || operator === "-") {
            lowPriorityOperators.push(operator);
            values.push(nextValue);
        } else {
            return null;
        }
    }

    const result = values.reduce((total, value, index) => {
        if (index === 0) {
            return value;
        }

        return lowPriorityOperators[index - 1] === "+"
            ? total + value
            : total - value;
    }, 0);

    return Number.isFinite(result) ? String(result) : null;
}

export default function Calculator({ onClose }) {
    const [expression, setExpression] = useState([]);
    const expressionRef = useRef([]);
    const hasResultRef = useRef(false);
    const {
        value,
        handleChange,
        clearValue,
        updateValue,
        getValue,
        registerKeyPressHandler,
        registerKeyboardControls,
    } = usePhoneInput();

    const handleCalculatorKeyPress = useCallback((key) => {
        const currentValue = getValue();

        if (/^\d$/.test(key)) {
            const startsNewCalculation = hasResultRef.current || currentValue === "Error";
            if (startsNewCalculation) {
                expressionRef.current = [];
                setExpression([]);
            }
            updateValue(startsNewCalculation ? key : currentValue + key);
            hasResultRef.current = false;
            return;
        }

        if (OPERATORS.has(key)) {
            if (!NUMBER_PATTERN.test(currentValue) || !Number.isFinite(Number(currentValue))) {
                return;
            }

            const nextExpression = [...expressionRef.current, currentValue, key];
            expressionRef.current = nextExpression;
            setExpression(nextExpression);
            updateValue("");
            hasResultRef.current = false;
            return;
        }

        if (key === "=") {
            if (!NUMBER_PATTERN.test(currentValue) || !Number.isFinite(Number(currentValue))) {
                return;
            }

            if (expressionRef.current.length === 0) {
                return;
            }

            const result = calculateExpression([...expressionRef.current, currentValue]);
            if (result === null) {
                updateValue("Error");
            } else {
                updateValue(result);
            }
            expressionRef.current = [];
            setExpression([]);
            hasResultRef.current = true;
        }
    }, [getValue, updateValue]);

    useEffect(
        () => registerKeyPressHandler(handleCalculatorKeyPress),
        [handleCalculatorKeyPress, registerKeyPressHandler],
    );

    const handleCenterPress = useCallback(() => {
        handleCalculatorKeyPress("=");
    }, [handleCalculatorKeyPress]);

    useEffect(
        () => registerKeyboardControls({
            onCenterPress: handleCenterPress,
            operatorsEnabled: true,
        }),
        [handleCenterPress, registerKeyboardControls],
    );

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose?.();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    function handleClear() {
        clearValue();
        expressionRef.current = [];
        setExpression([]);
        hasResultRef.current = false;
    }

    function handleInputChange(event) {
        handleChange(event);
        hasResultRef.current = false;
    }

    const displayedExpression = expression.join(" ");

    return(
        <div>
            <div className="flex justify-between w-full px-1">
                <img src={images.sinal} className="h-5" />
                <div className="flex gap-1">
                <img src={images.sino} className="h-5" />
                <img src={images.bateria} className="h-5" />
                </div>
            </div>
            <header className="relative z-10 h-9 bg-[linear-gradient(90deg,#FCA2C7_0%,#F77CAD_50%,#FCA2C7_100%)] ">
                <h1 className="flex h-full items-center justify-center text-base edge:text-xl">
                    Calculator
                </h1>
            </header>
            <div className="px-1 bg-[linear-gradient(90deg,#FCA2C7_0%,#F77CAD_50%,#FCA2C7_100%)]">
                <div
                    className="flex h-14 items-end overflow-hidden bg-[#FFDD94] px-1 pb-1 text-right edge:h-20"
                    aria-label="Expressão"
                >
                    <span className="w-full truncate">{displayedExpression}</span>
                </div>
                <input 
                    value={value}
                    onChange={handleInputChange}
                    aria-label="Número atual ou resultado"
                    className="w-full h-6 edge:h-8 mt-0.5 mb-0.5 bg-[linear-gradient(180deg,#FFDD94_0%,#FFDD94_5%,#FFCF67_15%,#FFCF67_69%,#FCBC32_100%)]" 
                    type="text"
                >
                </input>
            </div>
            <div className="flex justify-center py-4.5 edge:py-6">
                <img className="h-15 edge:h-20" src={images.calculatorguide} alt="Calculator Guide" />
            </div>
            <footer className="flex text-sm edge:text-base">
                <div className="w-full bg-linear-to-r from-[#F77CAD] from-40% to-[#FDD6EC]">
                    <NavLink
                        onClick={onClose}
                        to="/Menu"
                        className="block w-fit cursor-pointer py-1 pl-2"
                    >
                        Exit
                    </NavLink>
                </div>

                <div className="w-full bg-linear-to-l from-[#F77CAD] from-40% to-[#FDD6EC]">
                    <button
                        type="button"
                        onClick={handleClear}
                        className="ml-auto block w-fit cursor-pointer py-1 pr-2"
                    >
                        Clear
                    </button>
                </div>
            </footer>
        </div>
    );
}