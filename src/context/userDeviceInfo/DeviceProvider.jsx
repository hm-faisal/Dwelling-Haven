import PropTypes from "prop-types";
import DeviceContext from "./DeviceContext";
import { useState } from "react";

const DeviceProvider = ({ children }) => {
  const siteName = "Dwelling Haven";
  const [darkTheme, setDarkTheme] = useState(false);
  /**
   * Height of header and footer
   * header -> 70 Px
   * footer -> 220
   */
  const totalSkipHeight = 220;
  const minHeight =
    window.innerHeight > totalSkipHeight
      ? window.innerHeight - totalSkipHeight
      : "";

  const DeviceContextValue = { minHeight, siteName, darkTheme, setDarkTheme };

  return (
    <>
      <DeviceContext.Provider value={DeviceContextValue}>
        {children}
      </DeviceContext.Provider>
    </>
  );
};

DeviceProvider.propTypes = { children: PropTypes.object };

export default DeviceProvider;
