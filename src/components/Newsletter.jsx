import React from 'react';

const Newsletter = () => {
    return (
        <div>
            <section className="py-16 bg-[#4283f1] text-white text-center">
  <div className="max-w-xl mx-auto">
    <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
    <p className="mb-6">Get notified about new features and updates.</p>
    <form className="flex flex-col sm:flex-row items-center gap-4 justify-center">
      <input type="email" placeholder="Your email" className="px-4 py-2 rounded text-black w-full sm:w-auto" />
      <button className="bg-white text-[#4283f1] px-6 py-2 rounded font-semibold">Subscribe</button>
    </form>
  </div>
</section>

        </div>
    );
};

export default Newsletter;