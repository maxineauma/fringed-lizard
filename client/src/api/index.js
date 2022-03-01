import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/* LIST FUNCTIONS */
export const listUsers = async () => API.get(`/user`);
export const listClients = async () => API.get(`/client`);
export const listProjects = async () => API.get(`/project`);
export const listProjectsByUser = async (email) => API.get(`/project/${email}`);
export const listTimersByUser = async (email) => API.get(`/timer/${email}`);

/* CREATE FUNCTIONS */
export const createClient = async (formData) => API.post(`/client`, formData);
export const createTimer = async (formData) => API.post(`/timer`, formData);
export const createProject = async (formData) => API.post(`/project`, formData);

/* UPDATE FUNCTIONS */
export const deleteTimer = async (id) => API.delete(`/timer/${id}`);
export const reassignProject = async (id, formData) => API.patch(`/project/${id}`, formData);

/* USER FUNCTIONS */
export const handleLogin = async (formData) => API.post(`/user/login`, formData);
export const handleSignup = async (formData) => API.post(`/user/signup`, formData);

export const getUserName = async (id) => API.get(`/user/${id}/name`);
export const getUserEmail = async (id) => API.get(`/user/${id}/email`);
export const getUserRole = async (id) => API.get(`/user/${id}/role`);