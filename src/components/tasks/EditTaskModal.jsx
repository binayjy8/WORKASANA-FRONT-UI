import { useEffect, useState } from "react";
import { updateTask } from "../../services/taskService";

function EditTaskModal({
  isOpen,
  onClose,
  task,
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
    tags: [],
    priority: "Medium",
    status: "To Do",
    dueDate: "",
    timeToComplete: 1,
  });

  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || "",
        project: task.project?._id || "",
        team: task.team?._id || "",
        owners: task.owners?.map((owner) => owner._id) || [],
        tags: task.tags || [],
        priority: task.priority || "Medium",
        status: task.status || "To Do",
        dueDate: task.dueDate
          ? new Date(task.dueDate)
              .toISOString()
              .split("T")[0]
          : "",
        timeToComplete: task.timeToComplete || 1,
      });

      setTagsInput(
        task.tags?.join(", ") || ""
      );
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Task Name is required");
      return;
    }

    if (!formData.project) {
      alert("Please select a project.");
      return;
    }

    if (!formData.team) {
      alert("Please select a team.");
      return;
    }

    if (formData.owners.length === 0) {
      alert("Please select an owner.");
      return;
    }

    const updatedData = {
      ...formData,
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      console.log(
        "FORM DATA SENT:",
        updatedData
      );

      await updateTask(
        task._id,
        updatedData
      );

      refreshTasks();
      onClose();
    } catch (error) {
      console.log("UPDATE ERROR:");
      console.log(
        error.response?.data || error
      );
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[500px] max-h-[80vh] overflow-y-auto rounded-xl p-5 shadow-xl">

        <h2 className="text-2xl font-bold mb-5">
          Edit Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            value={formData.name}
            placeholder="Task Name"
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
            value={formData.status}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
          >
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
            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>
          </select>

          <input
            type="number"
            min="1"
            value={formData.timeToComplete}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                timeToComplete: Number(
                  e.target.value
                ),
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
            onChange={(e) =>
              setTagsInput(e.target.value)
            }
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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Update Task
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditTaskModal;