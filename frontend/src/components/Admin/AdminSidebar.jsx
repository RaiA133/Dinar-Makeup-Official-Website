import { useNavigate } from "react-router-dom";

function AdminSidebar({ children }) {
  const navigate = useNavigate();

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="admin-sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li><a className={location.pathname == '/admin/dashboard' ? 'menu-active' : ''} onClick={() => navigate('/admin/dashboard')}>Dashboard</a></li>
          <li><a className={location.pathname == '/admin/product-management' ? 'menu-active' : ''} onClick={() => navigate('/admin/product-management')}>Product Management</a></li>
          <li><a className={location.pathname == '/admin/transaction-management' ? 'menu-active' : ''} onClick={() => navigate('/admin/transaction-management')}>Transaction Management</a></li>
          <li><a className={location.pathname == '/admin/user-management' ? 'menu-active' : ''} onClick={() => navigate('/admin/user-management')}>User Management</a></li>
          <li><a className={location.pathname == '/admin/ai' ? 'menu-active' : ''} onClick={() => navigate('/admin/ai')}>AI History Management</a></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;