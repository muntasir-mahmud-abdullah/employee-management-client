import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How can I register as an employee?",
      answer: "Go to the registration page, fill in the required details, and submit your application.",
    },
    {
      question: "Can HR edit or delete employee details?",
      answer: "Yes, HR has access to manage employee details, including updating and verifying them.",
    },
    {
      question: "How does the payroll system work?",
      answer: "HR can send salary requests to the admin, who processes the payment. Employees can track their payment history.",
    },
    // {
    //   question: "What happens if I forget my password?",
    //   answer: "Use the ‘Forgot Password’ option on the login page to reset your password via email verification.",
    // },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 bg-white p-4 rounded shadow-md">
            <button
              className="text-lg font-semibold w-full text-left flex justify-between"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
