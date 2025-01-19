import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ContactUs = () => {
  const [form, setForm] = useState({ email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await axiosPublic.post("/messages", form);
      setSuccess(true);
      setForm({ email: "", message: "" }); // Reset form
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold">Our Address</h3>
        <p>123 Company Street</p>
        <p>Cityville, State</p>
        <p>Email: info@company.com</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
          required
        />
        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="border p-2 h-32"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </form>

      {success && (
        <p className="text-green-500 mt-4">Message sent successfully!</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ContactUs;
