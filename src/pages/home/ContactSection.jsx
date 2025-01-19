const ContactSection = () => {
  return (
    <>
      <section className="bg-gray-900 text-white py-24 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-evenly">
          {/* Left Content */}
          <div className="w-full lg:w-1/3 space-y-6">
            <h2 className="text-3xl font-bold">Connect with Us Today</h2>
            <p className="text-gray-300">
              Reach out to our team for any inquiries or assistance you may
              need. Whether you’re looking for your dream home, need guidance on
              the buying process, or have any other questions, we’re here to
              help. Let’s make your real estate journey seamless and enjoyable.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold">100+</h3>
                <p className="text-gray-300">Happy clients</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">50+</h3>
                <p className="text-gray-300">5-star reviews</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">200+</h3>
                <p className="text-gray-300">Successful sales</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">10+</h3>
                <p className="text-gray-300">Years of experience</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/3 bg-white text-gray-800 p-6 rounded shadow-md mt-8 lg:mt-0">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="jane.doe@example.com"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Reason for Contact
                </label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                  <option>General question</option>
                  <option>Buying assistance</option>
                  <option>Selling assistance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  How can we help you?
                </label>
                <textarea
                  rows="4"
                  placeholder="Enter your message here..."
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
