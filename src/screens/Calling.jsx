
import { useEffect } from "react";
import images from "../assets/images";

export default function Calling({ onClose }) {
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
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-end bg-white/50">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="calling-title"
        className="w-full bg-linear-to-l from-[#F77CAD] from-35% via-[#FAA7CB] via-91% to-[#FDD6EC] px-1 pt-3"
      >
        <div className="relative mb-3 flex items-center">
          <img
            src={images.calling}
            alt=""
          />
        </div>
        <div className="bg-white rounded-t-md text-center text-xl p-1">
            <h1>Calling...</h1>
            <p>(number)</p>
            <p>Fowarding On</p>
        </div>
        {/* Conteúdo da tela de ligação */}
      </section>

      <footer className="flex h-8 w-full">
        <div
          className="w-full bg-linear-to-l from-[#F77CAD] from-40% to-[#FDD6EC] py-1 pl-2 text-right"
        >
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full text-right cursor-pointer bg-linear-to-r from-[#F77CAD] from-40% to-[#FDD6EC] py-1 pl-2 text-left"
        >
          Exit
        </button>
      </footer>
    </div>
  );
}
