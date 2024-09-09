import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor"
import "bootstrap/dist/css/bootstrap.min.css";
// import "../index.css";
import "./exceltable.css";
import { GET_TABLE_VALUE, HOST, POST_TABLE_VALUE } from "../redux/constant";
import { MdOutlineCloudUpload } from "react-icons/md";
import axios from "axios";
import { editTableValue, geteTablevalue } from "../redux/action/etable.action";
export const ExcellData = () => {
  const [tableData, setTableData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [filterText, setFilterText] = useState("");
  const data = useSelector((state) => state.exceltableData.data);

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(geteTablevalue()); // Dispatch to fetch data if empty
    }
  }, []);

  const data1 = data && data?.length ? data : [];


  console.log(data1)
  const updateExcel = () => {
    if (fileInputRef.current && fileInputRef.current.files.length) {
      let formData = new FormData();
      formData.append("file", tableData);
      dispatch({ type: POST_TABLE_VALUE, payload: formData });
      window.alert('file Upload Succesfuly')
      clearFileInput();
      setFileName('');
      ;
    } else {
      setAlert(true);
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setTableData(null);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTableData(file);
      setFileName(file.name);
      setAlert(false);
    } else {
      setTableData(null);
      setFileName("");
    }
  };

  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
  };

  const filteredData = filterText
    ? data1.filter((row) =>
      Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    )
    : data1;
  const handleAfterSaveCell = (oldValue, newValue, row, column) => {
    const name = column.dataField
    const id = row._id
    const value1 = newValue
    const updatedData = { [name]: value1 }
    axios.put(`${HOST}/api/ultrafly/post/excel_Data/${id}`, updatedData).then(() =>
      window.location.reload()
    );
    // dispatch(editTableValue(id, updatedData));

  }

  const columns1 = [
    {
      formatter: (key, row, rowIndex) => rowIndex + 1,
      text: "S.No",
      sort: true,
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Name",
      text: "Name",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Contact_No",
      text: "Contact No",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Email_ID",
      text: "Email ID",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Experience",
      text: "Total Experience",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Relevant_Experience",
      text: "Relevant Experience",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Current_Position",
      text: "Current Possition",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Location",
      text: "Location",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "CTC",
      text: "CTC",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Expected_CTC",
      text: "Expected CTC",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Current_Client",
      text: "Current Client",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Notice_Period",
      text: "Notice Period",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "FeedBack",
      text: "FeedBack",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: 'action',
      text: "Action",
      formatter: (cell, row) => (<span><input type="button" value='Delete' style={{ color: 'white', background: '#B5152E' ,borderRadius:'5px'}} onClick={() => { axios.delete(`${HOST}/api/ultrafly/remove/${row._id}`).then(() => (dispatch({ type: GET_TABLE_VALUE }))) }} />
      </span>)
    },
  ];




  return (
    <div className="bgcolors">
      {/* {loading && <LoadingSpinner />} Show spinner when loading */}
      <div >
        <div className="main">
          <div>
            <label className="file-upload">
              <MdOutlineCloudUpload
                style={{ width: "75px", height: "auto" }}
                className="file-icon"
              />
              <span className="file-text text-bold">Choose a file</span>
              <input
                className="file"
                type="file"
                name="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </label>
            {fileName && <div className="file-name">Selected file: {fileName}</div>}

          </div>
          <div>

            <input
              className="uploadstyle"
              type="button"
              name="upload"
              value="Upload"
              onClick={updateExcel}
            />
          </div>
        </div>
        <div>
          <input
            className="search"
            type="text"
            placeholder="Find data..."
            value={filterText}
            onChange={handleFilterChange}
          />
        </div>
        {alert && <small className="text-danger">No File Upload</small>}
      </div>
      <BootstrapTable
        className=""
        wrapperClasses="table-responsive"
        classes="table table-vertical-center text-center tablestyle"
        bootstrap4
        keyField="id"
        data={filteredData}
        columns={columns1}
        cellEdit={cellEditFactory({
          mode: 'dbclick',
          blurToSave: true,
          afterSaveCell: handleAfterSaveCell // Trigger after save
        })}
      />
    </div>
  );
};
