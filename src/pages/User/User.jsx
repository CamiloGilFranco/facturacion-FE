import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const User = () => {
  const navigate = useNavigate();

  return <div onClick={() => navigate(routes.home)}>User</div>;
};

export default User;
