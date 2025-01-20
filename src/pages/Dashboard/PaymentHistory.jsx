import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PaymentHistory = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext); // Get logged-in user info
  const [payments, setPayments] = useState([]); // Payment history
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  //   const baseURL = "https://employee-management-server-nu.vercel.app/payments"; // Replace with your backend base URL

  // Fetch payment history
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get(
        `/payments?email=${user.email}&page=${page}`
      ); // Fetch payments for current page
      console.log(response);
      setPayments(response.data.payments); // Set payments from response
      setTotalPages(response.data.totalPages); // Set total pages
    } catch (error) {
      console.error("Error fetching payment history:", error);
      alert("Error fetching payment history.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch payments when the page or user changes
  useEffect(() => {
    if (user?.email) {
      fetchPayments();
    }
  }, [page, user]);

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Payment Table */}
          <table className="w-full border">
            <thead>
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Amount</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.month}</td>
                  <td>{payment.year}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
