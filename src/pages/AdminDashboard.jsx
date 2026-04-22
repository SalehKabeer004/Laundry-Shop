import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Saare orders fetch karna
    const fetchAllOrders = async () => {
        const { data, error } = await supabase
            .from('bookings')
            .select('*, profiles(full_name)') // Agar aapne profiles table banayi hai to naam bhi aa jayega
            .order('created_at', { ascending: false });

        if (!error) setOrders(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    // 2. Status update karne ka function
    const updateStatus = async (orderId, newStatus) => {
        const { error } = await supabase
            .from('bookings')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) {
            alert("Update failed: " + error.message);
        } else {
            // Local state update karein taake refresh na karna pare
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading all orders...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
                <p className="text-gray-500">Manage all customer laundry orders and status.</p>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Order ID</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Service</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Update Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-mono">#{order.id.slice(0, 8)}</td>
                                <td className="px-6 py-4 text-gray-800 font-medium">{order.service_type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                        order.status === 'ready' ? 'bg-green-100 text-green-700' :
                                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <select 
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className="text-sm border rounded-lg p-1 outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="ready">Ready</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;