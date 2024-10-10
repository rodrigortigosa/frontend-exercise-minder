const baseUrl = "http://localhost:3000";

export const getCategories = async () => {
  const url = `${baseUrl}/categories`;
  try {
    const response = await fetch(url);
    return response.json();
  }  catch (error: unknown) {
    return Promise.reject(error);
  }
};