const HowItWorks = () => {
    const steps = [
      { step: "1️⃣ Sign Up & Verify Account", desc: "Register and get verified to access your dashboard." },
      { step: "2️⃣ Add Employees & Assign Roles", desc: "HR/Admin can add and manage employees." },
      { step: "3️⃣ Manage Payroll & Track Work Progress", desc: "Admins & HRs can process salaries and oversee tasks." },
    ];
  
    return (
      <section id="how-it-works" className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {steps.map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 shadow-md rounded-md">
              <h3 className="text-xl font-semibold text-gray-700">{item.step}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  