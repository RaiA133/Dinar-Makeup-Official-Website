import { Toaster } from 'react-hot-toast';
import AIHistoryByUser from "./AIHistoryByUser";
import AIHistoryAll from "./AIHistoryAll";

function AIHistoryManagementPage() {

  return (
    <div className="h-screen m-3 sm:m-5">
      <div className="my-3">

        <Toaster
          toastOptions={{
            style: {
              maxWidth: '600px'
            }
          }}
        />

        <div className="tabs tabs-lift">

          {/* SEMUA DATA AI HISOTRY BERDSARAKAN USER*/}
          <input type="radio" name="my_tabs_3" className="tab" aria-label="User" defaultChecked />
          <div className="tab-content bg-base-100 border-base-300 p-6">

            <AIHistoryByUser />

          </div>

          {/* SEMUA DATA AI HISOTRY */}
          <input type="radio" name="my_tabs_3" className="tab" aria-label="Semua Data" />
          <div className="tab-content bg-base-100 border-base-300 p-6">

            <AIHistoryAll />

          </div>

        </div>



        {/* <div className="w-full text-center text-sm stat-desc mb-3">1-10 item Show of 100</div> */}
        {/* <div className="flex justify-center">
          <div className="join shadow-sm">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <input
                  key={i}
                  className="join-item btn btn-sm sm:btn-md btn-square"
                  type="radio"
                  name="options"
                  aria-label={pageNum.toString()}
                  checked={pageNum === currentPage}
                  onChange={() => navigate(`/admin/user-management?page=${pageNum}`)}
                />
              );
            })}
          </div>
        </div> */}

      </div>
    </div>
  );
}

export default AIHistoryManagementPage;