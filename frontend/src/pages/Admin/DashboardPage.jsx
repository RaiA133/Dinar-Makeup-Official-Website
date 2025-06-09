import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Chart } from "chart.js/auto";

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

  useEffect(() => {
    // Destroy any existing charts
    Chart.getChart("chart-users")?.destroy();
    Chart.getChart("chart-tasks")?.destroy();

    // Chart: Monthly Active Users
    new Chart(document.getElementById("chart-users"), {
      type: "line",
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: "Active Users",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
          tension: 0.3
        }]
      }
    });

    // Chart: Tasks Done
    new Chart(document.getElementById("chart-tasks"), {
      type: "bar",
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: "Tasks Done",
          data: [12, 19, 3, 5],
          backgroundColor: 'rgb(153, 102, 255)',
        }]
      }
    });
  }, []);

  return (
    <div className="p-5">

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
          <div className="stat-desc">Jan 1st - Feb 1st</div>
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
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
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
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat shadow">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img src={userState.avatar || import.meta.env.VITE_PROFILE_DEFAULT} />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>

      {/* CHART */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-5">
        <div className="shadow p-5">
          <div className="font-bold">Monthly Active Users</div>
          <div className="divider"></div>
          <canvas id="chart-users" width="400" height="200"></canvas>
        </div>

        <div className="shadow p-5">
          <div className="font-bold">Tasks Done</div>
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
              {top10Orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>{order.date}</td>
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
                <th>Category</th>
                <th>Stock</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {top10Products.map((product, idx) => (
                <tr key={idx}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.addedDate}</td>
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