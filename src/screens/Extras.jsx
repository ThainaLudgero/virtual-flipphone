import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import images from "../assets/images";

export default function Extras({ onClose }) {
  const [activeExtra, setActiveExtra] = useState(0);
  const navigate = useNavigate();

  function openCalculator() {
    navigate("/calculator");
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-end bg-white/50">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="extras-title"
        className="w-full bg-linear-to-l from-[#F77CAD] from-35% via-[#FAA7CB] via-91% to-[#FDD6EC] p-3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative mb-3 flex items-center justify-center">
          <img className="absolute left-0 pl-2" src={images.extrasIcon} alt="" />
          <h2 id="extras-title" className="text-center text-sm edge:text-base">
            Extras
          </h2>
        </div>

        <ul className="bg-[#FFFAFC]">
          {/* items */}
          <li>
            <button
              type="button"
              onClick={openCalculator}
              aria-pressed={activeExtra === 0}
              className={`flex w-full items-center px-1 text-left text-sm edge:text-base cursor-pointer ${
                activeExtra === 0
                  ? "bg-[linear-gradient(180deg,#FFDD94_0%,#FFDD94_5%,#FFCF67_15%,#FFCF67_69%,#FCBC32_100%)]"
                  : "bg-transparent"
              }`}
            >
              <span className="pr-2">
                <img src={images.calculatorIcon} alt="" />
              </span>
              Calculator
            </button>
          </li>
        </ul>
      </section>
      <footer className="flex w-full text-sm edge:text-base">
        <div className="w-full bg-linear-to-r from-[#F77CAD] from-40% to-[#FDD6EC]">
          <button
            type="button"
            onClick={onClose}
            className="w-fit cursor-pointer py-1 pl-2 text-left"
          >
            Exit
          </button>
        </div>
        <div className="w-full bg-linear-to-l from-[#F77CAD] from-40% to-[#FDD6EC]">
          <button
            type="button"
            onClick={activeExtra === 0 ? openCalculator : undefined}
            aria-disabled={activeExtra !== 0}
            className="w-fit block ml-auto cursor-pointer py-1 pr-2 text-right"
          >
            Select
          </button>
        </div>
      </footer>
    </div>
  );
}