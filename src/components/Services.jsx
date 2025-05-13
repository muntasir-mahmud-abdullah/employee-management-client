import { FaUsers, FaChartLine, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';

const Services = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Our Services</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Empowering modern HR with smart tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Service 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
          <FaUsers className="text-indigo-600 dark:text-indigo-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Employee Management</h3>
          <p className="text-gray-600 dark:text-gray-300">Track, update, and manage your entire workforce with ease.</p>
        </div>

        {/* Service 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
          <FaChartLine className="text-indigo-600 dark:text-indigo-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Performance Analytics</h3>
          <p className="text-gray-600 dark:text-gray-300">Visual dashboards to monitor team productivity and growth.</p>
        </div>

        {/* Service 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
          <FaShieldAlt className="text-indigo-600 dark:text-indigo-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Secure Access</h3>
          <p className="text-gray-600 dark:text-gray-300">Role-based login and encrypted data protection across the app.</p>
        </div>

        {/* Service 4 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
          <FaMobileAlt className="text-indigo-600 dark:text-indigo-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Mobile Responsive</h3>
          <p className="text-gray-600 dark:text-gray-300">Manage employees on the go with a fully responsive interface.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
