import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    { title: "Task Management",photo:"https://i.ibb.co.com/v4ZGhpJL/freepik-the-style-is-modern-and-it-is-a-detailed-illustrat-92563.jpg", description: "Organize and manage employee tasks efficiently." },
    { title: "Payment Tracking",photo:"https://i.ibb.co.com/ksqSbJL5/freepik-the-style-is-candid-image-photography-with-natural-92564.jpg", description: "Keep track of employee payments and transactions." },
    { title: "Role-Based Access",photo:"https://i.ibb.co.com/LzGvhwTy/freepik-an-abstract-visualization-of-data-packets-flowing-92565.jpg", description: "Secure and customizable role-based dashboards." },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Our Services</h2>
      <div className="grid grid-cols-1 h-auto md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p><img className="w-2/4" src={service.photo} alt="" /></p>
            <p className="">{service.description}</p>
            <Link className="text-blue-500 ">View More..</Link>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Services;
