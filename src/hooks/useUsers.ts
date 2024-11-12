const useUsers = () => {
  const currentUser = sessionStorage.getItem("accessToken");

  return {
    currentUser,
  };
};

export default useUsers;
