import React from 'react';
import { Box, Button } from '@mui/material';
import RobotCard from '../components/RobotCard';
const RobotAddCard = ()=>{
    return (
        <Box
          sx={{
            display: "flex",
            flex: "0 0 auto",
            justifyContent: "center",
            alignItems: "center",
            width: `calc(25% - ${30 / 19.2}vw)`,
            height: "80.5vh",
            background: "#303035",
            border: `1px solid #4B4B5A`,
            borderRadius: `${16 / 19.2}vw`,
            "& > button": {
              width: `${132 / 10.8}vh`,
              height: `${132 / 10.8}vh`,
              background: "#35353A",
              borderRadius: "50%",
              fontSize: `${80 / 19.2}vw`,
              color: "#26A69A",
              "&:hover": { background: "#35353A" },
            },
          }}
        >
          <Button>+</Button>
        </Box>
      );
}
const Main = () => {
   
    return (
      <Box sx={{
        flex: 1,
        height: "100%",
        padding: `${20 / 10.8}vh ${24 / 19.2}vw`,
        borderRadius: `${12 / 19.2}vw`,
        boxShadow: "0px 8px 18px #00000029",
        "& > .cardContainer": {
            display: "flex",
            gap: "2vw",
            overflowX: "auto",
            whiteSpace: "nowrap",
        }
      }}>
        <div className="cardContainer">
        {/* <RobotCard />
        <RobotCard /> */}
        <RobotAddCard />
        </div>
      </Box>
    );
};

export default Main;