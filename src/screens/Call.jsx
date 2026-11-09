
import { useCallback, useEffect, useRef, useState } from "react";
import images from "../assets/images";
import { usePhoneInput } from "../components/phone/PhoneInputContext";
import Calling from "./Calling";

const CALL_BLOCKED_OPERATORS = new Set(["+", "-", "*", "/"]);

export default function Call({ onClose }) {
  const [isCallingOpen, setIsCallingOpen] = useState(false);
  const [showNoNumber, setShowNoNumber] = useState(false);
  const {
    value,
    handleChange,
    removeLastCharacter,
    registerKeyPressFilter,
    registerKeyboardControls,
  } = usePhoneInput();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const filterOperators = useCallback((key) => CALL_BLOCKED_OPERATORS.has(key), []);
  const handleCenterPress = useCallback(() => onCloseRef.current(), []);
  const handleCall = useCallback(() => {
    if (!value.trim()) {
      setShowNoNumber(true);
      return;
    }

    setShowNoNumber(false);
    setIsCallingOpen(true);
  }, [value]);

  useEffect(() => registerKeyPressFilter(filterOperators), [filterOperators, registerKeyPressFilter]);
  useEffect(() => {
    if (value.trim()) {
      setShowNoNumber(false);
    }
  }, [value]);

  useEffect(
    () => registerKeyboardControls({
      onCenterPress: isCallingOpen ? null : handleCenterPress,
      operatorsEnabled: false,
    }),
    [handleCenterPress, isCallingOpen, registerKeyboardControls],
  );

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        if (isCallingOpen) {
          setIsCallingOpen(false);
        } else {
          onClose();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isCallingOpen]);

  
return (
  <>
    {!isCallingOpen ? (
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end bg-white/50">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="call-title"
          className="w-full bg-linear-to-l from-[#F77CAD] from-35% via-[#FAA7CB] via-91% to-[#FDD6EC] px-1 pt-3"
        >
          <div className="relative mb-2 flex items-center justify-center">
            <img
              className="absolute left-2 h-6 edge:h-8"
              src={images.telephoneIcon}
              alt=""
            />
            <h2 id="call-title" className="text-sm edge:text-base">Entering</h2>
          </div>

          <textarea
            className="w-full resize-none rounded-t-md bg-white focus:outline-none"
            aria-label="Número de telefone"
            value={value}
            onChange={handleChange}
          />
          {showNoNumber && (
            <p className="text-center text-sm" role="status" aria-live="polite">
              No number
            </p>
          )}
        </section>

        <footer className="flex w-full text-sm edge:text-base">
          <div className="flex w-full bg-linear-to-r from-[#F77CAD] from-40% to-[#FDD6EC]">
              <button
                  type="button"
                  onClick={removeLastCharacter}
                  className="w-fit cursor-pointer py-1 pl-2"
              >
                  Delete
              </button>
          </div>

          <div className="flex w-full justify-center">
              <button
                  type="button"
                  onClick={onClose}
                  className="w-fit cursor-pointer py-1"
              >
                  Exit
              </button>
          </div>

          <div className="flex w-full justify-end bg-linear-to-l from-[#F77CAD] from-40% to-[#FDD6EC]">
              <button
                  type="button"
                  onClick={handleCall}
                  className="w-fit cursor-pointer py-1 pr-2"
              >
                  Call
              </button>
          </div>
      </footer>
      </div>
    ) : (
      <Calling onClose={() => setIsCallingOpen(false)} />
    )}
  </>
);

}
