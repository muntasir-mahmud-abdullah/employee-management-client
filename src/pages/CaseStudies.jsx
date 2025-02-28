const CaseStudies = () => {
    return (
      <section id="case-studies" className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {[
            { company: "ABC Corp", result: "Reduced payroll processing time by 40%." },
            { company: "XYZ Ltd.", result: "Automated HR workflows, saving 10 hours/week." },
          ].map((story, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-md">
              <h3 className="text-xl font-semibold text-gray-700">{story.company}</h3>
              <p className="text-gray-600 mt-2">{story.result}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default CaseStudies;
  