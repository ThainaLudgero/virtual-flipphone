import images from "../../../assets/images";
export default function PhoneKeyboard({ onKeyPress, onDelete }) {
    return (
        <div className="flex flex-col gap-5 items-center justify-center pb-5 h-full w-full ">
            <div className="flex w-full items-center justify-center">
                <div className="flex shrink-0 flex-col pb-4 relative left-5">
                    <button className="button"><img className="w-25" src={images.esquerdotopo}/></button>
                    <button className="button"><img src={images.esquerdobaixo}/></button> 
                </div>
                <button className="shrink-0"><img className="block w-30" src={images.botaocentral}/></button>
                <div className="flex shrink-0 flex-col items-end pb-4 relative right-5">
                    <button className="button" type="button" onClick={onDelete} aria-label="Apagar último caractere"><img className="w-25" src={images.direitotopo}/></button>
                    <button className="button"><img src={images.direitobaixo}/></button>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex">
                    <button className="button button-move" onClick={() => onKeyPress("1")}><img src={images.image1} /></button>
                    <button className="button button-move" onClick={() => onKeyPress("2")}><img src={images.image2} /></button>
                    <button className="button button-move" onClick={() => onKeyPress("3")}><img src={images.image3} /></button>
                </div>
                <div className="flex">
                    <button className="button button-move" onClick={() => onKeyPress("4")}><img src={images.image4} /></button>
                    <button className="button button-move" onClick={() => onKeyPress("5")}><img src={images.image5} /></button>
                    <button className="button button-move" onClick={() => onKeyPress("6")}><img src={images.image6} /></button>
                </div>
                <div className="flex">
                    <button className="button button-move" onClick={() => onKeyPress("7")}><img src={images.image7} /></button>
                    <button className="button button-move" onClick={() => onKeyPress("8")}><img src={images.image8} /></button>
                    <button className="button button-move" onClick={() => onKeyPress("9")}><img src={images.image9} /></button>
                </div>
                <div className="flex">
                    <button className="button button-move" onClick={() => onKeyPress("*")}><img src={images.image10} /></button>
                    <button className="button button-move" onClick={() => onKeyPress("0")}><img src={images.image11} /></button>
                    <button className="button button-move" onClick={() => onKeyPress("#")}><img src={images.image12} /></button>
                </div>
            </div>
        </div>
    );
}