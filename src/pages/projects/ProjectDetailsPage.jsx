import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getTasks } from "../../services/taskService";

function ProjectDetailsPage() {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [ownerFilter, setOwnerFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();

      const projectTasks = (data.tasks || []).filter(
        (task) => task.project?._id === id
      );

      setTasks(projectTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const ownerMatch =
      !ownerFilter ||
      task.owners?.some((owner) =>
        owner.name
          ?.toLowerCase()
          .includes(ownerFilter.toLowerCase())
      );

    const tagMatch =
      !tagFilter ||
      task.tags?.some((tag) =>
        tag.toLowerCase().includes(tagFilter.toLowerCase())
      );

    const dateMatch =
      !dateFilter ||
      task.dueDate?.slice(0, 10) === dateFilter;

    return ownerMatch && tagMatch && dateMatch;
  });

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h1 className="text-3xl font-bold">
            Project Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Track project progress and manage tasks.
          </p>

        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">
            Total Tasks
          </p>

          <h3 className="text-3xl font-bold">
            {tasks.length}
          </h3>
        </div>

        <div className="bg-green-50 p-5 rounded-xl shadow">
          <p className="text-green-700">
            Completed
          </p>

          <h3 className="text-3xl font-bold">
            {
              tasks.filter(
                (t) => t.status === "Completed"
              ).length
            }
          </h3>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl shadow">
          <p className="text-blue-700">
            In Progress
          </p>

          <h3 className="text-3xl font-bold">
            {
              tasks.filter(
                (t) => t.status === "In Progress"
              ).length
            }
          </h3>
        </div>

        <div className="bg-red-50 p-5 rounded-xl shadow">
          <p className="text-red-700">
            Blocked
          </p>

          <h3 className="text-3xl font-bold">
            {
              tasks.filter(
                (t) => t.status === "Blocked"
              ).length
            }
          </h3>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <h2 className="font-semibold text-lg mb-4">
          Filters
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Filter by Owner"
            value={ownerFilter}
            onChange={(e) =>
              setOwnerFilter(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Filter by Tag"
            value={tagFilter}
            onChange={(e) =>
              setTagFilter(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

        </div>

      </div>

      {/* Tasks */}
      <div className="grid gap-5">

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5"
            >

              <div className="flex justify-between items-center">

                <h3 className="text-lg font-semibold">
                  {task.name}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : task.status === "Blocked"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>

              </div>

              <div className="mt-4 space-y-2 text-gray-600">

                <p>
                  <strong>Owner:</strong>{" "}
                  {task.owners
                    ?.map((owner) => owner.name)
                    .join(", ") || "N/A"}
                </p>

                <p>
                  <strong>Due Date:</strong>{" "}
                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

                <p>
                  <strong>Priority:</strong>{" "}
                  {task.priority}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">

                  {task.tags?.length > 0 ? (
                    task.tags.map(
                      (tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      )
                    )
                  ) : (
                    <span className="text-gray-400">
                      No Tags
                    </span>
                  )}

                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-10 text-center shadow text-gray-500">
            No Tasks Found
          </div>
        )}

      </div>

    </DashboardLayout>
  );
}

export default ProjectDetailsPage;