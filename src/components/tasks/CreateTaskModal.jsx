import { useState } from "react";
import { toast } from "react-toastify";
import { createTask } from "../../services/taskService";

function CreateTaskModal({
  isOpen,
  onClose,
  projects = [],
  teams = [],
  users = [],
  refreshTasks,
}) {
  const initialState = {
    name: "",
    project: "",
    team: "",
    owners: [],
    priority: "Medium",
    status: "To Do",
    dueDate: "",
    timeToComplete: 1,
  };

  const [formData, setFormData] = useState(initialState);
  const [tagsInput, setTagsInput] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!formData.name.trim()) {
      return toast.error("Task Name is required");
    }

    if (/^\d+$/.test(formData.name.trim())) {
      return toast.error("Task Name cannot contain only numbers");
    }

    if (!formData.project) {
      return toast.error("Please select a project");
    }

    if (!formData.team) {
      return toast.error("Please select a team");
    }

    if (formData.owners.length === 0) {
      return toast.error("Please select an owner");
    }

    const taskData = {
      ...formData,
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      await createTask(taskData);

      toast.success("Task Created Successfully");

      refreshTasks();
      setFormData(initialState);
      setTagsInput("");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create task"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md md:max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-6 shadow-xl">
        
        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Task Name"
            value={formData.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <select
            value={formData.project}
            onChange={(e) =>
              handleChange("project", e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>

          <select
            value={formData.team}
            onChange={(e) =>
              handleChange("team", e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>

          <select
            value={formData.owners[0] || ""}
            onChange={(e) =>
              handleChange("owners", [e.target.value])
            }
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Owner</option>
            {users
              ?.filter(
                (user) =>
                  user?.name && user.name.trim() !== ""
              )
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name.trim()}
                </option>
              ))}
          </select>

          <select
            value={formData.priority}
            onChange={(e) =>
              handleChange("priority", e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={formData.status}
            onChange={(e) =>
              handleChange("status", e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              handleChange("dueDate", e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            min="1"
            placeholder="Time to Complete (hours)"
            value={formData.timeToComplete}
            onChange={(e) =>
              handleChange("timeToComplete", e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Tags (Urgent, Backend)"
            value={tagsInput}
            onChange={(e) =>
              setTagsInput(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
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