import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: "✅",
    },
    {
      name: "Projects",
      path: "/projects",
      icon: "📁",
    },
    {
      name: "Teams",
      path: "/teams",
      icon: "👥",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "📈",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙️",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 min-h-screen bg-black text-white shadow-xl
          transform transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold">
            Workasana
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Project Management
          </p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    location.pathname === item.path
                      ? "bg-white text-black font-semibold"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <p className="text-gray-400 text-xs">
            Workasana v1.0
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;