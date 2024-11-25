import { Outlet } from "react-router-dom";

export default function GameLayout() {
  return (
    <section className="w-full max-w-[1250px] mx-auto h-full flex flex-col items-center justify-center">
      <Outlet />
    </section>
  );
}
