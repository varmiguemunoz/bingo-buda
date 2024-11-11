const useUsers = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("user") || "{}");

  return {
    currentUser,
  };
};

export default useUsers;
