
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { getCurrentUser } from '../authService'
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../components/preloader/FullPageLoader";

const LAUNDRY_SERVICES = [
    { id: 'wash-fold', label: 'Wash & Fold', price: 10 },
    { id: 'dry-clean', label: 'Dry Cleaning', price: 25 },
    { id: 'steam-iron', label: 'Steam Iron', price: 5 },
    { id: 'curtain-wash', label: 'Curtain Cleaning', price: 50 },
];

const Booking = () => {
    const [selectedService, setSelectedService] = useState("");
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    // Jab service change ho, price bhi update ho
    useEffect(() => {
        const service = LAUNDRY_SERVICES.find(s => s.id === selectedService);
        setPrice(service ? service.price : 0);
    }, [selectedService]);

    useEffect(() => {
        const checkUser = async () => {
          const user = await getCurrentUser();
          if (user) {
            setLoading(false)
          } else {
            navigate('/login');
          }
        };
    
        checkUser()
      }, [navigate]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { error } = await supabase
                .from('bookings')
                .insert([
                    { 
                        user_id: user.id, 
                        service_type: selectedService, 
                        total_price: price,
                        status: 'pending' 
                    }
                ]);

            if (error) throw error;

            alert("Order placed successfully!");
            navigate('/dashboard'); // Order ke baad wapis dashboard
        } catch (error) {
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <FullPageLoader />;

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Book a Service</h2>
            
            <form onSubmit={handleBooking} className="space-y-6">
                {/* Service Selection */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Select Service</label>
                    <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="p-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        required
                    >
                        <option value="" disabled>Choose a service...</option>
                        {LAUNDRY_SERVICES.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Display */}
                {selectedService && (
                    <div className="p-4 bg-blue-50 rounded-xl flex justify-between items-center">
                        <span className="text-blue-700 font-medium">Estimated Total:</span>
                        <span className="text-2xl font-bold text-blue-800">${price}</span>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!selectedService || submitting}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                        submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                    }`}
                >
                    {submitting ? 'Placing Order...' : 'Confirm Booking'}
                </button>
            </form>
        </div>
    );
};

export default Booking;