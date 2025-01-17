import React from "react";

const Services = () => {
  const services = [
    { title: "Task Management", description: "Organize and manage employee tasks efficiently." },
    { title: "Payment Tracking", description: "Keep track of employee payments and transactions." },
    { title: "Role-Based Access", description: "Secure and customizable role-based dashboards." },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
