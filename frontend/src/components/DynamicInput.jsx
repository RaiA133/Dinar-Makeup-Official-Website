import { useState } from "react";

function DynamicInput({ setGetOutputArray }) {
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [outputArray, setOutputArray] = useState([]);
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
    const updatedOutputArray = list.map((item) => item.service);
    setOutputArray(updatedOutputArray);
  };
  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
    const updatedOutputArray = list.map((item) => item.service);
    setOutputArray(updatedOutputArray);
  };
  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };
  setGetOutputArray(outputArray);
  return (
    <div className="w-full" autoComplete="off">
      <label className="label">
        <span className="label-text">Skill Needed</span>
      </label>
      <div className="form-field w-full">
        {serviceList.map((singleService, index) => (
          <div key={index} className="services flex justify-start w-full">
            <div className="me-2 mb-2 w-full">
              <input
                className="input input-bordered w-full"
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
            </div>
            <div className="me-2 mb-2">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span className="btn">Remove</span>
                </button>
              )}
            </div>
            <div className="mb-2">
              {serviceList.length - 1 === index && serviceList.length < 6 && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span className="btn">Add</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>


  );
}

export default DynamicInput;
