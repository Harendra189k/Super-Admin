import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/sidebar/Sidebar";
import TopNavBar from "../../components/TopNavBar";
import { RiEdit2Fill } from "react-icons/ri";
import { apiGet, apiPut } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import DatePickerTeam from "./DatePickerTeam";
import UpdateTeam from "./UpdateTeam";
import { MdDelete } from "react-icons/md";
import DeleteTeam from "./DeleteTeam";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TeamPagination from "./TeamPagination";
import { LuLoader2 } from "react-icons/lu";

const TeamTable = () => {
  const { t } = useTranslation();

  const [teamList, setTeamList] = useState([]);
  const [modelShow, setModelShow] = useState(false);
  const [fatchData, setFatchData] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loader,setLoader]=useState(false)

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

  const teamData = async (data) => {
    setLoader(true)
    try {
      const response = await apiGet(pathObj.GET_TEAM);
      if (response.status === 200) {
        setTeamList(response.data);
        setRecords(response.data);
        setLoader(false)
      } else {
        setLoader(false)
        console.log("Something went wrong");
      }
    } catch (error) {
      setLoader(false)
      console.error(error);
    }
  };
  useEffect(() => {
    teamData();
  }, [fatchData]);

  const updateStatus = async (id, status) => {
    const payloadData = {
      _id: id,
      status: status,
    };
    try {
      const response = await apiPut(pathObj.UPDATE_TEAM_STATUS, payloadData);
      if (response.data?.status === 200) {
        teamData();
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
      teamList.filter((player) =>
      player.teamName.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      player.sportType.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      player.coachName.toLowerCase().includes(searchText.toLowerCase().trim()) 
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
        <div className="coach-table overflow-x-auto relative rounded-lg border">
        <DatePickerTeam onFilter={Filter} setRecords={setRecords} teamData={teamData} />
          <table className="w-full text-xs text-left text-[#A5A5A5] dark:text-gray-400">
            <thead className="text-xs text-gray-900 border border-[#E1E6EE] bg-[#E1E6EE] dark:bg-gray-700 dark:text-gray-400 dark:border-[#ffffff38]">
              <tr>
                <th scope="col" className="py-3 px-3">
                  {t("S.NO")}
                </th>
                <th scope="col" className="py-3 px-3">
                  {t("TEAM_NAME")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("TEAM_TYPE")}
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-left">{t("TEAM_COACH")}</div>
                </th>

                <>
                  <th
                    className="py-3 px-6 cursor-pointer text-right"
                    scope="col"
                  >
                    <div className="flex justify-start">
                      <span>{t("JOIN_DATE")} </span>
                      <span></span>
                    </div>
                  </th>
                </>
                <th scope="col" className="py-3 px-6 text-left">
                  {t("O_STATUS")}
                </th>
                <th scope="col" className="py-3 px-6 text-left">
                  {t("O_ACTION")}
                </th>
              </tr>
            </thead>
            <tbody>
              {loader ? <LuLoader2  className="loader" />
              :currentItems.map((team, index) => {
                let date = new Date(team["createdAt"])
                return (
                <tr key={index}>
                  <td className="border py-3 px-3">{indexOfFirstItem  + index + 1}</td>
                  <td className="border py-3 px-3">{team.teamName}</td>
                  <td className="border py-3 px-3">{team.sportType}</td>
                  <td className="border py-3 px-3">{team.coachName}</td>
                  <td className="border py-3 px-3">{date.toLocaleDateString()}</td>
                  <td className="border py-3 px-3">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={team.status === "active" ? true : false}
                        onClick={() => handleShow(team)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>

                  <td className="border py-4 px-3 flex">
                    <RiEdit2Fill
                      onClick={() => modelview(team)}
                      className="edit-icon"
                    />
                    <MdDelete
                      onClick={() => deleteModelView(team)}
                      className="delete-icon"
                    />
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
          </div>
          <TeamPagination
            totalItems={teamList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            onItemsPerPageChange={(pageSize) => setItemsPerPage(pageSize)}
          />
        {/* <TeamPagination /> */}
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
        <UpdateTeam
          show={modelShow}
          handleClose={modelview}
          dataView={fatchData}
        />
      )}
      {showDeleteModel && (
        <DeleteTeam
          showdel={showDeleteModel}
          deleteModelView={deleteModelView}
          dataView={fatchData}
        />
      )}
    </>
  );
};
export default TeamTable;

// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import Sidebar from "../../components/sidebar/Sidebar";
// import TopNavBar from "../../components/TopNavBar";
// import { apiGet, apiPut } from '../../services/httpServices';
// import { pathObj } from "../../services/apiPath";
// import DatePickerTeam from "./DatePickerTeam";
// import UpdateTeam from "./UpdateTeam";
// import DeleteTeam from "./DeleteTeam";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import TeamPagination from "./TeamPagination";
// import { RiEdit2Fill } from "react-icons/ri";
// import { MdDelete } from "react-icons/md";

// const TeamTable = () => {
//   const { t } = useTranslation();

//   const [teamList, setTeamList] = useState([]);
//   const [modelShow, setModelShow] = useState(false);
//   const [fatchData, setFatchData] = useState(null);
//   const [showDeleteModel, setShowDeleteModel] = useState(false);
//   const [show, setShow] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   const handleClose = () => setShow(false);

//   const handleShow = (fatchData) => {
//     setShow(true);
//     setFatchData(fatchData);
//   };

//   const modelview = (fatchData) => {
//     setFatchData(fatchData);
//     setModelShow(!modelShow);
//   };

//   const deleteModelView = (fatchData) => {
//     setShowDeleteModel(!showDeleteModel);
//     setFatchData(fatchData);
//   };

//   const teamData = async () => {
//     try {
//       const response = await apiGet(pathObj.GET_TEAM);
//       if (response.status === 200) {
//         setTeamList(response.data);
//       } else {
//         console.log('Something went wrong');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     teamData();
//   }, []);

//   const updateStatus = async (id, status) => {
//     const payloadData = {
//       _id: id,
//       status: status,
//     };
//     try {
//       const response = await apiPut(pathObj.UPDATE_TEAM_STATUS, payloadData);
//       if (response.data?.status === 200) {
//         teamData();
//         handleClose();
//       } else {
//         console.log("Something went wrong");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = teamList.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <>
//       <div className="">
//         <Sidebar />
//         <TopNavBar />
//         <DatePickerTeam />
//         <div className="coach-table overflow-x-auto relative rounded-lg border">
//           <table className="w-full text-xs text-left text-[#A5A5A5] dark:text-gray-400">
//             <thead className="text-xs text-gray-900 border border-[#E1E6EE] bg-[#E1E6EE] dark:bg-gray-700 dark:text-gray-400 dark:border-[#ffffff38]">
//               <tr>
//                 <th scope="col" className="py-3 px-3">
//                   {t("S.NO")}
//                 </th>
//                 <th scope="col" className="py-3 px-3">
//                   {t("TEAM_NAME")}
//                 </th>
//                 <th scope="col" className="py-3 px-6">
//                   {t("TEAM_TYPE")}
//                 </th>
//                 <th scope="col" className="py-3 px-6">
//                   <div className="text-left">{t("TEAM_COACH")}</div>
//                 </th>
//                 <th scope="col" className="py-3 px-6 text-left">
//                   {t("JOIN_DATE")}
//                 </th>
//                 <th scope="col" className="py-3 px-6 text-left">
//                   {t("O_STATUS")}
//                 </th>
//                 <th scope="col" className="py-3 px-6 text-left">
//                   {t("O_ACTION")}
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((team, index) => (
//                 <tr key={index}>
//                   <td className="border py-3 px-3">{indexOfFirstItem + index + 1}</td>
//                   <td className="border py-3 px-3">{team.teamName}</td>
//                   <td className="border py-3 px-3">{team.sportType}</td>
//                   <td className="border py-3 px-3">{team.coachName}</td>
//                   <td className="border py-3 px-3">{team.createdAt}</td>
//                   <td className="border py-3 px-3">
//                     <label className="switch">
//                       <input
//                         type="checkbox"
//                         checked={team.status === "active"}
//                         onClick={() => handleShow(team)}
//                       />
//                       <span className="slider round"></span>
//                     </label>
//                   </td>
//                   <td className="border py-4 px-3 flex">
//                     <RiEdit2Fill
//                       onClick={() => modelview(team)}
//                       className="edit-icon"
//                     />
//                     <MdDelete
//                       onClick={() => deleteModelView(team)}
//                       className="delete-icon"
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         <TeamPagination
//           totalItems={teamList.length}
//           itemsPerPage={itemsPerPage}
//           currentPage={currentPage}
//           onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
//           onItemsPerPageChange={(pageSize) => setItemsPerPage(pageSize)}
//           />
//           </div>
//       </div>
//     </>
//   );
// };

// export default TeamTable;
