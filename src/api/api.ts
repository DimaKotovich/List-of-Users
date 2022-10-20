const URL = `https://randomuser.me/api/?page=1&results=5`

export const getUsers = async () => {
  const response = await fetch(`${URL}`);

  return response.json();
};