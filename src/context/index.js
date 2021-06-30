import React from "react";

const DataContext = React.createContext(null);

export function useData() {
  return React.useContext(DataContext);
}

export const DataProvider = ({ children }) => {
  const [CompanyData, setCompanyData] = React.useState([]);

  const addData = (data) => {
    setCompanyData([...CompanyData, data]);
  };

  const updateData = (data) => {
    const { _id, type, res } = data;
    let list = CompanyData.find((item) => item._id === _id);

    switch (type) {
      case "shortlisted":
        list = { ...list, shortlisted: res };
        break;
      case "rejected":
        list = {
          ...list,
          rejected: res,
          shortlisted: { ...list.shortlisted, reject: true },
        };
        break;
      case "interviewUpdate":
        let updatedList = list.interview_round;
        updatedList.push(res);
        list = { ...list, interview_round: updatedList };
        break;
      case "getPlaced":
        list = { ...list, get_placed: res };
        break;

      default:
        return;
    }

    const updatedData = CompanyData.map((item) =>
      item._id === _id ? list : item
    );

    setCompanyData(updatedData);
  };

  const deleteData = (data) => {
    setCompanyData(CompanyData.filter((item) => item._id !== data));
  };

  React.useEffect(() => {
    if (CompanyData.length > 0) {
      window.localStorage.setItem("companydata", JSON.stringify(CompanyData));
    }
  }, [CompanyData]);

  React.useEffect(() => {
    let data = JSON.parse(window.localStorage.getItem("companydata"));
    if (data) {
      setCompanyData(data);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{ CompanyData, addData, updateData, deleteData }}
    >
      {children}
    </DataContext.Provider>
  );
};
