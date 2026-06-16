import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import CreateTeamModal from "../../components/teams/CreateTeamModal";
import EditTeamModal from "../../components/teams/EditTeamModal";

import {
  getTeams,
  deleteTeam,
} from "../../services/taskService";

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [selectedTeam, setSelectedTeam] =
    useState(null);

  const fetchTeams = async () => {
    try {
      const data = await getTeams();

      if (Array.isArray(data)) {
        setTeams(data);
      } else if (data.teams) {
        setTeams(data.teams);
      } else {
        setTeams([]);
      }
    } catch (error) {
      console.log("Team Error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this team?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTeam(id);
      fetchTeams();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Teams
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and view all teams
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + Create Team
        </button>

      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">

        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />

      </div>

      <div className="mb-4 text-gray-600">
        Total Teams: {filteredTeams.length}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <div
              key={team._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >

              <h3 className="text-xl font-semibold">
                {team.name}
              </h3>

              <p className="text-gray-500 mt-2 min-h-[50px]">
                {team.description || "No description"}
              </p>

              <div className="mt-5 flex justify-end gap-2">

                <button
                  onClick={() =>
                    handleEdit(team)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(team._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-8 rounded-xl shadow text-center text-gray-500">
            No Teams Found
          </div>
        )}

      </div>

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshTeams={fetchTeams}
      />

      <EditTeamModal
        isOpen={isEditModalOpen}
        onClose={() =>
          setIsEditModalOpen(false)
        }
        team={selectedTeam}
        refreshTeams={fetchTeams}
      />

    </DashboardLayout>
  );
}

export default TeamsPage;