import PropTypes from "prop-types";
import { CiCircleCheck } from "react-icons/ci";

const Features = ({ features }) => {
  const feature = features?.split(",");
  return (
    <ul className="grid grid-cols-2">
      {feature?.map((item, i) => (
        <li key={i}>
          <CiCircleCheck className="inline-block bg-blue-500 rounded-full text-white" />{" "}
          {item}
        </li>
      ))}
    </ul>
  );
};

Features.propTypes = {
  features: PropTypes.string,
};

export default Features;
