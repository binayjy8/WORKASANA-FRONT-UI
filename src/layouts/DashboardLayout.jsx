import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex">

        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <div className="flex-1 min-w-0 flex flex-col">

          <Navbar
            setIsOpen={setIsOpen}
          />

          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;