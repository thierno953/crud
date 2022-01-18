import React, { useEffect } from "react";
import "./Infos.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { DELETE_INFO_RESET } from "../redux/constants/infoConstant";
import {
  clearErrors,
  deleteInfo,
  getAdminInfo,
} from "../redux/actions/infoAction";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";

const Infos = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, infos } = useSelector((state) => state.infos);

  const { error: deleteError, isDeleted } = useSelector((state) => state.info);

  const deleteInfoHandler = (id) => {
    dispatch(deleteInfo(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Item Deleted Successfully");
   
      dispatch({ type: DELETE_INFO_RESET });
    }

    dispatch(getAdminInfo());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "username",
      headerName: "Username",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "tagline",
      headerName: "Tagline",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/info/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteInfoHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  infos &&
    infos.forEach((item) => {
      rows.push({
        id: item._id,
        username: item.username,
        email: item.email,
        occupation: item.occupation,
        tagline: item.tagline,
      });
    });

  return (
    <>
      <div className="dashboard_content">
        <div className="infoList">
          <h1>ALL INFOS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="infoTable"
            autoHeight 
          />
        </div>
      </div>
    </>
  );
};

export default Infos;
