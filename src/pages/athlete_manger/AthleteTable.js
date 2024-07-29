
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/sidebar/Sidebar";
import ODateRangePicker from "../../components/shared/datePicker/ODateRangePicker";
import TopNavBar from "../../components/TopNavBar";
import PageSizeList from "../../components/PageSizeList";
import { RiEdit2Fill } from "react-icons/ri";
import { apiGet, apiPut } from '../../services/httpServices';
import { pathObj } from "../../services/apiPath";
import DatePicker from "./DatePicker";
import { MdDelete } from "react-icons/md";
import UpdateAthlete from "./UpdateAthlete";
import DeleteAthlete from "./DeleteAthlete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AthletePagination from "./AthletePagination";
import { LuLoader2 } from "react-icons/lu";

const AthleteTable = () => {
  const { t } = useTranslation();

  const [athleteList, setAthleteList] = useState([]);
  const [modelShow, setModelShow] = useState(false)
  const [fatchData, setFatchData] = useState(false)
  const [showDeleteModel, setShowDeleteModel] = useState(false)
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loader,setLoader]=useState(false)

  const handleClose = () => setShow(false);

  const modelview =(fatchData) => {
    setFatchData(fatchData)
    setModelShow(!modelShow)
    console.log("sgfsdh ====>>",fatchData)
  }

  const deleteModelView = (fatchData) => {
    setShowDeleteModel(!showDeleteModel)
    setFatchData(fatchData)
  }
  const handleShow =(fatchData) => {
    setShow(true)
    setFatchData(fatchData)
    // console.log("Fatch Data !! ====>>",fatchData)
  }

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/prime/getathlete")
  //     .then(function (response) {
  //       // console.log("Response ========>>>", response.data);
  //       setAthleteList(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const athleteData = async (data) => {
    setLoader(true)
    try {
      const response = await apiGet(pathObj.ATHLETE);
  
      if (response.status === 200) {
        setAthleteList(response.data);
        setRecords(response.data);
        setLoader(false)
      } else {
        setLoader(false)
        console.log('Something went wrong');
      }
  
    } catch (error) {
      setLoader(false)
      console.error(error);
    }
  };
  useEffect(() => {
    athleteData();
  }, [fatchData]);

  const updateStatus = async (id, status) => {
    const payloadData = {
      _id:id,
      status: status};
    try {
      const response = await apiPut(pathObj.UPDATE_ATHLETE_STATUS, payloadData);
      if (response.data?.status === 200) {
        athleteData()
        handleClose()
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
      athleteList.filter((player) =>
      player.firstName.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      player.lastName.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      player.email.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      player.phone.toString().includes(searchText) ||
      player.membershipType.toLowerCase().includes(searchText.toLowerCase().trim()) 
      )
    );
  };

  const FilterByDate = (searchDate) => {
    const searchDateObj = new Date(searchDate);
  
    const searchDateISO = searchDateObj.toISOString();
  
    const filteredList = athleteList.filter((coach) => {
      console.log("searchDateISO:", searchDateISO);
      console.log("coach.createdAt:", coach.createdAt);
  
      if (coach.createdAt instanceof Date) {
        const coachCreatedAtISO = coach.createdAt.toISOString();
        return coachCreatedAtISO === searchDateISO;
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
        <DatePicker onFilter={Filter} setRecords={setRecords} athleteData={athleteData} />
          <table className="w-full text-xs text-left text-[#A5A5A5] dark:text-gray-400">
            <thead className="text-xs text-gray-900 border border-[#E1E6EE] bg-[#E1E6EE] dark:bg-gray-700 dark:text-gray-400 dark:border-[#ffffff38]">
              <tr>
                <th scope="col" className="py-3 px-3">
                  {t("S.NO")}
                </th>
                <th scope="col" className="py-3 px-3">
                  {t("FIRST_NAME")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("LAST_NAME")}
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-left">{t("O_EMAIL_ID")}</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-left">{t("O_MOBILE_NUMBER")}</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-left">{t("O_HEIGHT")}</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-left">{t("O_WEIGHT")}</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-left">{t("O_MEMBERSHIP_TYPE")}</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-left">{t("O_MEMBERSHIP_DATE")}</div>
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
              :currentItems.map((athlete, index) => {
                let date = new Date(athlete["createdAt"])
                return(

                <tr key={index}>
                  <td className="border py-3 px-3">{indexOfFirstItem + index + 1}</td>
                  <td className="border py-3 px-3">{athlete.firstName}</td>
                  <td className="border py-3 px-3">{athlete.lastName}</td>
                  <td className="border py-3 px-3">{athlete.email}</td>
                  <td className="border py-3 px-3" style={{ color: 'dark' }}>{athlete.phone}</td>
                  <td className="border py-3 px-3" >{athlete.height}</td>
                  <td className="border py-3 px-3">{athlete.weight}</td>
                  <td className="border py-3 px-3">{athlete.membershipType}</td>
                  <td className="border py-3 px-3">{athlete.membershipDate}</td>
                  <td className="border py-3 px-3">{date.toLocaleDateString()}</td>
                  <td className="border py-3 px-3">
                  <label className="switch">
  <input type="checkbox" checked={athlete.status==="active" ? true : false} onClick={() =>handleShow(athlete)} />
  <span className="slider round"></span>
</label>
                  </td>
                  
                  <td className="border py-4 px-3 flex">
                  <RiEdit2Fill onClick={()=>modelview(athlete)}  className="edit-icon" />
                  <MdDelete onClick={() =>deleteModelView(athlete)} className="delete-icon"/>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
          
        </div>
        <AthletePagination totalItems={athleteList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            onItemsPerPageChange={(pageSize) => setItemsPerPage(pageSize)} />
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
          <Button variant="primary" onClick={() =>updateStatus(fatchData._id,fatchData.status==="active" ? "deactive" : "active")}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
      {modelShow && <UpdateAthlete show={modelShow} handleClose={modelview} dataView={fatchData} />}
      {showDeleteModel && <DeleteAthlete showdel={showDeleteModel} deleteModelView={deleteModelView} dataView={fatchData}/>}
    </>
  );
};

export default AthleteTable;
