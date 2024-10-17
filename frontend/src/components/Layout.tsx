import { Outlet } from "react-router-dom";
import { useTheme, Box } from "@mui/material";
import Header from "./Header";
const Layout = () => {
    const theme = useTheme();
    return (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: `url(/img/layoutBgImg.jpg)`,
          backgroundSize: "100% 100%",
          "& > main": {
            flex: 1,
            overflow: "hidden",
            //padding: `${36 / 10.8}vh ${44 / 19.2}vw ${48 / 11.3}vh`,
            padding: "2.3vw 2.1vw 2.1vw 2.3vw"
          },
        }}
      >
        <Header />
            <main>
              <Outlet />
            </main>
      </Box>
    );
};

export default Layout;