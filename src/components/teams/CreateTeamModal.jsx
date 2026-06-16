import { useState } from "react";
import { createTeam } from "../../services/taskService";

function CreateTeamModal({
  isOpen,
  onClose,
  refreshTeams,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTeam(formData);
      refreshTeams();
      onClose();

      setFormData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-2xl font-bold mb-4">
          Create Team
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Team Name"
            className="w-full border p-3 rounded"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTeamModal;