import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AdminContext } from "../../contexts/AdminContext";
import { Chart } from "chart.js/auto";
import { Analytics } from "@vercel/analytics/react"
import moment from "moment";
import "moment/locale/id";

// Sample mock data
const top10Orders = Array.from({ length: 10 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  total: Math.floor(Math.random() * 1000),
  date: `2025-06-${10 - i}`,
}));

const top10Products = Array.from({ length: 10 }, (_, i) => ({
  name: `Product ${i + 1}`,
  category: `Category ${i % 3 + 1}`,
  stock: Math.floor(Math.random() * 100),
  addedDate: `2025-06-${10 - i}`,
}));


function DashboardPage() {

  const { userState } = useContext(UserContext);
  const { transcactionState, productsState, usersState } = useContext(AdminContext)

  // CHART | onthly New Order
  const monthlyCounts = {};
  transcactionState?.data?.forEach(trx => {
    const month = moment(trx.transaction_information.transaction_time).format("MMM"); // contoh: "Jul"
    if (!monthlyCounts[month]) monthlyCounts[month] = 1;
    else monthlyCounts[month]++;
  });
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chart1Labels = allMonths;
  const chart1Data = allMonths.map(month => monthlyCounts[month] || 0);

  // CHART | Paid Orders
  const totalOrders = transcactionState?.data?.length;
  const paidOrders = transcactionState?.data?.filter(
    (trx) => trx.transaction_information.payment_status === "success"
  );
  const unpaidOrders = totalOrders - paidOrders?.length;
  const paidPercentage = totalOrders > 0 ? Math.round((paidOrders?.length / totalOrders) * 100) : 0;

  // DATA Stat | Paid Orders
  const paidCountPerMonth = {};
  paidOrders?.forEach((tx) => {
    const month = moment(tx.transaction_information.transaction_time).format("MMM"); // contoh: "Jul"
    if (!paidCountPerMonth[month]) paidCountPerMonth[month] = 0;
    else paidCountPerMonth[month]++;
  });
  const chart2Labels = Object.keys(paidCountPerMonth);         // ['Jul', 'Aug', ...]
  const chart2Data = Object.values(paidCountPerMonth);


  useEffect(() => {
    // Destroy any existing charts
    Chart.getChart("chart-users")?.destroy();
    Chart.getChart("chart-tasks")?.destroy();

    // Chart: Monthly New Order
    new Chart(document.getElementById("chart-users"), {
      type: "line",
      data: {
        labels: chart1Labels,
        datasets: [{
          label: "New Orders",
          data: chart1Data,
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
          tension: 0.3
        }]
      }
    });

    // Chart: Paid Orders
    new Chart(document.getElementById("chart-tasks"), {
      type: "bar",
      data: {
        labels: chart2Labels,
        datasets: [{
          label: "Paid Orders",
          data: chart2Data,
          backgroundColor: 'rgb(153, 102, 255)',
        }]
      }
    });
  }, [monthlyCounts]);

  return (
    <div className="p-5">

      <Analytics />

      {/* STAT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full mb-5">
        <div className="stat shadow">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">All time</div>
        </div>

        <div className="stat shadow">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Users</div>
          <div className="stat-value">{usersState?.data?.length}</div>
          <div className="stat-desc">All time</div>
        </div>

        <div className="stat shadow" title="User that have no Phone Number, Address & Age">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Registers</div>
          <div className="stat-value">
            {
              usersState?.data?.filter(user =>
                (!user.phone_number || user.phone_number.trim() === "") &&
                (!user.address || user.address.trim() === "") &&
                (!user.age || user.age.trim() === "")
              ).length.toLocaleString("id-ID")
            }
          </div>
          <div className="stat-desc">All time</div>
        </div>

        <div className="stat shadow">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img src={userState.avatar || import.meta.env.VITE_PROFILE_DEFAULT} />
              </div>
            </div>
          </div>
          <div className="stat-value">{paidPercentage}%</div>
          <div className="stat-title">Paid Orders</div>
          <div className="stat-desc text-secondary">{unpaidOrders} order unpaid</div>
        </div>
      </div>

      {/* CHART */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-5">
        <div className="shadow p-5">
          <div className="font-bold">Monthly New Order</div>
          <div className="divider"></div>
          <canvas id="chart-users" width="400" height="200"></canvas>
        </div>

        <div className="shadow p-5">
          <div className="font-bold">Paid Orders</div>
          <div className="divider"></div>
          <canvas id="chart-tasks" width="400" height="200"></canvas>
        </div>

        <div className="shadow p-5 overflow-x-auto">
          <div className="font-bold">New Orders (Top 10)</div>
          <div className="divider"></div>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total ($)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transcactionState?.data?.slice(0, 10).map(order => (
                <tr key={order.id}>
                  <td>{order.order_id}</td>
                  <td>{order.user_information.name}</td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: order.product_information.currency || "IDR",
                      minimumFractionDigits: 0,
                    }).format(order.down_payment.installment_amount || 0)}
                  </td>
                  <td>{moment(order.transaction_information.transaction_time).locale("id").format("LL")}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        <div className="shadow p-5 overflow-x-auto">
          <div className="font-bold">New Products (Top 10)</div>
          <div className="divider"></div>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Detail</th>
                <th>Stock</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {productsState?.data?.slice(0, 10).map((product, idx) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.detail_groups.map(group => group.name).join(", ")}</td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: product.currency || "IDR",
                      minimumFractionDigits: 0,
                    }).format(product.price || 0)}
                  </td>
                  <td>{moment().subtract(idx, "days").locale("id").format("LL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default DashboardPage;