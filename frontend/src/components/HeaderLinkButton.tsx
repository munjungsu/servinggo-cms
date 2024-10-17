import React from 'react';
import { Link, useMatch } from "react-router-dom";
import { Button, useTheme } from "@mui/material";
interface IconProps  {
    to: string,
    color: string,
    icon: any,
    children: any
}
export const HeaderLinkButton: React.FC<IconProps> = ({ to, color, icon, children, ...props }) => {
    const theme = useTheme();
    const match = useMatch(to);
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
      <Button
        className={`${color} ${match && "active"}`}
        {...props}
        sx={{
          display: "flex",
          height: `${84 / 12}vh`, // 84,
          width: `${260 / 19.2}vw`, // 260,
          padding: `${0}vh ${32 / 19.2}vw`, // `${0}px ${32}px`,
          fontSize: `${32 / 12}vh`, //  32,
          borderRadius: `${42 / 12}vh`, // 42,
          fontWeight: 700,
          background: theme.palette.grey[900],
          color: theme.palette.grey[400],
          "&:hover": { background: theme.palette.grey[900] },
          "& > img": {
            width: `${40 / 19.2}vw`, //  40,
            height: `${40 / 12}vh`, //  40,
            filter: "brightness(70%)",
          },
          "& > span": { flex: 1, textAlign: "center" },
          "&.active": {
            color: "#fff",
            "& > img": { filter: "brightness(100%)" },
            "&.blue": { background: "#3C96D2" },
            "&.green": { background: "#5ABE6E" },
            "&.yellow": { background: "#FABE00" },
            "&.purple": { background: "#C13EFF" },
          },
        }}
      >
        {icon}
        <span>{children}</span>
      </Button>
    </Link>
    );
};

export default HeaderLinkButton;