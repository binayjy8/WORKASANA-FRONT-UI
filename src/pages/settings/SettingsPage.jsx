import DashboardLayout from "../../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import {
  getProjects,
  getTeams,
  getTasks,
} from "../../services/taskService";

function SettingsPage() {
  const [stats, setStats] = useState({
    projects: 0,
    teams: 0,
    tasks: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const projects = await getProjects();
      const teams = await getTeams();
      const taskData = await getTasks();

      setStats({
        projects: projects.length || 0,
        teams: teams.length || 0,
        tasks: taskData.tasks?.length || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Profile */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Profile Information
          </h2>

          <div className="space-y-4">

            <div>
              <label className="text-gray-500 text-sm">
                Name
              </label>

              <input
                value="Admin User"
                readOnly
                className="w-full border p-3 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="text-gray-500 text-sm">
                Email
              </label>

              <input
                value="admin@example.com"
                readOnly
                className="w-full border p-3 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="text-gray-500 text-sm">
                Role
              </label>

              <input
                value="Administrator"
                readOnly
                className="w-full border p-3 rounded-lg bg-gray-50"
              />
            </div>

          </div>

        </div>

        {/* System Info */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Workspace Statistics
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-2">
              <span>Total Projects</span>
              <span className="font-bold">
                {stats.projects}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Total Teams</span>
              <span className="font-bold">
                {stats.teams}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Total Tasks</span>
              <span className="font-bold">
                {stats.tasks}
              </span>
            </div>

          </div>

        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Preferences
          </h2>

          <div className="flex justify-between items-center">

            <span>Dark Mode</span>

            <span className="text-gray-500">
              Coming Soon
            </span>

          </div>

        </div>

        {/* Account */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Account
          </h2>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default SettingsPage;