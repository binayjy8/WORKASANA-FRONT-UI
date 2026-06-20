import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";
import CreateProjectModal from "../../components/projects/CreateProjectModal";
import EditProjectModal from "../../components/projects/EditProjectModal";
import {
  getProjects,
  deleteProject,
} from "../../services/taskService";

function ProjectsPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);
  const [selectedProject, setSelectedProject] =
    useState(null);

  // NEW: force re-fetch trigger
  const [refreshKey, setRefreshKey] =
    useState(0);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();

      if (Array.isArray(data)) {
        setProjects(data);
      } else if (data.projects) {
        setProjects(data.projects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      toast.error("Failed to load projects");
    }
  };

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this project?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProject(id);
    setProjects((prev) =>
      prev.filter(
        (project) => project._id !== id
      )
    );

    toast.success(
      "Project deleted successfully"
    );
  } catch (error) {
    toast.error("Failed to delete project");
  }
};

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchProjects();
  }, [refreshKey]);

  const filteredProjects = projects.filter(
    (project) =>
      project.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and view all projects
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Create Project
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="mb-4 text-gray-600">
        Total Projects: {filteredProjects.length}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={String(project._id)}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3
                onClick={() =>
                  navigate(
                    `/projects/${project._id}`
                  )
                }
                className="text-xl font-semibold cursor-pointer hover:text-blue-600"
              >
                {project.name}
              </h3>

              <p className="text-gray-500 mt-2 min-h-[60px]">
                {project.description ||
                  "No description"}
              </p>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() =>
                    handleEdit(project)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(project._id)
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
            No Projects Found
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshProjects={fetchProjects}
      />

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() =>
          setIsEditModalOpen(false)
        }
        project={selectedProject}
        refreshProjects={fetchProjects}
      />
    </DashboardLayout>
  );
}

export default ProjectsPage;