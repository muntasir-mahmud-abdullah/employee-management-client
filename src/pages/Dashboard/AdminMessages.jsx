
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchMessages = async () => {
    try {
      const response = await axiosSecure.get("/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <p>Loading messages...</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id}>
              <td>{message.email}</td>
              <td>{message.message}</td>
              <td>{new Date(message.date).toLocaleString("en-BD", { timeZone: "Asia/Dhaka" })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMessages;
