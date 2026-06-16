import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import TaskCard from "../../components/tasks/TaskCard";
import CreateTaskModal from "../../components/tasks/CreateTaskModal";

import { getTasks } from "../../services/taskService";
import { getProjects } from "../../services/projectService";
import { getTeams } from "../../services/teamService";
import { getUsers } from "../../services/userService";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks || []);
    } catch (error) {
      console.log("Task Error:", error);
    }
  };

  const fetchDropdowns = async () => {
    try {
      const projectsData = await getProjects();
      const teamsData = await getTeams();
      const usersData = await getUsers();

      setProjects(projectsData);
      setTeams(teamsData);
      setUsers(usersData);
    } catch (error) {
      console.log("Dropdown Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchDropdowns();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <button
          onClick={() => {
            console.log("Create Task clicked");
            setIsModalOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Create Task
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={projects}
        teams={teams}
        users={users}
        refreshTasks={fetchTasks}
      />
    </DashboardLayout>
  );
}

export default TasksPage;