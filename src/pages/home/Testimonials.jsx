import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    title: "Dream Home Found",
    rating: 5,
    text: "The team at TangibleWP was incredible! They found me the perfect home and were there at every step. Highly recommend!",
    author: "Emily Robinson",
    role: "Satisfied Homeowner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    title: "Seamless Buying Experience",
    rating: 5,
    text: "Exceptional service and attention to detail. TangibleWP made my buying experience smooth and stress-free.",
    author: "Michael Johnson",
    role: "Happy Client",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-16 my-12">
      <div className="flex-1">
        <h3 className="text-gray-500 font-semibold uppercase text-sm">
          Stories from Our Clients
        </h3>
        <h2 className="text-3xl font-bold mt-2 text-gray-900">
          Read Testimonials from Our Satisfied Clients
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl">
          Discover why our clients love working with us. Read their stories and
          experiences to understand the value and dedication we bring to every
          real estate journey. Your satisfaction is our success.
        </p>

        <div className="flex items-center mt-8">
          {/* Previous Button */}
          <button
            onClick={prevTestimonial}
            className="p-3 bg-gray-300 hover:bg-gray-400 rounded-lg mr-4"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>

          {/* Testimonial Cards */}

          {/* Next Button */}
          <button
            onClick={nextTestimonial}
            className="p-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg ml-4"
          >
            <FaChevronRight className="text-white" />
          </button>
        </div>
      </div>
      <div className="flex gap-6 overflow-hidden flex-1">
        {testimonials.map((testimonial, i) => (
          <div
            key={testimonial.id}
            className={`bg-white shadow-md p-6 rounded-lg transition-all duration-300 ${
              i === index ? "block" : "hidden"
            }`}
          >
            <h3 className="text-xl font-bold text-gray-900">
              {testimonial.title}
            </h3>
            <div className="flex gap-1 my-2">
              {Array.from({ length: testimonial.rating }).map((_, idx) => (
                <span key={idx} className="text-yellow-500">
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600">{testimonial.text}</p>
            <div className="flex items-center mt-4 border-t pt-4">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <h4 className="font-semibold text-gray-800">
                  {testimonial.author}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
              <FaQuoteRight className="ml-auto text-gray-300 text-3xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
