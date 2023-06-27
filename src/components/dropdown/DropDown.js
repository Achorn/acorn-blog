import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
const DropdownMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <FiMoreHorizontal />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {children}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
