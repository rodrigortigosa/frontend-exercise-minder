import { Task } from "../types/Task";

const baseUrl = "http://localhost:3000";

export const getTasks = async () => {
  const url = `${baseUrl}/tasks`;
  try {
    const response = await fetch(url);
    return response.json();
  }  catch (error: unknown) {
    return Promise.reject(error);
  }
};

export const updateTask = async (task : Task) => {
  const {id, title, description, category_id, completed} = task;
  const url = `${baseUrl}/tasks/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id, title, description, category_id, completed})
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }

    return response.json();
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};