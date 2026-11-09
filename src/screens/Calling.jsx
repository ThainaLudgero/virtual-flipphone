
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
            className="h-6 edge:h-8"
            src={images.calling}
            alt="two telephones"
          />
        </div>
        <div className="bg-white rounded-t-md text-center edge:text-xl p-1">
            <h1>Calling...</h1>
            <p>(number)</p>
            <p>Fowarding On</p>
        </div>
        {/* Conteúdo da tela de ligação */}
      </section>

      <footer className="flex w-full text-sm edge:text-base">
        <div className="w-full bg-linear-to-r from-[#F77CAD] from-40% to-[#FDD6EC]">
          <button
            type="button"
            onClick={onClose}
            className="w-fit ml-auto block cursor-pointer  py-1 pr-2"
          >
            Exit
          </button>
        </div>
      </footer>
    </div>
  );
}
