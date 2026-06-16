function TaskCard({ task, onDelete, onEdit, onComplete }) {

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Delete task "${task.name}"?`
    );

    if (confirmDelete) {
      onDelete(task._id);
    }
  };

  const getRemainingDays = () => {
    if (!task.dueDate) return "No Due Date";

    const today = new Date();
    const dueDate = new Date(task.dueDate);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due Today";

    return `${diffDays} days left`;
  };

  const priorityColor =
    task.priority === "High"
      ? "text-red-600"
      : task.priority === "Medium"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5">

      <div className="flex justify-between items-center">

        <h3 className="text-lg font-semibold">
          {task.name}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-sm
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

      <div className="mt-4 space-y-2 text-sm text-gray-600">

        <p>
          <strong>Project:</strong> {task.project?.name}
        </p>

        <p>
          <strong>Team:</strong> {task.team?.name}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          <span className={priorityColor}>
            {task.priority}
          </span>
        </p>

        <p>
          <strong>Due Date:</strong>{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No Due Date"}
        </p>

        <p>
          <strong>Time Remaining:</strong>{" "}
          <span
            className={
              getRemainingDays() === "Overdue"
                ? "text-red-500 font-semibold"
                : "text-green-600 font-semibold"
            }
          >
            {getRemainingDays()}
          </span>
        </p>

        <p>
          <strong>Owners:</strong>{" "}
          {task.owners?.map(owner => owner.name).join(", ")}
        </p>

        <div>
          <strong>Tags:</strong>

          <div className="flex flex-wrap gap-2 mt-2">

            {task.tags?.length > 0 ? (
              task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-400">
                No Tags
              </span>
            )}

          </div>
        </div>

      </div>

      <div className="mt-5 flex justify-end gap-2">

        {task.status !== "Completed" && (
          <button
            onClick={() => onComplete(task)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Complete
          </button>
        )}

        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;