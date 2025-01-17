import React from "react";

const Testimonials = () => {
  const testimonials = [
    { name: "John Doe", feedback: "This system is amazing! It has streamlined our workflow." },
    { name: "Jane Smith", feedback: "Managing employee tasks has never been easier." },
    { name: "Mark Taylor", feedback: "A must-have tool for any HR team!" },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Clients Say</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-white rounded shadow">
            <p className="italic">"{testimonial.feedback}"</p>
            <h4 className="text-lg font-semibold mt-4">{testimonial.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
