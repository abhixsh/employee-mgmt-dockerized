import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-white shadow-md">
      <nav className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Employee Management</h1>
          <p className="text-sm text-gray-500">Manage your employees efficiently</p>
        </div>

        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600 h-10 rounded-md px-4" to="/create">
          Create Employee
        </NavLink>
      </nav>
    </div>
  );
}
