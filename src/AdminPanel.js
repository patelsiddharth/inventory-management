import { useContext } from "react";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserContext } from "./App";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#E5FD72",
    "&:hover": {
      backgroundColor: alpha("#E5FD72", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#E5FD72",
  },
}));

export default function AdminPanel() {
  const { isUser, updateIsUser } = useContext(UserContext);

  return (
    <div className="admin-panel">
      <div>
        <span>admin</span>
        <CustomSwitch
          checked={isUser}
          onChange={updateIsUser}
          inputProps={{ "aria-label": "controlled" }}
        />{" "}
        <span>user</span>
      </div>
      <LogoutIcon />
    </div>
  );
}
