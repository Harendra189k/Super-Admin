import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/sidebar/Sidebar";
import TopNavBar from "../../components/TopNavBar";
import { RiEdit2Fill } from "react-icons/ri";
import { apiGet, apiPut } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePickerTeam from "../team_manager/DatePickerTeam";
import UpdateTeam from "../team_manager/UpdateTeam";
import UpdateStatic from "./UpdateStatic";
import DatePickerStatic from "./DatePickerStatic";
import { LuLoader2 } from "react-icons/lu";
import dayjs from "dayjs";

const StaticTable = () => {
  const { t } = useTranslation();

  const [teamList, setTeamList] = useState([]);
  const [modelShow, setModelShow] = useState(false);
  const [fatchData, setFatchData] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loader,setLoader]=useState(false)

  const [showMore, setShowMore] = useState(false);

  const handleCloseMore = () => setShowMore(false);
  const handleShowMore = () => setShowMore(true);
  
  

  const handleClose = () => setShow(false);

  const handleShow = (fatchData) => {
    setShow(true);
    setFatchData(fatchData);
  };

  const modelview = (fatchData) => {
    setFatchData(fatchData);
    setModelShow(!modelShow);
  };

  const deleteModelView = (fatchData) => {
    setShowDeleteModel(!showDeleteModel);
    setFatchData(fatchData);
  };

//   const teamData = async (data) => {
//     try {
//       const response = await apiGet(pathObj.GET_TEAM);
//       if (response.status === 200) {
//         setTeamList(response.data);
//         setRecords(response.data);
//       } else {
//         console.log("Something went wrong");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     teamData();
//   }, [fatchData]);

  const privacyPolicyData = async (data) => {
    // setLoader(true)
    try {
      const response = await apiGet(pathObj.GET_PRIVACY_POLICY);
      if (response.status === 200) {
        setTeamList(response.data);
        setRecords(response.data);
        setLoader(false)
      } else {
        setLoader(false)
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setLoader(false)
    }
  };
  useEffect(() => {
    privacyPolicyData();
  }, [fatchData]);


  const updateStatus = async (id, status) => {
    const payloadData = {
      _id: id,
      status: status,
    };
    try {
      const response = await apiPut(pathObj.UPDATE_TEAM_STATUS, payloadData);
      if (response.data?.status === 200) {
        privacyPolicyData();
        handleClose();
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [records, setRecords] = useState([])
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = records.slice(indexOfFirstItem, indexOfLastItem);

  const Filter = (searchText) => {
    if(searchText===""){
       setRecords(currentItems)
    }
    setRecords(
      teamList.filter((staticContent) =>
        staticContent.title.toLowerCase().includes(searchText.toLowerCase().trim()) 
      )
    );
  };

  const FilterByDate = (searchDate) => {
    const searchDateObj = new Date(searchDate);
  
    const searchDateISO = searchDateObj.toISOString();
  
    const filteredList = teamList.filter((team) => {
      console.log("searchDateISO:", searchDateISO);
      console.log("team.createdAt:", team.createdAt);
  
      if (team.createdAt instanceof Date) {
        const teamCreatedAtISO = team.createdAt.toISOString();
        return teamCreatedAtISO === searchDateISO;
      }
      return false;
    });
  
    setRecords(filteredList);
  };

  return (
    <>
      <div className="">
        <Sidebar />
        <TopNavBar />
        <DatePickerStatic onFilter={Filter} setRecords={setRecords} privacyPolicyData={privacyPolicyData} />
        <div className="coach-table overflow-x-auto relative rounded-lg border">
          <table className="w-full text-xs text-left text-[#A5A5A5] dark:text-gray-400">
            <thead className="text-xs text-gray-900 border border-[#E1E6EE] bg-[#E1E6EE] dark:bg-gray-700 dark:text-gray-400 dark:border-[#ffffff38]">
              <tr>
                <th scope="col" className="py-3 px-3">
                  {t("S.NO")}
                </th>
                <th scope="col" className="py-3 px-3">
                  Title
                </th>
                <th scope="col" className="py-3 px-3">
                  Description
                </th>
                <th scope="col" className="py-3 px-6">
                  createdAt
                </th>
                <th scope="col" className="py-3 px-6 text-left">
                  {t("O_ACTION")}
                </th>
              </tr>
            </thead>
            <tbody>
              {
               loader ? <LuLoader2  className="loader" />
               : 
               currentItems.length > 0 ? currentItems.map((privacyPolicy, index) => {
                let date = new Date(privacyPolicy["createdAt"])
                return (
                <tr key={index}>
                  <td className="border py-3 px-3">{indexOfFirstItem  + index + 1}</td>
                  <td className="border py-3 px-3">{privacyPolicy.title}</td>
                  <td className="border py-3 px-3">{privacyPolicy.description.slice(0, 80)}...
                <button className="btn-view-more" onClick={handleShowMore}>View More</button>
                  <Modal show={showMore} onHide={handleCloseMore}>
        <Modal.Header 
        closeButton>
        </Modal.Header>
        <Modal.Body>{privacyPolicy.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMore}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
                  </td>
                  <td className="border py-3 px-3">{dayjs(date).format('YYYY-MM-DD')}</td>
                  <td className="border py-4 px-3 flex">
                    <RiEdit2Fill
                      onClick={() => modelview(privacyPolicy)}
                      className="edit-icon"
                    /> 
                  </td>
                </tr>
                )
              }):<tr className="py-3 px-3 w-full text-center flex no-data-found">
              <td>
              No data Found
                </td></tr>}
            </tbody>
          </table>
          </div>
        
      </div>
      <Modal show={show} onHide={handleClose} className="status-model">
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure to Update Status?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              updateStatus(
                fatchData._id,
                fatchData.status === "active" ? "deactive" : "active"
              )
            }
          >
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
      {modelShow && (
        <UpdateStatic
          show={modelShow}
          handleClose={modelview}
          dataView={fatchData}
        />
      )}
    </>
  );
};
export default StaticTable;

