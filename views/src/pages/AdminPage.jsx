import Partner from "../components/Partner";
import TableAllUser from '../components/AdminPage/TableAllUser';

function AdminPage() {

  return (
    <div className="w-screen">
      <div className="my-10 mx-10">
        <div className="flex justify-center">
          <p className="text-3xl mb-10 font-bold  ">Administrator</p>
        </div>

        <TableAllUser />

      </div>

      <Partner />

    </div>
  );
}

export default AdminPage;
