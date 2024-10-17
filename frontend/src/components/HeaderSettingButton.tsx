import React from 'react';
import { useMatch } from "react-router-dom";
import { IconButton, useTheme } from '@mui/material';
import { CogIcon } from '../constants/icons';
interface headerDialogProps {
    isOpen: boolean,
    onClick: ()=>void;
}
const HeaderSettingButton: React.FC<headerDialogProps> = ({ isOpen, ...props }) => {
    const theme = useTheme();
    const matchUserSettings = useMatch("userSettings");
    const matchManagerSettings = useMatch("managerSettings");
    const match =
    isOpen || matchUserSettings || matchManagerSettings;
    return (
        <IconButton
        className={`${match && "active"}`}
        {...props}
        sx={{
          width: `${72 / 19.2}vw`, //  72,
          height: `${72 / 12}vh`, // 72,
          padding: `${12 / 12}vh ${12 / 19.2}vw`, // 12,
          marginLeft: "auto",
          borderRadius: "50%",
          background: theme.palette.grey[900],
          color: theme.palette.grey[400],
          "& > svg": {
            width: `${48 / 19.2}vw`, //  48,
            height: `${48 / 12}vh`, //  48,
          },
          "&:hover": { background: theme.palette.grey[900] },
          "&.active": {
            color: "#fff",
            background: "linear-gradient(180deg, #4987F8, #5668F9)",
          },
        }}
      >
        <CogIcon />
      </IconButton>
    );
};

export default HeaderSettingButton;