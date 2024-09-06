import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor"
// import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
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
  let data = useSelector((state) => state.exceltableData.data);

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(geteTablevalue()); // Dispatch to fetch data if empty
    }
  }, [data,]);

  const data1 = data?.length ? data : [];
  const [value1, setValue1] = useState(data1);
  useEffect(() => {
    setValue1(data1)
  }, [data1])

  console.log(value1)
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
    ? value1.filter((row) =>
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
  const [edit, setEdit] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [value2, setValue2] = useState('')
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
      dataField: "Contact_No? Contact_No:null",
      text: "Contact No",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Email_ID ? Email_ID : null",
      text: "Email ID",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Experience ? Experience : null",
      text: "Total Experience",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Relevant_Experience ? Relevant_Experience : null",
      text: "Relevant Experience",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Current_Position ? urrent_Position : null",
      text: "Current Possition",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Location ? Location : null",
      text: "Location",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "CTC ? CTC : null",
      text: "CTC",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      dataField: "Expected_CTC ?Expected_CTC : null",
      text: "Expected CTC",
      style: {
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    // {
    //   dataField: "Current_Client",
    //   text: "Current Client",
    //   style: {
    //     maxWidth: "200px",
    //     whiteSpace: "nowrap",
    //     overflow: "hidden",
    //     textOverflow: "ellipsis",
    //   },
    // },
    // {
    //   dataField: "Notice_Period",
    //   text: "Notice Period",
    //   style: {
    //     maxWidth: "200px",
    //     whiteSpace: "nowrap",
    //     overflow: "hidden",
    //     textOverflow: "ellipsis",
    //   },
    // },
    // {
    //   dataField: "FeedBack",
    //   text: "FeedBack",
    //   style: {
    //     maxWidth: "200px",
    //     whiteSpace: "nowrap",
    //     overflow: "hidden",
    //     textOverflow: "ellipsis",
    //   },
    // },
    {
      dataField: 'action',
      text: "Action",
      formatter: (cell, row) => (<span><input type="button" value='Delete' style={{ color: 'white', background: '#B5152E' }} onClick={() => { axios.delete(`${HOST}/api/ultrafly/remove/${row._id}`).then(() => (dispatch({ type: GET_TABLE_VALUE }))) }} />
        {/* <input type="button" value={'Edit'} style={{ color: 'white', background: 'grey' }} onClick={() => handleEditClick(row._id)} />
      <input value={'Submit'}  type="button" style={{ color: 'white', background: '#B5152E' }} onClick={() => { axios.put(`${HOST}/api/ultrafly/post/excel_Data/${row._id}`,value2).then(()=>(dispatch({ type: GET_TABLE_VALUE }))) }}/> */}
      </span>)
    },
  ];

  //   const [editingRow, setEditingRow] = useState(null);

  // console.log('ed',editingRow)
  // console.log('',value2)
  //   const handleEditClick = (rowId) => {
  //     setEditingRow(rowId);
  //   };
  //   const columns = columns1.map((col) => ({
  //     ...col,
  //     editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
  //       const  name = column.dataField 
  //       // Enable the editor only for the editingRow
  //       if (editingRow === row._id) {
  //         return <input {...editorProps} placeholder={value} onChange={(e)=>setValue2({[name]:e.target.value})} />;
  //       }
  //       return <span>{value}</span>;
  //     }
  //   }));


  return (
    <div>
      {/* {loading && <LoadingSpinner />} Show spinner when loading */}
      <div>
        <div class="main">
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
