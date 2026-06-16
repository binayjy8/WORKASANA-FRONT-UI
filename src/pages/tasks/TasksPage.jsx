import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import TaskCard from "../../components/tasks/TaskCard";
import CreateTaskModal from "../../components/tasks/CreateTaskModal";
import EditTaskModal from "../../components/tasks/EditTaskModal";

import {
  getTasks,
  getProjects,
  getTeams,
  getUsers,
  deleteTask,
  markTaskComplete,
} from "../../services/taskService";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(
        selectedStatus,
        searchTerm
      );

      setTasks(data.tasks || []);
    } catch (error) {
      console.log("Task Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const handleComplete = async (task) => {
    try {
      await markTaskComplete(task);
      fetchTasks();
    } catch (error) {
      console.log("Complete Error:", error);
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
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
  }, [selectedStatus, searchTerm]);

  useEffect(() => {
    fetchDropdowns();
  }, []);

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + Create Task
        </button>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border p-3 rounded-lg flex-1"
        />

        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value)
          }
          className="border p-3 rounded-lg w-full md:w-56"
        >
          <option value="">All Status</option>
          <option value="To Do">To Do</option>
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

      <div className="grid gap-4">

        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onComplete={handleComplete}
            />
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow">
            No Tasks Found
          </div>
        )}

      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={projects}
        teams={teams}
        users={users}
        refreshTasks={fetchTasks}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={selectedTask}
        projects={projects}
        teams={teams}
        users={users}
        refreshTasks={fetchTasks}
      />

    </DashboardLayout>
  );
}

export default TasksPage;