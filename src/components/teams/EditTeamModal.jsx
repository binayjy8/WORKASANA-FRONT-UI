import { useEffect, useState } from "react";
import { updateTeam } from "../../services/taskService";

function EditTeamModal({
  isOpen,
  onClose,
  team,
  refreshTeams,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || "",
        description: team.description || "",
      });
    }
  }, [team]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTeam(team._id, formData);

      refreshTeams();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen || !team) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-xl w-[500px]">

        <h2 className="text-2xl font-bold mb-4">
          Edit Team
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Team
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTeamModal;