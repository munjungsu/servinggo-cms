import React, { Children, ReactNode, SetStateAction } from "react";
import {
  Box,
  useTheme,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Modal,
} from "@mui/material";
import {
  CloseIcon,
  HomeIcon,
  PauseIcon,
  PlayIcon,
  DotsVerticalIcon,
} from "../constants/icons";
import type { Card } from "../types/types";

interface cardProps {
  card: Card;
  selectCall: string;
  //selectCall: string,
  handleAdd: (carId: number, call: string) => void;
  handleDelete: (carId: number, call: string) => void;
  //calls: string[],
  children?: ReactNode;
}
const RobotCard = ({
  card,
  handleAdd,
  handleDelete,
  selectCall,
  children,
}: cardProps) => {
  const theme = useTheme();
  const pauseDisabled = true;
  const [open, setOpen] = React.useState<boolean>(false);
  const [pause, setPause] = React.useState<boolean>(false);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  //const [calls, setCalls] = React.useState<string[]>([]);
  const handleMenuClick = (e: any) => {
    setMenuAnchor(e.currentTarget);
  };
  //console.log(card.calls)
  const handleAddCall = (id: number, call: string) => {
    //console.log(call.length)
    handleAdd(id, call);
  };
  React.useEffect(() => {}, [handleAdd, handleDelete]);

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleEditIpClick = () => {};
  const handleEditTablesClick = () => {};
  const handleDeleteRobotClick = () => {};
  const handleCallSetting = () => {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        display: "flex",
        flex: "0 0 auto",
        position: "relative",
        flexDirection: "column",
        width: "22vw",
        height: "100%",
        //background: "#35353A",
        // borderRadius: "1vw",
        // boxSizing: "border-box",
        // padding: "1vw",
        gap: "0.8vw",
        justifyContent: "space-between",
        "& > .Container": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "90%",
          width: "100%",
          borderRadius: "1vw",
          boxSizing: "border-box",
          padding: "1vw 1vw 0 1vw",
          background: "#35353A",
          "& > .textWrap": {
            display: "flex",
            flexDirection: "column",
            gap: "1vw",
            "& > .name": {
              fontFamily: "Pretendard",
              fontSize: "3vw",
              //padding: "1vw 0 0 1vw",
              color: "white",
              fontWeight: 700,
            },
            "& > .ip": {
              fontSize: "2vw",
              fontFamily: "Pretendard",
              color: "#888",
              fontWeight: 400,
              paddingBottom: "2vw",
            },
          },
          "& > .progressWrap": {
            boxSizing: "border-box",
            width: "100%",
            height: "3.5vw",
            background: "#242424",
            borderRadius: "3vw",
            "& > .progressBar": {
              width: "50%",
              height: "100%",
              background: "white",
              borderRadius: "3vw",
              position: "relative",
              "& > .statusText": {
                position: "absolute",
                top: "0.8vw",
                left: "50%",
                color: "#FFF",
                fontFamily: "Pretendard",
                fontWeight: 700,
                fontSize: "1.8vw",
                WebkitTextStrokeWidth: 0.8,
                WebkitTextStrokeColor: "#000",
                letterSpacing: "-0.1vw",
              },
            },
          },
          "& > .callStack": {
            boxSizing: "border-box",
            background: "#3E3E43",
            width: "100%",
            height: "52%",
            margin: "2vw 0 1vw 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1vw",
            //justifyContent: "space-between",
            "& > .item": {
              width: "100%",
              height: "22%",
              background: "white",
              borderRadius: "3vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",

              "& > .table": {
                color: "black",
                fontWeight: 700,
                fontFamily: "Pretendard",
                fontSize: "2vw",
              },
              "& > img": {
                cursor: "pointer",
                width: "1.5vw",
                height: "1.5vw",
                position: "absolute",
                right: "1.3vw",
                zIndex: 3,
              },
            },
          },
          "& > .buttonWrap": {
            display: "flex",
            width: "100%",
            height: "10%",
            //padding: `0px ${8 / 19.2}vw`,
            gap: `${20 / 19.2}vw`,
            margin: `${24 / 13.8}vh 0`,
            "& > button": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              height: `${60 / 9.2}vh`,
              padding: `${18 / 10.8}vh ${20 / 19.2}vw`,
              borderRadius: `${12 / 19.2}vw`,
              fontSize: `${20 / 17.2}vw`,
              fontWeight: 700,
              fontFamily: "Pretendard",
              "& > svg": {
                width: `${24 / 16.2}vw`,
                height: `${24 / 16.2}vw`,
                marginTop: `${2 / 10.8}vh`,
              },
              "&.returnButton": {
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                // background: "linear-gradient(#FABE00, #f7c215)",
                // "&:disabled": {
                //   color: "#808083",
                //   background: "linear-gradient(#80344A, #7E393F)",
                // },
                border: "0.01vw solid #fff",
              },
              "&.pauseButton": {
                color: "white",
                // background: "linear-gradient(#4987F8, #5668F9)",
                // "&:disabled": {
                //   color: "#808083",
                //   background: "linear-gradient(#375081, #3C4481)",
                // },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                border: "0.01vw solid #fff",
              },
              "&.restartButton": {
                color: "#5668F9",
                background: "linear-gradient(#FFFFFF, #E0E0E0)",
              },
            },
          },
        },
        "& > .showMore": {
          position: "absolute",
          top: `0.5vw`,
          right: `0.2vw`,
          color: "white",
          "& > svg": {
            width: `${36 / 19.2}vw`,
            height: `${36 / 19.2}vw`,
          },
        },
        "& > .menu": {
          "& > .menuPaper": {
            marginTop: `${8 / 10.8}vh`,
            marginLeft: `${-8 / 19.2}vw`,
            borderRadius: `${8 / 19.2}vw`,
            border: `1px solid ${"#616161"}`,
            background: "#444449",
            boxShadow: "0px 0px 20px #00000033",
            color: "white",
            "& > .menuList": {
              padding: 0,
              "& > li": {
                display: "flex",
                alignItems: "center",
                padding: `${20 / 20}vh ${32 / 19.2}vw`,
                "& > p": {
                  fontSize: `${28 / 19.2}vw`,
                  marginLeft: "auto",
                },
              },
              "& > hr": {
                borderColor: "#616161",
              },
            },
          },
        },
        "& > .addCallButtonWrap": {
          height: "10%",
          width: "100%",
          border: "none",
          "& > .addCallButton": {
            width: "100%",
            height: "100%",
            background: "#09F",
            color: "white",
            borderRadius: "0.8vw",
            fontFamily: "Pretendard",
            fontWeight: 700,
            fontSize: "1.8vw",
            textTransform: "none",
          },
          "& > .addCallButtonLock": {
            width: "100%",
            height: "100%",
            background: "#35353A",
            color: "white",
            borderRadius: "0.8vw",
            fontFamily: "Pretendard",
            fontWeight: 700,
            fontSize: "1.8vw",
            textTransform: "none",
          },
        },
      }}
    >
      <IconButton className="showMore" onClick={handleMenuClick}>
        <DotsVerticalIcon />
      </IconButton>
      <Menu
        className="menu"
        disablePortal
        anchorEl={menuAnchor}
        PaperProps={{ className: "menuPaper" }}
        MenuListProps={{ className: "menuList" }}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEditIpClick}>
          <Typography>로봇 IP 수정</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleEditTablesClick}>
          <Typography>담당 목적지 수정</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpen(true)}>
          <Typography>우선 목적지 설정</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleEditTablesClick}>
          <Typography>로봇 이름 수정</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteRobotClick}>
          <Typography>로봇 삭제</Typography>
        </MenuItem>
      </Menu>
      <div className="Container">
        <div className="textWrap">
          <span className="name">{card.name}</span>
          <span className="ip">192.168.60.102</span>
        </div>
        <div className="progressWrap">
          <div className="progressBar">
            <span className="statusText">208 이동 중...</span>
          </div>
        </div>
        <div className="callStack">
          {/* <div className="item">
          <span className="table">12</span>
        </div>
        <div className="item">
          <span className="table">12</span>
        </div>
        <div className="item">
          <span className="table">12</span>
        </div>
        <div className="item">
          <span className="table">12</span>
        </div> */}
          {card.calls &&
            card.calls.map((v, i) => (
              <div className="item" key={i}>
                <span className="table">{v}</span>
                <img
                  src="/img/cancel.svg"
                  onClick={() => handleDelete(card.id, v)}
                />
              </div>
            ))}
        </div>
        <div className="buttonWrap">
          <Button
            className="returnButton"
            //disabled={returnDisabled}
            //onClick={handleReturnClick}
          >
            <HomeIcon />
            홈으로 복귀
          </Button>
          <Button
            className={pause ? "restartButton" : "pauseButton"}
            //disabled={pauseDisabled}
            //onClick={pause ? handleRestartClick : handlePauseClick}
          >
            {pause ? <PlayIcon /> : <PauseIcon />}
            {pause ? "다시 시작" : "일시 정지"}
          </Button>
        </div>
      </div>
      <div className="addCallButtonWrap">
        <Button
          className={
            card.calls && card.calls?.length > 3
              ? "addCallButtonLock"
              : "addCallButton"
          }
          onClick={() => handleAddCall(card.id, selectCall)}
        >
          {`${card.name}에게 콜 주기`}
        </Button>
      </div>
      {children}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-ip"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "93%",
            height: "88%",
            background: "#35353A",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            "& > .modal_TopWrap": {
              width: "100%",
              height: "10%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              "& > .textWrap": {
                display: "flex",
                flexDirection: "column",
                "& > .modal-title": {
                  fontFamily: "Pretendard",
                  fontSize: "3vw",
                  color: "white",
                  fontWeight: 700,
                },
                "& > .modal-ip": {
                  fontSize: "1.5vw",
                  fontFamily: "Pretendard",
                  color: "#888",
                  fontWeight: 400,
                  //paddingBottom: "2vw",
                },
              },
              "& > .buttonWrap": {
                display: "flex",
                gap: "1vw",
                "& > .saveButton" : {
                  fontFamily: "Pretendard",
                  fontSize: "1.5vw",
                  fontWeight: 700,
                  color: "white",
                  background: "#3C96D2",
                  width: "10vw",
                  height: "3vw",
                  borderRadius: "0.5vw"
                },
                "& > .cancelButton" : {
                  fontFamily: "Pretendard",
                  background: "#FF2C63",
                  fontSize: "1.5vw",
                  fontWeight: 700,
                  color: "white",
                  width: "3vw",
                  height: "3vw",
                  borderRadius: "0.5vw"
                },
              },
            },
            "& > .modal_ContentWrap": {
              width: "100%",
              height: "90%",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "space-between",
              "& > .not_assigned": {
                width : "33%",
                height: "100%",
                boxSizing: "border-box",
                padding: "1.5vw",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                "& > .content-title": {
                  fontFamily: "Pretendard",
                  fontSize: "3vw",
                  color: "white",
                  fontWeight: 700,
                },
                "& > .content": {
                  width: "100%",
                  height: "75%",
                  background: "white",
                  borderRadius: "0.5vw",
                  boxSizing: "border-box",
                  padding: "1vw",
                  textAlign: "left",
                  "& > .call": {
                    height: "5vw",
                    width: "auto",
                    color: "#888",
                    fontFamily: "Pretendard",
                    fontSize: "2vw",
                    borderRadius: "1.5vw",
                    background: "#ECECEC",
                    fontWeight: 600,
                    padding: "0.8vw",
                  }
                },
                "& > .button": {
                  width: "100%",
                  height: "4vw",
                  background: "#FABE00;",
                  fontFamily: "Pretendard",
                  fontSize: "1.5vw",
                  color: "white",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "0.5vw",
                }
              },
              "& > .assigned": {
                width : "33%",
                height: "100%",
                boxSizing: "border-box",
                padding: "1.5vw",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                "& > .content-title": {
                  fontFamily: "Pretendard",
                  fontSize: "3vw",
                  color: "white",
                  fontWeight: 700,
                },
                "& > .content": {
                  width: "100%",
                  height: "75%",
                  background: "white",
                  borderRadius: "0.5vw",
                },
                "& > .button": {
                  width: "100%",
                  height: "4vw",
                  background: "#3C96D2;",
                  fontFamily: "Pretendard",
                  fontSize: "1.5vw",
                  color: "white",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "0.5vw",
                }
              },
              "& > .disable": {
                width : "33%",
                height: "100%",
                boxSizing: "border-box",
                padding: "1.5vw",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                "& > .content-title": {
                  fontFamily: "Pretendard",
                  fontSize: "3vw",
                  color: "white",
                  fontWeight: 700,
                },
                "& > .content": {
                  width: "100%",
                  height: "75%",
                  background: "white",
                  boxSizing: "border-box",
                  borderRadius: "0.5vw",
                },
                "& > .button": {
                  width: "100%",
                  height: "4vw",
                  background: "#5ABE6E;",
                  fontFamily: "Pretendard",
                  fontSize: "1.5vw",
                  color: "white",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "0.5vw",
                }
              },
            },
          }}
        >
          <div className="modal_TopWrap">
            <div className="textWrap">
              <span className="modal-title">{card.name}</span>
              <span className="modal-ip">192.168.60.102</span>
            </div>
            <div className="buttonWrap">
            <Button className="saveButton">저장하기</Button>
            <Button className="cancelButton" onClick={handleClose}>
              X
            </Button>
            </div>
          </div>
          <div className="modal_ContentWrap">
            <div className="not_assigned">
              <span className="content-title">할당되지 않은 콜</span>
              <div className="content">
                <span className="call">55</span>
                <span className="call">55</span>
                <span className="call">55</span>
                <span className="call">55</span>
              </div>
              <Button className="button">여기로 이동</Button>
            </div>
            <div className="assigned">
              <span className="content-title">{card.name} 할당 콜</span>
              <div className="content"></div>
              <Button className="button">여기로 이동</Button>
            </div>
            <div className="disable">
              <span className="content-title">콜 삭제</span>
              <div className="content"></div>
              <Button className="button">여기로 이동</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default RobotCard;
