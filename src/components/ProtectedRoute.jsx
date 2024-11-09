import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const ProtectedRoute = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    useUser().then((user) => {
      if (user) {
        console.log(user);
        setLoggedUser(user);
      } else {
        navigate("/login");
      }
    });
  }, [loggedUser]);

  return loggedUser && children;
};

export default ProtectedRoute;
