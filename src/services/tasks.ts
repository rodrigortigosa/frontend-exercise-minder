import { Task } from "../types/Task";

const baseUrl = "http://localhost:3000";

export const getTasks = async () => {
  const url = `${baseUrl}/tasks`;
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }

    return response.json();
  }  catch (error: unknown) {
    return Promise.reject(error);
  }
};

export const createTask = async (task: Omit<Task, "color" | "category">) => {
  const url = `${baseUrl}/tasks`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      throw new Error("Error al crear la nueva tarea");
    }
    return response.json();
  } catch (error: unknown) {
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