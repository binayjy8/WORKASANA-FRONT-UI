import { useEffect, useState } from "react";
import { updateProject } from "../../services/taskService";

function EditProjectModal({
  isOpen,
  onClose,
  project,
  refreshProjects,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description:
          project.description || "",
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProject(
        project._id,
        formData
      );

      refreshProjects();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[500px] shadow-xl">

        <h2 className="text-2xl font-bold mb-4">
          Edit Project
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            value={formData.name}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <textarea
            value={formData.description}
            className="w-full border p-3 rounded-lg"
            rows="4"
            onChange={(e) =>
              setFormData({
                ...formData,
                description:
                  e.target.value,
              })
            }
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Update Project
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProjectModal;