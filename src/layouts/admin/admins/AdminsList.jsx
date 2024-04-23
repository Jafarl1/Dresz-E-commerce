import { useState, Fragment } from "react";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { removeAdminRED } from "../../../redux/admin/adminsSlice";
import { removeAdmin } from "../../../services/dashboard/admins";
import { Box, Paper } from "@mui/material";
import Modal from "../../components/Modal";

function AdminsList() {
  const [localLoading, setLocalLoading] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const adminsList = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  const deleteAdmin = async (id) => {
    setLocalLoading(true);
    await removeAdmin(id);
    dispatch(removeAdminRED(id));
    setLocalLoading(false);
  };

  return localLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <PropagateLoader color="#f76f22" />
    </Box>
  ) : adminsList.length ? (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {adminsList.map((admin) => (
        <Fragment key={admin._id}>
          <Paper
            elevation={3}
            square={false}
            className="dataPaper"
            onClick={() => setSelectedAdmin(admin)}
          >
            <div
              className="paperOverlay"
              style={{ width: "auto", alignItems: "start" }}
            >
              <span>
                name:
                <span>{admin.name}</span>
              </span>
              <span>
                surname:
                <span>{admin.surname}</span>
              </span>
            </div>
          </Paper>
        </Fragment>
      ))}
      {selectedAdmin && (
        <Modal
          title="Admin"
          data={selectedAdmin}
          deleteFunction={(id) => deleteAdmin(id)}
          closeModal={() => setSelectedAdmin(null)}
        />
      )}
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <h2>You have no admins.</h2>
    </Box>
  );
}

export default AdminsList;
