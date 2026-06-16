import API from "../api/axios";

export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

export const getTeams = async () => {
  const response = await API.get("/teams");
  return response.data;
};

export const createTeam = async (teamData) => {
  const response = await API.post("/teams", teamData);
  return response.data;
};

export const updateTeam = async (id, teamData) => {
  const response = await API.put(`/teams/${id}`, teamData);
  return response.data;
};

export const deleteTeam = async (id) => {
  const response = await API.delete(`/teams/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};

export const getTasks = async (
  status = "",
  search = ""
) => {
  const response = await API.get("/tasks", {
    params: {
      status,
      search,
    },
  });

  return response.data;
};

export const createTask = async (taskData) => {
  const response = await API.post("/tasks", taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await API.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const markTaskComplete = async (task) => {
  const response = await API.put(`/tasks/${task._id}`, {
    ...task,
    status: "Completed",
  });

  return response.data;
};

export const createProject = async (projectData) => {
  const response = await API.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await API.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await API.delete(`/projects/${id}`);
  return response.data;
};

