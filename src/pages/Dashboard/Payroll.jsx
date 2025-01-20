import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Payroll = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchPayrollRequests = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get("/payroll");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching payroll requests:", error);
      alert("Error fetching payroll requests.");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (id, email, amount, month, year) => {
    try {
      if (!window.confirm(`Are you sure you want to pay ${amount} for ${month} ${year}?`)) {
        return;
      }

      const existingPayments = await axiosSecure.get(`/payments?email=${email}`);
      const duplicatePayment = existingPayments.data.payments.find(
        (payment) => payment.month === month && payment.year === year
      );

      if (duplicatePayment) {
        alert("Payment for this month and year already exists.");
        return;
      }

      const response = await axiosSecure.post("/payments", {
        email,
        amount,
        month,
        year,
      });

      if (response.data.payment) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id
              ? {
                  ...request,
                  isPaid: true,
                  paymentDate: response.data.payment.paymentDate,
                }
              : request
          )
        );
        alert("Payment processed successfully!");
      } else {
        alert("Payment processing failed. Please try again.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Error processing payment. Please check your connection and try again.");
      }
    }
  };

  useEffect(() => {
    fetchPayrollRequests();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-xl font-bold mb-4">Payroll</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Month</th>
            <th>Year</th>
            <th>Payment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.name}</td>
              <td>${request.amount}</td>
              <td>{request.month}</td>
              <td>{request.year}</td>
              <td>{request.paymentDate || "Pending"}</td>
              <td>
                {request.isPaid ? (
                  <span className="text-green-500 font-semibold">Paid</span>
                ) : (
                  <button
                    onClick={() => handlePay(request._id, request.email, request.amount, request.month, request.year)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payroll;
