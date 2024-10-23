import React, { ChangeEvent, ChangeEventHandler } from "react";
import {
  useTheme,
  Box,
  Button,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import {
  BellAlertIcon,
  BellCheckIcon,
  BellIcon,
  BellRingIcon,
  DeleteIcon,
  PencilIcon,
} from "../constants/icons";
import type { DialogProps } from "../types/types";
import { AlertDialog } from "../components/AlertDialog";
import { GetRegCallDeviceRes, GetAllCallListRes, Call } from "../types/servinggo-protocol ";
import AddCallDialog from "../components/AddCallDialog";
import { useAppDispatch, useAppSelector } from "../store";
interface bells {
  id: string;
  table: string;
  check: boolean;
}
interface newCall extends Call {
  selected : boolean
}
let dummyBell = [
  { id: "a", table: "1", check: false },
  { id: "b", table: "2", check: false },
  { id: "c", table: "3", check: false },
  { id: "d", table: "4", check: false },
  { id: "e", table: "5", check: false },
  { id: "f", table: "6", check: false },
  { id: "g", table: "7", check: false },
  { id: "h", table: "8", check: false },
];
const Bell: React.FC<{regCall: GetRegCallDeviceRes; callList: Call[]}> = ({ regCall, callList }) => {
  const [bells, setBells] = React.useState<newCall[]>([]);
  const [alertProps, setAlertProps] = React.useState<DialogProps>({
    open: false,
    title: "",
    content: "",
    action: ()=>{

    },
  })
  const [addCallProps, setAddCallProps] = React.useState<DialogProps>({
    open: false,
    title: "",
    content: "",
    action: ()=>{

    },
  })
  React.useEffect(()=>{
    setBells(callList.map((prev)=>({
      ...prev,
      selected : false
    })))
  }, [callList])
  const sign = true;
  const handleCheck = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setBells((bells) =>
      bells.map((v) => (v.serialNo=== id ? { ...v, selected: !v.selected } : v))
    );
  };
  const handleAllCheck = () => {
    if(bells.some((v)=>!v.selected)){
        setBells((bells) =>
            bells.map((v) => ({
              ...v,
              selected: true,
            }))
          );
    }else {
        setBells((bells) =>
            bells.map((v) => ({
              ...v,
              selected: false
            }))
          );
    }
  };
  const handleAlertOpen = (e:string)=>{
    if(e !== "선택삭제"){
        setAlertProps({
            open: true,
            title: "삭제 하시겠습니까?",
            content: "",
            action : ()=>{
                handleDelete(e)
            }
        })
    }else{
        setAlertProps({
            open: true,
            title: "선택한 호출벨을 삭제 하시겠습니까?",
            content: "",
            action : handleDeleteAll
        })
    }
  
  }
  const handleClose = ()=>{
    setAlertProps({
        open: false,
        title: "",
        content: "",
        action : ()=>{
        }
    })
  }
  const handleDelete = (e:string)=>{
   
    setBells(bells.filter((v)=>v.serialNo !== e))
  }
  const handleDeleteAll = ()=>{
    setBells(bells.filter((v)=>v.selected === false))
  }
  const handleAddClick = ()=>{
    setAddCallProps({
      open: true,
      title: "지도 선택",
      content: "",
      action : ()=>{
      }
  })
  }
  const handleAddCallClose = ()=>{
    setAddCallProps({
      open: false,
      title: "",
      content: "",
      action : ()=>{
      }
    })
  }
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        gap: "2vw",
        height: "100%",
        //padding: `${20 / 10.8}vh ${24 / 19.2}vw`,
        borderRadius: `${12 / 19.2}vw`,
        //background: `url(/img/mainBgImg.jpg)`,
        boxShadow: "0px 8px 18px #00000029",
        "& > .list": {
          display: "flex",
          height: "80.5vh",
          flexDirection: "column",
          flex: 1,
          background: `url(/img/mainBgImg.jpg)`,
          boxSizing: "border-box",
          borderRadius: `${12 / 14.2}vw`,
          padding: "2vw 2vw",
          //padding: `${32 / 10.8}vh ${40 / 19.2}vw ${44 / 10.8}vh`,
          "& > .header": {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: `${24 / 10.8}vh`,
            "& > .title": {
              fontSize: `${36 / 19.2}vw`,
              fontWeight: 700,
              color: "white",
              fontFamily: "Pretendard",
            },
            "& > button": {
              width: `${176 / 19.2}vw`,
              height: `${60 / 10.8}vh`,
              fontSize: `${22 / 19.2}vw`,
              borderRadius: `${12 / 19.2}vw`,
              color: "white",
              fontWeight: 500,
              fontFamily: "Pretendard",
              background: " linear-gradient(#4987F8, #5668F9)",
              "&:disabled": {
                color: "#808083",
                background: " linear-gradient(#375081, #3C4481)",
              },
            },
          },
          "& > .table": {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
            "& > .tableHead": { borderBottom: `1px solid ${"#BDBDBD"}` },
            "& > .tableBody": { flex: 1, overflow: "auto" },
            "& .tableRow": {
              display: "flex",
              alignItems: "center",
              padding: `${16 / 10.8}vh 0px`,
              borderBottom: `1px solid ${"#424242"}`,
              "&:last-of-type": { borderBottom: "none" },
              "& svg": {
                width: `${36 / 19.2}vw`,
                height: `${36 / 19.2}vw`,
                color: "white",
              },
              "& > .checkbox": {
                width: `${52 / 19.2}vw`,
                marginLeft: `${8 / 19.2}vw`,
                marginRight: `${32 / 19.2}vw`,
                padding: `${8 / 19.2}vw`,
                color: "#BDBDBD",
              },
              "& > .id": {
                width: `${136 / 19.2}vw`,
                marginRight: "auto",
                fontSize: `${28 / 19.2}vw`,
                color: "white",
                fontFamily: "Pretendard",
              },
              "& > .table": {
                width: `${136 / 19.2}vw`,
                marginRight: "auto",
                fontSize: `${28 / 19.2}vw`,
                textAlign: "center",
                color: "white",
                fontFamily: "Pretendard",
              },
              "& > .edit": {
                width: `${52 / 19.2}vw`,
                marginRight: "auto",
                fontSize: `${28 / 19.2}vw`,
                textAlign: "center",
                color: "white",
                fontFamily: "Pretendard",
              },
              "& > .delete": {
                width: `${52 / 19.2}vw`,
                marginRight: `${16 / 19.2}vw`,
                fontSize: `${28 / 19.2}vw`,
                textAlign: "center",
                color: "white",
                fontFamily: "Pretendard",
              },
            },
          },
        },
        "& > .signal": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: `${760 / 19.2}vw`,
          background: `url(/img/mainBgImg.jpg)`,
          borderRadius: `${12 / 14.2}vw`,
          "& > svg": {
            display: "block",
            color: "white",
            width: `${160 / 19.2}vw`,
            height: `${160 / 19.2}vw`,
            marginTop: `${228 / 10.8}vh`,
            marginBottom: `${56 / 10.8}vh`,
          },
          "& > p, > button": {
            fontSize: `${40 / 19.2}vw`,
            color: "white",
          },
          "& > button": {
            background: `linear-gradient(#4987F8, #5668F9)`,
            borderRadius: `${12 / 19.2}vw`,
            width: `${220 / 19.2}vw`,
            height: `${100 / 10.8}vh`,
            fontFamily: "Pretendard",
          },
          "& > .mainContent": {
            textAlign: "center",
            marginBottom: `${60 / 10.8}vh`,
            fontFamily: "Pretendard",
          },
          "& > .subContent": { textAlign: "left" },
        },
      }}
    >
      <div className="list">
        <div className="header">
          <Typography className="title" variant="h1">
            호출벨 리스트
          </Typography>
          <Button
            disabled={bells.every((b) => b.selected === false)}
            onClick={()=>handleAlertOpen("선택삭제")}
          >
            선택 삭제
          </Button>
        </div>
        <div className="table">
          <div className="tableHead">
            <div className="tableRow">
              <Checkbox
                className="checkbox"
                checked={bells.every((b) => b.selected === true)}
                onChange={handleAllCheck}
              />
              <Typography className="id">호출벨 ID</Typography>
              <Typography className="table">목적지 이름</Typography>
              <Typography className="edit">수정</Typography>
              <Typography className="delete">삭제</Typography>
            </div>
          </div>
          <div className="tableBody">
            {bells.map((bell, idx) => (
              <div key={idx} className="tableRow">
                <Checkbox
                  className="checkbox"
                  checked={bell.selected}
                  onChange={handleCheck(bell.serialNo)}
                  //onChange={handleCheckChange(idx)}
                />
                <Typography className="id">{bell.serialNo}</Typography>
                <Typography className="table">{bell.mapNode.name}</Typography>
                <IconButton
                  className="edit"
                  //onClick={handleEditClick(bell)}
                >
                  <PencilIcon />
                </IconButton>
                <IconButton
                  className="delete"
                  //onClick={()=>handleAlertOpen(bell.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="signal">
        <BellIcon />
        {
          regCall.call.serialNo !== "" ? (
            <>
             <Typography className="mainContent">
              등록되지 않은 호출벨 입니다.
              <br />
              등록하시려면 아래 버튼을 눌러주세요.
            </Typography>
            <Button onClick={handleAddClick}>등록</Button>
            </>
          ) : (
            <>
             <Typography className="mainContent">
              호출벨을 테스트 또는 등록하려면
              <br />
              호출벨을 눌러주세요.
            </Typography>
            </>
          )
        }
        {/* {bellIcon}
        {mainContent}
        {subContent} */}
      </div>
      {
        alertProps.open && (
            <AlertDialog {...alertProps} onClose={handleClose}/>
        )
      }
      {
        addCallProps.open && (
            <AddCallDialog {...addCallProps} regCall={regCall} onClose={handleAddCallClose}/>
        )
      }
    </Box>
  );
};

export default Bell;
