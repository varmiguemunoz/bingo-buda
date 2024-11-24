import Avatar from "./Avatar";
import { IoMdExit } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { resetState } from "@/redux/features/gameSlice";

export default function NavBar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const SingOut = () => {
    sessionStorage.clear();
    dispatch(resetState());
  };

  return (
    <nav className="flex justify-between items-center py-4 px-5 bg-gray-100 border-b border-gray-200">
      <a
        className="flex justify-center items-center gap-3"
        href="/home/dashboard"
      >
        <Avatar type="image" src="/vite.svg" alt="icon" size="md" />
        <h1 className="text-sm font-medium">{user.usuario.nombre}</h1>
      </a>

      <button onClick={SingOut}>
        <IoMdExit size={32} className="cursor-pointer" />
      </button>
    </nav>
  );
}
