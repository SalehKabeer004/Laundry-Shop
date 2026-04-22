import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {supabase} from '../utils/supabase'
import { getCurrentUser } from '../authService'

import EmptyOrders from "../components/userDashboard/EmptyOrders"
import OrderTable from "../components/userDashboard/OrdersTable"
import TableSkeleton from "../components/preloader/TableSkeleton"

const UserDashboard = () => {

  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();

      if (user) {
        const { data, error } = await supabase
          .from('bookings') // Aapki table ka naam
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error) setOrders(data);
        setLoading(false)
        // console.log(data)
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    };

    checkUser()
  }, [navigate]);

  if (loading) return <TableSkeleton />

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {orders.length > 0 ? (
        <OrderTable orders={orders} />
      ) : (
        <EmptyOrders />
      )}
    </div>
  )
}

export default UserDashboard