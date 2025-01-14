import { useEffect, useState } from "react";

const Tab = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const [showPrice, setShowPrice] = useState([]);

  function tabBtn(setTabValue, value) {
    const TabClassName = `px-6 py-2 text-lg text-black`;
    return (
      <button
        onClick={() => setSelectedTab(setTabValue)}
        className={`${TabClassName} ${
          selectedTab === setTabValue ? "bg-accent" : ""
        }`}
      >
        {value}
      </button>
    );
  }

  useEffect(() => {
    const price = () => {
      const allPrice = {
        all: [
          "50,000",
          "100,000",
          "200,000",
          "300,000",
          "400,000",
          "500,000",
          "750,000",
          "1,000,000",
          "2,000,000",
        ],
        "for-sale": [
          "50,000",
          "100,000",
          "200,000",
          "300,000",
          "400,000",
          "500,000",
          "750,000",
          "1,000,000",
          "2,000,000",
        ],
        "for-rent": [
          "1,000",
          "2,000",
          "3,000",
          "4,000",
          "5,000",
          "7,500",
          "10,000",
        ],
      };
      for (let key in allPrice) {
        if (key === selectedTab) {
          setShowPrice(allPrice[key]);
        }
      }
    };
    price();
  }, [selectedTab]);
  return (
    <>
      <div className="flex bg-white text-black rounded-md flex-col p-8">
        <div className="flex justify-center items-center gap-8 flex-col">
          <div className="flex justify-center items-center gap-1">
            {tabBtn("all", "All")}
            {tabBtn("for-sale", "For Sale")}
            {tabBtn("for-rent", "For Rent")}
          </div>
          <div className="panel">
            <div className="flex flex-col md:flex-row gap-4">
              <select
                name="property-type"
                className="select select-bordered max-w-md bg-white "
              >
                <option disabled>Property Type</option>
                <option value="house">House</option>
                <option value="apartments">Apartments</option>
                <option value="offices">Offices</option>
                <option value="land">Land</option>
                <option value="industrial">Industrial</option>
              </select>
              <select
                name="region"
                className="select select-bordered max-w-md bg-white"
              >
                <option>Region</option>
              </select>
              <select
                name="price"
                className="select select-bordered w-32 bg-white"
              >
                <option>Price</option>
                {showPrice.map((item, i) => (
                  <option key={i} value={item}>{`< $ ${item}`}</option>
                ))}
              </select>
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
