import {Link} from "react-router-dom"

const EmptyOrders = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
                {/* Aap yahan koi laundry icon laga sakte hain */}
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">No Bookings Yet</h2>
            <p className="text-gray-500 mt-2 mb-6 text-center max-w-sm">
                Looks like you haven't placed any laundry orders. Ready for a fresh start?
            </p>
            <Link
                to="/book-now"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
                Book Your First Wash
            </Link>
        </div>
    )
}

export default EmptyOrders