import React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import HeaderLinkButton from './HeaderLinkButton';
import HeaderSettingButton from './HeaderSettingButton';
import { RobotIcon, CallIcon, CallingIcon, FMSIcon } from '../constants/icons';
const Header = () => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);
    const handleSettingClick = ()=>{
        setIsOpen(true);
    }
    return (
        <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          height: `7vw`,
          margin: `${0 / 12}vh ${16 / 19.2}vw`, //`${0}px ${16}px`,
          padding: `${0 / 12}vh ${44 / 19.2}vw`, //`${0}px ${44}px`,
          background: `url(/img/mainBgImg.jpg)`,
          boxShadow: theme.shadows[3],
          "& > .headerLogo": {
            height: `${60 / 12}vh`, //  60,
          },
          "& > .linkButtonGroup": {
            display: "flex",
            gap: `${32 / 19.2}vw`, // 32,
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
          },
        }}
      >
        <img
          className="headerLogo"
          src='/img/headerLogoImg.png'
          alt="headerLogo"
          //onClick={handleSize}
        />
  
        <div className="linkButtonGroup">
          <HeaderLinkButton
            icon={<RobotIcon />}
            color="green"
            children="로봇"
            to="robot"
            //onClick={handleHeaderLinkButtonClick(1)}
          />
           {/* <HeaderLinkButton
            icon={<CallIcon />}
            color="yellow"
            children="콜스택"
            to="calls"
            //onClick={handleHeaderLinkButtonClick(0)}
          /> */}
          <HeaderLinkButton
            icon={<CallingIcon />}
            color="purple"
            children="호출벨"
            to="bell"
            //onClick={handleHeaderLinkButtonClick(2)}
          />
          <HeaderLinkButton
            icon={<FMSIcon />}
            color="blue"
            children="FMS"
            to="fms"
            //onClick={handleHeaderLinkButtonClick(3)}
          />
        </div>
  
        <HeaderSettingButton
          isOpen={isOpen}
          onClick={handleSettingClick}
        />
  
        {/* <HeaderBattery />
  
        <HeaderSettingDialog
          open={headerSettingDialogOpen}
          onClose={handleHeaderSettingDialogClose}
        /> */}
      </Box>
    )
};

export default Header;