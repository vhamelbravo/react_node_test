import React, {useEffect, useState} from "react";

const Users = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = 'https://zidio-task-management-backend.onrender.com/admin/users';

    const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch logs");
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteLog = async (logId) => {
    if (!window.confirm("Are you sure you want to delete this log?")) return;

    try {
      const res = await fetch(`${API_URL}/${logId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete log");
      setLogs((prev) => prev.filter((log) => log.id !== logId));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) return <p className="p-6">Loading logs...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
     <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Logs</h2>
      {logs.length === 0 ? (
        <p>No user logs found.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">User Name</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Login Time</th>
                <th className="border border-gray-300 px-4 py-2">Logout Time</th>
                <th className="border border-gray-300 px-4 py-2">JWT Token Name</th>
                <th className="border border-gray-300 px-4 py-2">IP Address</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{log.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.role}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(log.loginTime).toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.logoutTime ? new Date(log.logoutTime).toLocaleString() : "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 break-words max-w-xs">{log.jwtTokenName}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.ipAddress}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => deleteLog(log.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
export default Users;
