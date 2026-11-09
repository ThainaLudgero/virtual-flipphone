import images from "../../../assets/images";
import { usePhoneInput } from "../PhoneInputContext";

export default function PhoneKeyboard() {
    const { handleKeyPress, keyboardControls } = usePhoneInput();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-full">
                <div className="flex flex-col shrink-0 relative left-4 pb-2">
                    <button className="button pb-1" type="button">
                        <img
                            className="block w-full object-fill edge:h-[41px]"
                            src={images.esquerdotopo}
                            alt=""
                        />
                    </button>
                    <button className="button" type="button">
                        <img
                            className="block w-full object-fill edge:h-[41px]"
                            src={images.esquerdobaixo}
                            alt=""
                        />
                    </button>
                </div>
                <div className="relative shrink-0 w-[45%] bg-red-400">
                    <button
                        type="button"
                        aria-label="Somar"
                        disabled={!keyboardControls.operatorsEnabled}
                        className="cursor-pointer absolute z-55 left-9 edge:left-11 h-7 w-7 edge:h-9 edge:w-9 "
                        onClick={() => handleKeyPress("+")}
                    />
                    <button
                        type="button"
                        aria-label="Multiplicar"
                        disabled={!keyboardControls.operatorsEnabled}
                        className="cursor-pointer absolute z-55 top-9 edge:top-11 h-7 w-7 edge:h-9 edge:w-9"
                        onClick={() => handleKeyPress("*")}
                    />
                    <button
                        type="button"
                        aria-label="Selecionar"
                        disabled={!keyboardControls.onCenterPress}
                        className="cursor-pointer absolute z-55 top-9 left-9 edge:top-11 edge:left-11 h-7 w-7 edge:h-9 edge:w-9"
                        onClick={keyboardControls.onCenterPress}
                    />
                    <button
                        type="button"
                        aria-label="Dividir"
                        disabled={!keyboardControls.operatorsEnabled}
                        className="cursor-pointer absolute z-55 left-18 top-9 edge:left-22 edge:top-11 h-7 w-7 edge:h-9 edge:w-9"
                        onClick={() => handleKeyPress("/")}
                    />
                    <button
                        type="button"
                        aria-label="Subtrair"
                        disabled={!keyboardControls.operatorsEnabled}
                        className="cursor-pointer absolute z-55 left-9 top-18 edge:left-11 edge:top-23 h-7 w-7 edge:h-9 edge:w-9"
                        onClick={() => handleKeyPress("-")}
                    />
                    <img
                        className="block w-full h-full object-fill"
                        src={images.botaocentral}
                        alt=""
                    />
                </div>
                <div className="flex flex-col relative right-1 shrink-0 pb-2">
                    <button className="button pb-1 relative right-3" type="button">
                        <img
                            className="block w-full object-fill edge:h-[41px]"
                            src={images.direitotopo}
                            onClick={() => handleKeyPress("ac")}
                            alt="botao direito topo com uma bolinha no centro"
                        />
                    </button>

                    <button className="button" type="button">
                        <img
                            className="block w-full object-fill edge:h-[41px]"
                            src={images.direitobaixo}
                            alt="botao direito baixo com uma bolinha no centro"
                        />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex">
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("1")}><img src={images.image1} alt="1" /></button>
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("2")}><img src={images.image2} alt="2 ABC" /></button>
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("3")}><img src={images.image3} alt="3 DEF" /></button>
                </div>
                <div className="flex">
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("4")}><img src={images.image4} alt="4 GHI" /></button>
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("5")}><img src={images.image5} alt="5 JKL" /></button>
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("6")}><img src={images.image6} alt="6 MNO" /></button>
                </div>
                <div className="flex">
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("7")}><img src={images.image7} alt="7 PQRS" /></button>
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("8")}><img src={images.image8} alt="8 TUV" /></button>
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("9")}><img src={images.image9} alt="9 WXYZ" /></button>
                </div>
                <div className="flex">
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("*")}><img src={images.image10} alt="*" /></button>
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("0")}><img src={images.image11} alt="0" /></button>
                    <button className="button button-move" type="button" onClick={() => handleKeyPress("#")}><img src={images.image12} alt="#" /></button>
                </div>
            </div>
        </div>
    );
}