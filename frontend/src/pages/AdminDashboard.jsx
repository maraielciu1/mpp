import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../context/ShopContext';

const AdminDashboard = () => {
    const [monitoredUsers, setMonitoredUsers] = useState([]);
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        const fetchMonitoredUsers = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/admin/monitored-users?admin=true`);
                setMonitoredUsers(res.data);
            } catch (err) {
                console.error('Failed to fetch monitored users', err);
            }
        };

        const fetchLogs = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/admin/logs?admin=true`);
                setLogs(res.data);
            } catch (err) {
                console.error('Failed to fetch logs', err);
            }
        };

        fetchMonitoredUsers();
        fetchLogs();
    }, []);

    return (
        <div className='max-w-5xl mx-auto p-4'>
            <h2 className='text-2xl font-bold mb-4'>Monitored Users</h2>
            <table className='w-full mb-8 border-collapse border border-gray-300'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='border px-4 py-2'>User ID</th>
                        <th className='border px-4 py-2'>Username</th>
                        <th className='border px-4 py-2'>Reason</th>
                        <th className='border px-4 py-2'>Last Checked</th>
                    </tr>
                </thead>
                <tbody>
                    {monitoredUsers.map(user => (
                        <tr key={user.user_id}>
                            <td className='border px-4 py-2'>{user.user_id}</td>
                            <td className='border px-4 py-2'>{user.username}</td>
                            <td className='border px-4 py-2'>{user.reason}</td>
                            <td className='border px-4 py-2'>{new Date(user.last_checked).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className='text-2xl font-bold mb-4'>Recent Logs</h2>
            <table className='w-full border-collapse border border-gray-300'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='border px-4 py-2'>Timestamp</th>
                        <th className='border px-4 py-2'>User ID</th>
                        <th className='border px-4 py-2'>Action</th>
                        <th className='border px-4 py-2'>Product ID</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td className='border px-4 py-2'>{new Date(log.timestamp).toLocaleString()}</td>
                            <td className='border px-4 py-2'>{log.user_id}</td>
                            <td className='border px-4 py-2'>{log.action}</td>
                            <td className='border px-4 py-2'>{log.product_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
