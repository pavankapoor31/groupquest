import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

const MuiMenu = ({ renderTitle, optionsList }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleShowMenu = (event) => {
    setOpenMenu((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };
  const handleOptionClick = (item)=>{
    setOpenMenu(false);
    setAnchorEl(null);
    item.onclick()
  }
  return (
    <div
      className="w-100"
    >
      <div
        className=""
        role="button"
        onClick={handleShowMenu}
      >
        <div className="">{renderTitle}</div>
        <Menu
          anchorEl={anchorEl}
          id="basic-menu"
          className="mt-1"
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
            setAnchorEl(null);
          }}
          onClick={(e) => e.stopPropagation()}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
            {optionsList.map(
                (item)=>{
                    return <MenuItem onClick={()=>handleOptionClick(item)} > {item.title}</MenuItem> 
                }
            )}
          {/* <MenuItem onClick={() => handleGroupClick('default')} selected={groupByValue==='default'} className='text-sm'>Latest</MenuItem>
            <MenuItem onClick={() => handleGroupClick(selectedView==='incidents'?'system':'equipment')} selected={groupByValue==='system' || groupByValue==='equipment'} className='text-sm'><span className='text-muted'>Group by: &nbsp;</span>{selectedView ==='incidents' ? 'Systems' : 'Equipment'}</MenuItem> */}
        </Menu>
      </div>
    </div>
  );
};

export default MuiMenu;
