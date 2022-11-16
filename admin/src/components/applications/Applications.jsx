import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userUrl } from "../../constants/constant";
import { useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import styled  from "styled-components";

const ApprovedBtn = styled.div`
  color: white;
  background-color:#008000b5;
  padding:5px 7px;
  border-radius:5px;
  cursor:default;
`;

const DeclinedBtn = styled.div`
  color: white;
  background-color:#ff0000ab;
  padding:5px 15px;
  border-radius:5px;
  cursor:default;
`;

const ApproveBtn = styled.div`
  color: white;
  background-color:#008000b5;
  padding:5px 7px;
  border-radius:5px;
  cursor:pointer;
  &:hover{
    background-color:green;
  }
`;

const DeclineBtn = styled.div`
  color: white;
  background-color:#ff0000ab;
  padding:5px 15px;
  border-radius:5px;
  cursor:pointer;
  &:hover{
    background-color:red;
  }
`;

// &:hover{
//   background-color:red;
// }


const Applications = () => {
    const [status, setStatus] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState([]);
  const userColumns = [ { field: "_id", headerName: "ID", width: 200 }, {
    field: "name",
    headerName: "Registered by",
    width: 150,
  }, {
    field: "company_name",
    headerName: "Company",
    width: 150,
  },
  {
    field: "incubation_type",
    headerName: "Type",
    width: 150,
  }, {
    field: "state",
    headerName: "Origin",
    width: 150,
  },
  , {
    field: "isApproved",
    headerName: "Is approved",
    width: 150,
  },]
  useEffect(() => {
     axios.get(`${userUrl}/api/admin/applications`).then((res)=>{
      console.log(res);
      console.log(res.data);
      setData(res.data)
     })
    //  setData(['Id'])
  }, [status])
  
 
 
  function handleApprove(item){
    axios.get(`${userUrl}/api/admin/approve/${item}`).then((response) => {
      // console.log(response);
        if (response.data) {
            setStatus(new Date())
        } else {
            setErrorMessage('Something went wrong')
        }
    }).catch((err) => {
        setErrorMessage(err)

    })
}
function handleDeclined(item){
  axios.get(`${userUrl}/api/admin/decline/${item}`).then((response) => {
      if (response.data) {
          console.log(response);
          setStatus(new Date())
      } else {
          setErrorMessage('Something went wrong')
      }
  }).catch((err) => {
      setErrorMessage(err)

  })
}
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        // console.log(params,"params apps");
        return (
         
          <div className="cellAction">
            
       {params.row.isDeclined ? <DeclinedBtn>
              Declined
            </DeclinedBtn>:(params.row.isApproved ?
              <ApprovedBtn >Approved</ApprovedBtn>
            :
            
            <ApproveBtn onClick={
              ()=>{
                Swal.fire({
                  title: 'Are you sure To Approve?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Approve'
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleApprove(params.id)
                    Swal.fire(
                      'Approved!',
                      'This application is Approved.',
                      'success'
                    )
                  }
                })
              }
            }>Approve</ApproveBtn>
            )
            }
               {params.row.isDeclined ? <div
              
            >
             
            </div>:(params.row.isApproved?
              <div></div>
            :
            <DeclineBtn onClick={()=>{
                Swal.fire({
                  title: 'Are you sure To Decline?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Decline'
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeclined(params.id)
                    Swal.fire(
                      'Declined!',
                      'This application is Declined.',
                      'success'
                    )
                  }
                })
              }}




            >Decline</DeclineBtn>
            )
            }
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
    Applications
        
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId ={(row) => row._id}
      />
    </div>
  );
};

export default Applications;
