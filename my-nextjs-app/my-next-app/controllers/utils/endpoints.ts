const BASE_URL = process.env.BASE_URL;

export const API_ENDPOINTS = {
  POST_PROJECT: `${BASE_URL}/projects`,
  GET_PROJECT_BY_SUBJECT: (subjectId: string) =>
    `${BASE_URL}/projects/?${subjectId}`,
  DELETE_PROJECT: (projectId: string) => `${BASE_URL}/projects/${projectId}`,

  GET_SUBJECTS: `${BASE_URL}/subjects`,
  POST_SUBJECT: `${BASE_URL}/subjects`,
  DELETE_SUBJECT: (subjectId: string) => `${BASE_URL}/subjects/${subjectId}`,

  GET_TASKS_BY_PROJECT: (projectId: string) =>
    `${BASE_URL}/tasks/?${projectId}`,
  POST_TASK: `${BASE_URL}/tasks`,
  DELETE_TASK: (taskId: string) => `${BASE_URL}/tasks/${taskId}`,

  GET_EXAMS: `${BASE_URL}/exams`,
  POST_EXAM: `${BASE_URL}/exams`,
  DELETE_EXAM: (examId: string) => `${BASE_URL}/exams/${examId}`,
};
