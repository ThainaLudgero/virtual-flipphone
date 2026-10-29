import images from "../assets/images";
import { NavLink } from "react-router";

export default function Home() {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
  const [hour, period] = time.split(" ");

  return (
    <div
        style={{backgroundImage: `url(${images.defaultbg})`,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, cover"
        }}
      className="h-full w-full px-1 flex flex-col bg-no-repeat bg-center"
    >
      <div className="flex justify-between w-full">
        <img src={images.sinal} className="h-6" />
        <div className="flex gap-1">
          <img src={images.sino} className="h-6" />
          <img src={images.bateria} className="h-6" />
        </div>
      </div>

      <div className="flex justify-between pt-5 text-center">
         <div className="flex flex-col gap-2 [-webkit-text-stroke:1px_white] [paint-order:stroke_fill]">
            <h1>TWS chip</h1>
            
            <h1>
               {currentDate.toLocaleDateString("pt-BR")}
            </h1>
         </div>
         <div className="flex flex-col items-end [-webkit-text-stroke:1px_white] [paint-order:stroke_fill]">
            <p className="text-2xl">{hour}</p>
            <p>{period}</p>
         </div>
      </div>
      <div className="-mx-1 flex-1 pb-[0.8px] flex justify-center items-end">
         <NavLink to="/contacts" className="cursor-pointer button-animation py-1 pl-2 w-full text-left  [background:linear-gradient(to_bottom,#FDB9D5_40%,#FCA2C7_40%)_50%_50%/calc(100%_-_4px)_calc(100%_-_4px)_no-repeat,linear-gradient(#FF93BF_61%,#ffeef5_97%)]">
            Contacts
         </NavLink>
         <NavLink to="/menu" className="cursor-pointer button-animation py-1 pr-2 w-full text-right [background:linear-gradient(to_bottom,#FDB9D5_40%,#FCA2C7_40%))_50%_50%/calc(100%_-_4px)_calc(100%_-_4px)_no-repeat,linear-gradient(#FF93BF_61%,#ffeef5_97%)]">
            Menu
         </NavLink>
      </div>
    </div>
  );
}