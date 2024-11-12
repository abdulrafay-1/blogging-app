import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const ProtectedRoute = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    useUser().then((user) => {
      if (user) {
        setLoggedUser(user);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return loggedUser && children;
};

export default ProtectedRoute;
