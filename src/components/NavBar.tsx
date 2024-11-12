import { BsSearch } from "react-icons/bs";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function NavBar() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="flex justify-between items-center py-3 px-5 bg-gray-100 border-b border-gray-200">
      <div className="flex justify-center items-center gap-3">
        <Avatar type="image" src="/vite.svg" alt="icon" size="md" />
        <h1 className="text-sm font-medium">{user.usuario.nombre}</h1>
      </div>

      <BsSearch size={21} className="cursor-pointer" />
    </nav>
  );
}
