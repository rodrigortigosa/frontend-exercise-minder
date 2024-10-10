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