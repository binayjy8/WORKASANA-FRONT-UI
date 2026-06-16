import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState(null);

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
      console.log("Project Error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">

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
          + Create Project
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
          className="w-full border p-3 rounded-lg"
        />

      </div>

      <div className="mb-4 text-gray-600">
        Total Projects: {filteredProjects.length}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project._id}
              onClick={() =>
                navigate(`/projects/${project._id}`)
              }
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
            >

              <h3 className="text-xl font-semibold">
                {project.name}
              </h3>

              <p className="text-gray-500 mt-2 min-h-[50px]">
                {project.description ||
                  "No description"}
              </p>

              <div className="mt-5 flex justify-end gap-2">

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(project);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(project._id);
                  }}
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