import React from 'react';

const WhyUs = () => {
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 py-12">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Why Choose Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { icon: '📊', title: 'Real-Time Dashboards', desc: 'Get immediate updates and insights without refresh.' },
        { icon: '🔐', title: 'Role-Based Access', desc: 'Granular permissions for Employee, HR, and Admin.' },
        { icon: '📁', title: 'Cloud Data Security', desc: 'All data stored and protected in MongoDB Atlas.' },
      ].map((item, i) => (
        <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded shadow text-center">
          <div className="text-4xl mb-3">{item.icon}</div>
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{item.title}</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        </div>
    );
};

export default WhyUs;