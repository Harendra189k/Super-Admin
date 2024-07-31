import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/sidebar/Sidebar";
import ODateRangePicker from "../../components/shared/datePicker/ODateRangePicker";
import TopNavBar from "../../components/TopNavBar";
import PageSizeList from "../../components/PageSizeList";
import { RiEdit2Fill } from "react-icons/ri";
import { apiGet, apiPut } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import { MdDelete } from "react-icons/md";
import DatePickerPlayer from "./DatePickerPlayer";
import UpdatePlayer from "./UpdatePlayer";
import DeletePlayer from "./DeletePlayer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PlayerPagination from "./PlayerPagination";
import { LuLoader2 } from "react-icons/lu";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PlayerTable = () => {
  const { t } = useTranslation();

  const [teamList, setTeamList] = useState([]);
  const [modelShow, setModelShow] = useState(false);
  const [fatchData, setFatchData] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loader, setLoader] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleClose = () => setShow(false);

  const modelview = (fatchData) => {
    setFatchData(fatchData);
    setModelShow(!modelShow);
    // console.log("sgfsdh ====>>",fatchData)
  };

  const deleteModelView = (fatchData) => {
    setShowDeleteModel(!showDeleteModel);
    setFatchData(fatchData);
  };

  const handleShow = (fatchData) => {
    setShow(true);
    setFatchData(fatchData);
    // console.log("Fatch Data !! ====>>",fatchData)
  };

  const playerData = async (data) => {
    try {
      // setLoader(true);
      const response = await apiGet(pathObj.GET_PLAYER);

      if (response.status === 200) {
        setTeamList(response.data);
        setRecords(response.data);
        setLoader(false);
      } else {
        console.log("Something went wrong");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };
  useEffect(() => {
    playerData();
  }, [fatchData]);

  const updateStatus = async (id, status) => {
    const payloadData = {
      _id: id,
      status: status,
    };
    try {
      const response = await apiPut(pathObj.UPDATE_PLAYER_STATUS, payloadData);
      if (response.data?.status === 200) {
        toast.success(response?.data?.message)
        playerData();
        handleClose();
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [records, setRecords] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = records.slice(indexOfFirstItem, indexOfLastItem);

  // const Filter = (event) => {
  //   const searchText = event.target.value.trim().toLowerCase();
  //   setRecords(teamList.filter(f =>
  //      f.firstName && f.firstName.toLowerCase().includes(searchText)
  //     ))
  // }

  const Filter = (searchText) => {
    if (searchText === "") {
      setRecords(currentItems);
    }
    setRecords(
      teamList.filter(
        (player) =>
          player.firstName
            .toLowerCase()
            .includes(searchText.toLowerCase().trim()) ||
          player.lastName
            .toLowerCase()
            .includes(searchText.toLowerCase().trim()) ||
          player.email
            .toLowerCase()
            .includes(searchText.toLowerCase().trim()) ||
          player.category
            .toLowerCase()
            .includes(searchText.toLowerCase().trim())
      )
    );
  };

  const FilterByDate = (searchDate) => {
    const searchDateObj = new Date(searchDate);

    const searchDateISO = searchDateObj.toISOString();

    const filteredList = teamList.filter((player) => {
      console.log("searchDateISO:", searchDateISO);
      console.log("player.createdAt:", player.createdAt);

      if (player.createdAt instanceof Date) {
        const playerCreatedAtISO = player.createdAt.toISOString();
        return playerCreatedAtISO === searchDateISO;
      }
      return false;
    });

    setRecords(filteredList);
  };

  const handleSortByDate = () => {
    const sortedList = [...records].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setRecords(sortedList);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <div className="">
        <Sidebar />
        <TopNavBar />
        <DatePickerPlayer
          onFilter={Filter}
          onFilterByDate={FilterByDate}
          setRecords={setRecords}
          playerData={playerData}
        />
        <div className="coach-table overflow-x-auto relative rounded-lg border">
          <table className="w-full text-xs text-left text-[#A5A5A5] dark:text-gray-400">
            <thead className="text-xs text-gray-900 border border-[#E1E6EE] bg-[#E1E6EE] dark:bg-gray-700 dark:text-gray-400 dark:border-[#ffffff38]">
              <tr>
                <th scope="col" className="py-3 px-3">
                  {t("S.NO")}
                </th>
                <th scope="col" className="py-3 px-3">
                  {t("PLAYER_FIRSTNAME")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("PLAYER_LASTNAME")}
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-left">{t("PLAYER_EMAIL")}</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-left">{t("PLAYER_CATEGORY")}</div>
                </th>

                <>
                  <th
                    className="py-3 px-6 cursor-pointer text-right"
                    scope="col"
                    onClick={handleSortByDate}
                  >
                    <div className="flex justify-start">
                      <span>{t("JOIN_DATE")} </span>
                      {sortOrder === "asc" ? (
                        <BsArrowDownShort />
                      ) : (
                        <BsArrowUpShort />
                      )}
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
              {loader ? (
                <LuLoader2 className="loader" />
              ) :currentItems.length > 0 ? (
                currentItems.map((player, index) => {
                  let date = new Date(player["createdAt"]);
                  return (
                    <tr key={index}>
                      <td className="border py-3 px-3">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="border py-3 px-3">{player.firstName}</td>
                      <td className="border py-3 px-3">{player.lastName}</td>
                      <td className="border py-3 px-3">{player.email}</td>
                      <td className="border py-3 px-3">{player.category}</td>
                      <td className="border py-3 px-3">
                        {date.toLocaleDateString()}
                      </td>
                      <td className="border py-3 px-3">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={player.status === "active" ? true : false}
                            onClick={() => handleShow(player)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </td>

                      <td className="border py-4 px-3 flex">
                        <RiEdit2Fill
                          onClick={() => modelview(player)}
                          className="edit-icon"
                        />
                        <MdDelete
                          onClick={() => deleteModelView(player)}
                          className="delete-icon"
                        />
                      </td>
                    </tr>
                  );
                })
              ):<tr className="py-3 px-3 w-full text-center flex no-data-found">
              <td>
              No data Found
                </td></tr>}
            </tbody>
          </table>
        </div>
        <PlayerPagination
          totalItems={teamList.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          onItemsPerPageChange={(pageSize) => setItemsPerPage(pageSize)}
        />
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
        <UpdatePlayer
          show={modelShow}
          handleClose={modelview}
          dataView={fatchData}
        />
      )}
      {showDeleteModel && (
        <DeletePlayer
          showdel={showDeleteModel}
          deleteModelView={deleteModelView}
          dataView={fatchData}
        />
      )}
    </>
  );
};

export default PlayerTable;
