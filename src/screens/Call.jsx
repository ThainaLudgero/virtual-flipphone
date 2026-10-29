
import { useEffect, useState } from "react";
import images from "../assets/images";
import Calling from "./Calling";

export default function Call({ onClose }) {
  const [isCallingOpen, setIsCallingOpen] = useState(false);

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
              className="absolute left-0 pl-2"
              src={images.telephoneIcon}
              alt=""
            />
            <h2 id="call-title">Entering</h2>
          </div>

          <textarea
            className="w-full resize-none rounded-t-md bg-white focus:outline-none"
            aria-label="Número de telefone"
          />
        </section>

        <footer className="flex h-8 w-full">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer bg-linear-to-r from-[#F77CAD] from-40% to-[#FDD6EC] py-1 pl-2 text-left"
          >
            Exit
          </button>

          <button
            type="button"
            onClick={() => setIsCallingOpen(true)}
            className="w-full cursor-pointer bg-linear-to-l from-[#F77CAD] from-40% to-[#FDD6EC] py-1 pl-2 text-right"
          >
            Call
          </button>
        </footer>
      </div>
    ) : (
      <Calling onClose={() => setIsCallingOpen(false)} />
    )}
  </>
);

}
