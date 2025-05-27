import { createContext, useContext, useEffect, useState } from "react";
import { getAllDataUserAdmin, getUserRoleAdmin } from "../modules/fetch";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";

export const AdminContext = createContext();

function AdminRoute({
  children,
  ...rest
}) {
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useContext(UserContext);

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
      <AdminContext.Provider value={{
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
      </AdminContext.Provider>

    </div>
  );
}

export default AdminRoute