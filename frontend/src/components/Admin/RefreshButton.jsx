import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { IoReload } from "react-icons/io5";

function RefreshButton() {
  const {refreshCallback } = useContext(AdminContext);
  return (
    <button className="btn btn-xs top-3" onClick={() => refreshCallback()}><IoReload /></button>
  )
}

export default RefreshButton