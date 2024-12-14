import Dashboard from "./Dashboard/Dashboard";
import Quiz from "./Quiz/page";
import Searchinput from "./Searchinput/Searchinput";
import Sidenav from "./Sidenav/Sidenav";




export default function Home() {
  return (
    <>
   <div className="flex gap-24 p-5">
    <Sidenav/>

    <div className="flex flex-col gap-16 w-[1063px] h-[988px]">
    <Searchinput/>
    <Dashboard/>
   
    </div>
 
  </div>
    
    
    </>
  );
}
