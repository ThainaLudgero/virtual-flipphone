import images from "../../assets/images";
import PhoneKeyboard from "./PhoneKeyboard/PhoneKeyboard";
import PhoneScreen from "./PhoneScreen";
import { PhoneInputProvider } from "./PhoneInputContext";
export default function Phone() {
    return(
        <PhoneInputProvider>
            <div className="relative isolate mx-auto flex h-screen w-fit">
                <img
                    className="block h-full w-auto pointer-events-none z-40"
                    src={images.flipphone}
                    alt="flipphone"
                />

                <div className="absolute left-[18%] top-[10.9%] w-[64%] h-[28%]">
                    <PhoneScreen />
                </div>

                <div className="absolute left-[15%] top-[55%] w-[70%] h-[30%] z-50">
                    <PhoneKeyboard />
                </div>
            </div>
        </PhoneInputProvider>
    );
}