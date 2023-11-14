import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const Home = () => {
  const navigate = useNavigate();
  return <div onClick={() => navigate(routes.user)}>Home</div>;
};

export default Home;
