import { useNavigate } from "react-router-dom";

function Navbar({ setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b px-4 md:px-6 py-4">

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-3 flex-1">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          <input
            type="text"
            placeholder="Search tasks, projects, teams..."
            className="w-full md:max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div className="flex items-center gap-4">

          <span className="hidden md:block font-medium">
            Welcome Back 👋
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;