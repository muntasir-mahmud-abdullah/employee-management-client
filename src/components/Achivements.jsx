import React from "react";

const Achievements = () => {
  const achievements = [
    { title: "100+", description: "Companies use our platform to manage employees." },
    { title: "5000+", description: "Employees managed seamlessly every day." },
    { title: "10 Years", description: "Of excellence in employee management." },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Our Achievements</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="p-6 bg-white rounded shadow text-center">
            <h3 className="text-4xl font-bold text-blue-500">{achievement.title}</h3>
            <p className="mt-2 text-gray-600">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
