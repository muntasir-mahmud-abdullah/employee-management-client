import { motion } from 'framer-motion';

// 1) Update your steps data:
const steps = [
  {
    title: 'Register & Login',
    description: 'Securely sign up or log in with email/password or Google OAuth.',
    imgSrc: 'https://i.ibb.co/qRXfKCv/chat-7767694-640.jpg',
    imgAlt: 'Register and Login Illustration',
  },
  {
    title: 'Log Your Work',
    description: 'Add tasks, hours, and dates in one click—instantly updates your dashboard.',
    imgSrc: 'https://i.ibb.co/cNrGxGx/business-investment-growth-with-smartphone-white-screen-coin-background-3d-rendering-530396-68.jpg',
    imgAlt: 'Log Your Work Illustration',
  },
  {
    title: 'HR Review',
    description: 'HR can verify entries and request payroll approvals through a simple modal.',
    imgSrc: 'https://i.ibb.co/VLN5Zt2/pexels-photo-3045245.jpg',
    imgAlt: 'HR Review Illustration',
  },
  {
    title: 'Admin Insights',
    description: 'Admins fire/promote users, adjust salaries, and view dynamic analytics.',
    imgSrc: 'https://i.ibb.co/B2LFp9G/internet-8097838-640.jpg',
    imgAlt: 'Admin Insights Illustration',
  },
];

const HowItWorks = () => (
  <section className="py-20 bg-gray-50 dark:bg-gray-900">
    <div className="container mx-auto px-6 text-center">
      <motion.h2
        className="text-4xl font-bold text-gray-800 dark:text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h2>
      <motion.p
        className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        From task logging to payroll approvals, our three‑tier dashboard guides you smoothly through every step.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
{steps.map((step, i) => (
  <motion.div
    key={step.title}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
  >
    {/* Replace icon with image */}
    <img
      src={step.imgSrc}
      alt={step.imgAlt}
      className="w-36 h-24 mb-4 mx-auto"
    />

    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
      {step.title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {step.description}
    </p>
  </motion.div>
))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
