import { useState, useRef, useEffect } from "react";
import images from "../../assets/images";
import PhoneKeyboard from "./PhoneKeyboard/PhoneKeyboard";
import PhoneScreen from "./PhoneScreen";
import keyMap from "./PhoneKeyboard/keymap";
export default function Phone() {
    // useState para digitar um número e para apagar a última tecla digitada
    const [inputValue, setInputValue] = useState("");
    // Multitap

    //  última tecla digitada
    const [lastKey, setLastKey] = useState(null);
    //indica a letra selecionada.
    const [letterIndex, setLetterIndex] = useState(0);
    // o caractere que será substituído.
    const [lastCharPosition, setLastCharPosition] = useState(null);
    // determinar quando uma sequência de toques termina.
    const timeoutRef = useRef(null);

    useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
    }, []);

    function handleDelete() {
    setInputValue((currentValue) => currentValue.slice(0, -1));

    setLastKey(null);
    setLetterIndex(0);
    setLastCharPosition(null);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    }
    function handleKeyPress(key) {
        const characters = keyMap[key];

        if (!characters) return;

        // Ainda estamos dentro do intervalo e a tecla é a mesma?
        const isSameKey =
            timeoutRef.current !== null &&
            lastKey === key &&
            lastCharPosition !== null;

        if (isSameKey) {
            // Avança para a próxima opção dessa tecla.
            const nextIndex = (letterIndex + 1) % characters.length;
            const nextChar = characters[nextIndex];

            // Substitui o caractere atual, sem alterar o restante.
            setInputValue((currentValue) =>
                currentValue.slice(0, lastCharPosition) +
                nextChar +
                currentValue.slice(lastCharPosition + 1)
            );

            setLetterIndex(nextIndex);
            } else {
                // Uma nova tecla inicia um novo caractere.
                const firstChar = characters[0];

                setInputValue((currentValue) => currentValue + firstChar);
                setLastCharPosition(inputValue.length);
                setLastKey(key);
                setLetterIndex(0);
            }

            // Reinicia a janela de tempo a cada toque.
            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                setLastKey(null);
                setLastCharPosition(null);
                timeoutRef.current = null;
            }, 500);
        }

        

    return(
        <div className="flex justify-center">
            <img className="h-screen absolute z-10 pointer-events-none" src={images.flipphone} alt="flipphone" />
            <div className="flex justify-center items-center">
                <PhoneScreen inputValue={inputValue} onInputChange={setInputValue}  />
            </div>
            {/* h-108 w-78 */}
            <div className="absolute z-11 flex h-108 top-159">
                <PhoneKeyboard onKeyPress={handleKeyPress} onDelete={handleDelete}/>
            </div>  
        </div>
    );
}