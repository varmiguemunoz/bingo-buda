import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <NavBar />

      <section className="flex-grow flex items-center justify-center">
        <Outlet />
      </section>

      <Footer />
    </main>
  );
}
