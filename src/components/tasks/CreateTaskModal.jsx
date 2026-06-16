import { useState } from "react";
import { createTask } from "../../services/taskService";

function CreateTaskModal({
  isOpen,
  onClose,
  projects,
  teams,
  users,
  refreshTasks,
}) {
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    priority: "Medium",
    status: "To Do",
    dueDate: "",
    timeToComplete: 1,
    tags: [],
  });

  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Task Name is required");
      return;
    }

    if (!formData.project) {
      alert("Please select a Project");
      return;
    }

    if (!formData.team) {
      alert("Please select a Team");
      return;
    }

    if (formData.owners.length === 0) {
      alert("Please select an Owner");
      return;
    }

    const taskData = {
      ...formData,
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    console.log("FORM DATA:", taskData);

    try {
      await createTask(taskData);

      refreshTasks();

      setFormData({
        name: "",
        project: "",
        team: "",
        owners: [],
        priority: "Medium",
        status: "To Do",
        dueDate: "",
        timeToComplete: 1,
        tags: [],
      });

      setTagsInput("");

      onClose();
    } catch (error) {
      console.log("CREATE TASK ERROR:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-[500px] max-h-[80vh] overflow-y-auto shadow-xl">

        <h2 className="text-2xl font-bold mb-5">
          Create Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Task Name"
            value={formData.name}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <select
            value={formData.project}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                project: e.target.value,
              })
            }
          >
            <option value="">
              Select Project
            </option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.name}
              </option>
            ))}
          </select>

          <select
            value={formData.team}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                team: e.target.value,
              })
            }
          >
            <option value="">
              Select Team
            </option>

            {teams.map((team) => (
              <option
                key={team._id}
                value={team._id}
              >
                {team.name}
              </option>
            ))}
          </select>

          <select
            value={formData.owners[0] || ""}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                owners: [e.target.value],
              })
            }
          >
            <option value="">
              Select Owner
            </option>

            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <select
            value={formData.priority}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value,
              })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={formData.status}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>

          <input
            type="number"
            min="1"
            placeholder="Time To Complete (Hours)"
            value={formData.timeToComplete}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                timeToComplete: Number(e.target.value),
              })
            }
          />

          <input
            type="date"
            value={formData.dueDate}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                dueDate: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Tags (Ex: Urgent, Backend, API)"
            value={tagsInput}
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setTagsInput(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Create Task
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;