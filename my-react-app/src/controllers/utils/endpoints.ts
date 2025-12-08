export const API_BASE = "http://localhost:8000";

export const API_ENDPOINTS = {
  POST_PROJECT: `${API_BASE}/projects`,
  GET_PROJECT_BY_SUBJECT: (subjectId: string) =>
    `${API_BASE}/projects/?${subjectId}`,
  DELETE_PROJECT: (projectId: string) => `${API_BASE}/projects/${projectId}`,

  GET_SUBJECTS: `${API_BASE}/subjects`,
  POST_SUBJECT: `${API_BASE}/subjects`,
  DELETE_SUBJECT: (subjectId: string) => `${API_BASE}/subjects/${subjectId}`,

  GET_TASKS_BY_PROJECT: (projectId: string) =>
    `${API_BASE}/tasks/?${projectId}`,
  POST_TASK: `${API_BASE}/tasks`,
  DELETE_TASK: (taskId: string) => `${API_BASE}/tasks/${taskId}`,
};
