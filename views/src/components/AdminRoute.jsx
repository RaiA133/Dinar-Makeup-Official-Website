import { createContext, useContext, useEffect, useState } from "react";
import { getAllDataUserAdmin, getUserRoleAdmin } from "../modules/fetch";
import { DecodedTokenContext } from "./PrivateRoute";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";

export const AllUserContext = createContext();

function AdminRoute({
  children,
  ...rest
}) {
  const navigate = useNavigate();
  const { decodedTokenState } = useContext(DecodedTokenContext)
  const { isAdmin, setIsAdmin } = useContext(UserContext);
  const [allUser, setAllUser] = useState()
  const [tableRole, setTableRole] = useState(2)
  const [getRole, setGetRole] = useState([])

  useEffect(() => {
    const changeAllUserByRole = async () => {
      const response2 = await getUserRoleAdmin() // ambil semua data role user
      if (response2.status[1] === 'Success') {
        setGetRole(response2.data)
      }
      const response = await getAllDataUserAdmin(tableRole) // ambil semua data user
      if (response.status[1] === 'Success') {
        setAllUser(response.data)
        setIsAdmin(true)
      } else {
        navigate("/");
      }
    }
    changeAllUserByRole()
  }, [allUser])


  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (decodedTokenState.user_role_id !== 1) {
          navigate("/");
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
        navigate("/");
      }
    };
    checkAdminStatus();
  }, [navigate]);

  return (
    <div>
      <AllUserContext.Provider value={{
        allUser, setAllUser,
        tableRole, setTableRole,
        getRole, setGetRole,
      }}>
        {isAdmin ? (
          children
        ) : (
          // loading animation
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </AllUserContext.Provider>

    </div>
  );
}

export default AdminRoute