import { BsSearch } from "react-icons/bs";
import Avatar from "./Avatar";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center py-3 px-5 bg-background">
      <div className="flex justify-center items-center gap-3">
        <Avatar type="image" src="/avatar.jpg" alt="icon" size="lg" />
        <h1 className="text-sm ">Miguel Angel Munoz</h1>
      </div>

      <BsSearch size={21} className="cursor-pointer" />
    </nav>
  );
}
