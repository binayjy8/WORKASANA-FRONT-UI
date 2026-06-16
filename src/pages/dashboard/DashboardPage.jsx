import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/dashboard/StatsCard";

import {
  getTasks,
  getProjects,
  getTeams,
} from "../../services/taskService";

function DashboardPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    blocked: 0,
    projects: 0,
    teams: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const taskData = await getTasks();
      const projectData = await getProjects();
      const teamData = await getTeams();

      const taskList = taskData.tasks || [];

      setTasks(taskList);
      setProjects(projectData || []);

      setStats({
        total: taskList.length,
        completed: taskList.filter(
          (task) => task.status === "Completed"
        ).length,
        inProgress: taskList.filter(
          (task) => task.status === "In Progress"
        ).length,
        blocked: taskList.filter(
          (task) => task.status === "Blocked"
        ).length,
        projects: projectData.length || 0,
        teams: teamData.length || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks =
    filter === ""
      ? tasks
      : tasks.filter(
          (task) => task.status === filter
        );

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Track projects, tasks, teams and productivity.
          </p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">

          <button
            onClick={() => navigate("/tasks")}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            + New Task
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            View Projects
          </button>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">

        <StatsCard
          title="Total Tasks"
          value={stats.total}
        />

        <StatsCard
          title="Completed"
          value={stats.completed}
        />

        <StatsCard
          title="In Progress"
          value={stats.inProgress}
        />

        <StatsCard
          title="Blocked"
          value={stats.blocked}
        />

        <StatsCard
          title="Projects"
          value={stats.projects}
        />

        <StatsCard
          title="Teams"
          value={stats.teams}
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Projects */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold">
              Ongoing Projects
            </h2>

            <button
              onClick={() => navigate("/projects")}
              className="text-blue-600 text-sm"
            >
              View All
            </button>

          </div>

          {projects.length > 0 ? (
            <div className="space-y-3">

              {projects.slice(0, 5).map((project) => (
                <div
                  key={project._id}
                  className="border rounded-lg p-3 hover:bg-gray-50"
                >
                  <h3 className="font-semibold">
                    {project.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {project.description || "No description"}
                  </p>
                </div>
              ))}

            </div>
          ) : (
            <p className="text-gray-500">
              No Projects Found
            </p>
          )}

        </div>

        {/* Tasks */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-bold">
              Recent Tasks
            </h2>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="border p-2 rounded-lg"
            >
              <option value="">
                All Tasks
              </option>

              <option value="To Do">
                To Do
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Blocked">
                Blocked
              </option>

            </select>

          </div>

          <div className="space-y-3">

            {filteredTasks.length > 0 ? (
              filteredTasks.slice(0, 8).map((task) => (
                <div
                  key={task._id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >

                  <div className="flex justify-between items-center">

                    <h3 className="font-semibold text-lg">
                      {task.name}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : task.status === "Blocked"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>

                  </div>

                  <div className="grid md:grid-cols-3 gap-3 mt-3 text-sm text-gray-600">

                    <div>
                      <strong>Project</strong>
                      <p>
                        {task.project?.name || "N/A"}
                      </p>
                    </div>

                    <div>
                      <strong>Owner</strong>
                      <p>
                        {task.owners?.length
                          ? task.owners
                              .map(
                                (owner) =>
                                  owner.name
                              )
                              .join(", ")
                          : "No Owner"}
                      </p>
                    </div>

                    <div>
                      <strong>Due Date</strong>
                      <p>
                        {task.dueDate
                          ? new Date(
                              task.dueDate
                            ).toLocaleDateString()
                          : "No Due Date"}
                      </p>
                    </div>

                  </div>

                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                No Tasks Found
              </div>
            )}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default DashboardPage;