import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getTasks } from "../../services/taskService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function ReportsPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks || []);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const blockedTasks = tasks.filter(
    (task) => task.status === "Blocked"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  const completionRate =
    totalTasks > 0
      ? ((completedTasks / totalTasks) * 100).toFixed(1)
      : 0;

  const tasksByTeam = {};
  const tasksByOwner = {};

  tasks.forEach((task) => {
    const teamName = task.team?.name || "No Team";

    tasksByTeam[teamName] =
      (tasksByTeam[teamName] || 0) + 1;

    task.owners?.forEach((owner) => {
      tasksByOwner[owner.name] =
        (tasksByOwner[owner.name] || 0) + 1;
    });
  });

  const statusData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "In Progress",
      value: inProgressTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
    {
      name: "Blocked",
      value: blockedTasks,
    },
  ];

  const teamChartData = Object.entries(tasksByTeam)
    .sort((a, b) => b[1] - a[1])
    .map(([team, count]) => ({
      team,
      count,
    }));

  const ownerChartData = Object.entries(tasksByOwner)
    .sort((a, b) => b[1] - a[1])
    .map(([owner, count]) => ({
      owner,
      count,
    }));

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#eab308",
    "#ef4444",
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Reports & Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor task performance, team productivity,
          and project progress.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-6 gap-4 mb-8">

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Total Tasks
          </h3>

          <p className="text-3xl font-bold mt-2">
            {totalTasks}
          </p>
        </div>

        <div className="bg-green-50 p-5 rounded-xl shadow">
          <h3 className="text-green-700">
            Completed
          </h3>

          <p className="text-3xl font-bold mt-2">
            {completedTasks}
          </p>
        </div>

        <div className="bg-yellow-50 p-5 rounded-xl shadow">
          <h3 className="text-yellow-700">
            Pending
          </h3>

          <p className="text-3xl font-bold mt-2">
            {pendingTasks}
          </p>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl shadow">
          <h3 className="text-blue-700">
            In Progress
          </h3>

          <p className="text-3xl font-bold mt-2">
            {inProgressTasks}
          </p>
        </div>

        <div className="bg-red-50 p-5 rounded-xl shadow">
          <h3 className="text-red-700">
            Blocked
          </h3>

          <p className="text-3xl font-bold mt-2">
            {blockedTasks}
          </p>
        </div>

        <div className="bg-indigo-50 p-5 rounded-xl shadow">
          <h3 className="text-indigo-700">
            Completion Rate
          </h3>

          <p className="text-3xl font-bold mt-2">
            {completionRate}%
          </p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Task Status Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>

              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {statusData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Tasks by Team
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={teamChartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="team" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="count"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Owner Chart */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Tasks by Owner
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={ownerChartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="owner" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </DashboardLayout>
  );
}

export default ReportsPage;