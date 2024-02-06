import React from 'react';
import { get, set } from '../utils/localStorage';
import { GET_PLACED, INTERVIEW_UPDATE, REJECTED, SHORTLISTED } from '../constants';

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
    let item = CompanyData.find((c) => c._id === _id);

    switch (type) {
      case SHORTLISTED:
        item = { ...item, shortlisted: res };
        break;
      case REJECTED:
        item = {
          ...item,
          rejected: res,
          shortlisted: { ...item.shortlisted, reject: true },
        };
        break;
      case INTERVIEW_UPDATE: {
        let updatedList = item.interview_round;
        updatedList.push(res);
        item = { ...item, interview_round: updatedList };
        break;
      }
      case GET_PLACED:
        item = { ...item, get_placed: res };
        break;

      default:
        return;
    }

    const updatedData = CompanyData.map((c) => (c._id === _id ? c : item));
    setCompanyData(updatedData);
  };

  const deleteData = (data) => {
    const filteredList = CompanyData.filter((item) => item._id !== data);
    if (!filteredList[0]) set([]);
    setCompanyData(filteredList);
  };

  React.useEffect(() => {
    if (CompanyData.length > 0) set(CompanyData);
  }, [CompanyData]);

  React.useEffect(() => {
    let data = get();
    if (data) setCompanyData(data);
  }, []);

  return (
    <DataContext.Provider value={{ CompanyData, addData, updateData, deleteData }}>
      {children}
    </DataContext.Provider>
  );
};
