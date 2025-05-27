import { createContext, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const AdminRouteContext = createContext();

// AdminRoute akan selalu berjalan di page yg dibungkus oleh route ini
function AdminRoute({
  children,
  ...rest
}) {
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useContext(UserContext);

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Your not an Admin</div>
      </div>
    );
  }

  return (
    <div>
      <AdminRouteContext.Provider value={{}}>
        {isAdmin ? (
          children
        ) : (
          // loading animation
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </AdminRouteContext.Provider>

    </div>
  );
}

export default AdminRoute