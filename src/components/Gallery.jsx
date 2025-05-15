const Gallery = () => {
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            Interface Preview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["/img/login.png", "/img/dashboard.png", "/img/payroll.png"].map(
              (src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`screenshot-${i}`}
                  className="rounded-lg shadow-lg hover:scale-105 transition"
                />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
