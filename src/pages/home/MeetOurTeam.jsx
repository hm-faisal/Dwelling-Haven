const teamMembers = [
  {
    name: "Sophia Nell",
    title: "Customer Advisor",
    email: "sophia@tangibledesign.net",
    phone: "(123) 345-6789",
    image: "https://myhome1.tangiblewp.com/wp-content/uploads/2024/08/7.jpg", // Replace with the actual image URL
  },
  {
    name: "Ralph Davin",
    title: "Customer Advisor",
    email: "ralph@tangibledesign.net",
    phone: "(123) 345-6789",
    image: "https://myhome1.tangiblewp.com/wp-content/uploads/2024/08/4.jpg", // Replace with the actual image URL
  },
  {
    name: "Jacob Austin",
    title: "Customer Advisor",
    email: "jacob@tangibledesign.net",
    phone: "(123) 345-6789",
    image: "https://myhome1.tangiblewp.com/wp-content/uploads/2024/08/2.jpg", // Replace with the actual image URL
  },
  {
    name: "Sophia Doe",
    title: "Certified Home Advisor",
    email: "pmails@gmail.com",
    phone: "(123) 345-6789",
    image: "https://myhome1.tangiblewp.com/wp-content/uploads/2024/08/8.jpg", // Replace with the actual image URL
  },
];

const MeetOurTeam = () => {
  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-screen-lg mx-auto text-center">
        <h3 className="text-sm font-semibold text-gray-500">Meet Our Team</h3>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          Your Real Estate Advisors
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Meet our dedicated real estate agents, bringing unique expertise to
          your success. They&apos;ll guide you through every step of your
          property journey with personalized advice and support.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded shadow-lg text-center"
          >
            <img src={member.image} alt={member.name} className=" mb-4" />
            <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
            <p className="text-sm text-blue-500">{member.title}</p>
            <p className="text-sm text-gray-500 mt-2">{member.email}</p>
            <p className="text-sm text-gray-500">{member.phone}</p>
            <div className="flex justify-center mt-4 space-x-4 text-gray-400">
              <a href="#" className="hover:text-blue-500" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-blue-500" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-blue-500" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className="hover:text-blue-500"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurTeam;
