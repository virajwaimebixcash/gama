import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button, Badge, IconButton, Box } from "@mui/material";
import { KeyboardArrowDown, Delete } from "@mui/icons-material";
import { styled } from "@mui/system";
import Delete1 from "../../images/delete.png";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#110438",
    color: "#fff",
    borderRadius: "50%",
    height: 20,
    minWidth: 20,
    fontSize: "0.75rem",
    margin: '5px 0px 0px 0px',
    position: 'absolute',

  },
}));

const DropdownWithCount = ({ selectedSecurities, setSelectedSecurities }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [anchorEl, setAnchorEl] = useState(null);
  // const [menuItems, setMenuItems] = useState(["Aditya Birla Sun Life PSU Equity Fund Direct Growth", "Axis Small Cap", "Aditya Birla Sun Life PSU Equity Fund Direct Growth", "Axis Small Cap"]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (item) => {
    // setMenuItems((prevItems) => prevItems.filter((i) => i !== item));
    setSelectedSecurities((prevItems) => prevItems.filter((i) => i !== item));
  };

  const handleGo = () => {
    navigate("/fundComparison", { state: { selectedData: [...selectedSecurities] } });
  };

  return (
    <Box display="flex" alignItems="center">
      <StyledBadge badgeContent={selectedSecurities.length}>
        <Button className="compbtncss nexprebutton textLowerCase"
          variant="contained"
          color="primary"
          endIcon={<KeyboardArrowDown />}
          onClick={handleOpen}
          disabled={selectedSecurities.length === 0} // Disable when no selection
        >
          Compare
        </Button>
      </StyledBadge>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {selectedSecurities.length > 0 ? (
          selectedSecurities.map((item) => (
            <MenuItem key={item} className="nopads">
              <div> <span className="sizandfont" style={{ flexGrow: 1 }}>{item.SchemeName}</span>
                <span onClick={() => handleDelete(item)}>
                  <img src={Delete1} className="fundlistcss" />
                </span>
              </div>

              {/* <IconButton size="small" color="error" >
                <Delete />
              </IconButton> */}
            </MenuItem>

          ))
        ) : (
          <MenuItem disabled>No options available</MenuItem>
        )}
        <MenuItem className="centerindd">
          <Button variant="outlined" className='actualbtn' onClick={handleGo}>
            Go
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DropdownWithCount;






