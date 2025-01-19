import PropTypes from "prop-types";
import { FaBed, FaBath } from "react-icons/fa";
import { BiRuler } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

const Overview = ({ Bedrooms, Bathrooms, Area, Built }) => {
  return (
    <div className="shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {Bedrooms && (
          <div className="flex flex-col items-center">
            <FaBed className="text-2xl text-gray-700" />
            <p className="mt-2 text-gray-800">{Bedrooms} Bedrooms</p>
          </div>
        )}

        {Bathrooms && (
          <div className="flex flex-col items-center">
            <FaBath className="text-2xl text-gray-700" />
            <p className="mt-2 text-gray-800">{Bathrooms} Bathrooms</p>
          </div>
        )}

        {Area && (
          <div className="flex flex-col items-center">
            <BiRuler className="text-2xl text-gray-700" />
            <p className="mt-2 text-gray-800">{Area} ft²</p>
          </div>
        )}

        {Built && (
          <div className="flex flex-col items-center">
            <AiOutlineCalendar className="text-2xl text-gray-700" />
            <p className="mt-2 text-gray-800">Year built: {Built}</p>
          </div>
        )}
      </div>
    </div>
  );
};

Overview.propTypes = {
  Bedrooms: PropTypes.string,
  Bathrooms: PropTypes.string,
  Area: PropTypes.string,
  Built: PropTypes.string,
};

export default Overview;
