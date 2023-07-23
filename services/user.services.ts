export const getJwtUser = () => {
  return (
    process.browser &&
    JSON.parse(localStorage.getItem("currentTodoUser") || "{}")
  );
};

export const setJwtToLocal = (user: any) => {
  localStorage.setItem("currentTodoUser", JSON.stringify(user));
  return user;
};
export const logout = () => {
  localStorage.removeItem("currentTodoUser");
};
