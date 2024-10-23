import React from "react";
import { DialogProps } from "../types/types";
import { Button, Dialog, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  GetRegCallDeviceRes,
  CallBase,
  MapNode,
  Call,
  RegCallDeviceReq
} from "../types/servinggo-protocol ";
import { useAppDispatch } from "../store";
import { setRegCall } from "../slices/DeviceSlice";
interface AddCallDialogProps extends DialogProps {
  regCall: GetRegCallDeviceRes;
}
interface newMapNode extends MapNode {
  selected: boolean
}

// interface newMapNode extends MapNode {
//   selected: boolean;
// }
const AddCallDialog: React.FC<AddCallDialogProps> = ({
  open,
  title,
  content,
  action,
  onClose : handleAddCallClose,
  regCall,
}) => {
  const dispatch = useAppDispatch();
  const [selectMap, setSelectMap] = React.useState<string>(
    regCall.unAllocateMapList[0].name
  );
  const [destination, setDestination] = React.useState<newMapNode[]>([]);
  const [selectedNode, setSelectedNode] = React.useState<RegCallDeviceReq>();
  React.useEffect(() => {
    const nodeList =
      regCall.unAllocateMapList.find((v) => v.name === selectMap)
        ?.mapNodeList ?? [];
    setDestination(
      nodeList.map((prev)=>({
        ...prev,
        selected: false
      }))
    );
   
  }, [selectMap]);
  const handleChange = (event: SelectChangeEvent<string>) => {
    //dispatch 맵 체인지
    setSelectMap(event.target.value);
  };
  
  const handleNodeClick = (event: string) => {
  
     const findNode = destination.find((v)=>v.name === event) as MapNode;
    // console.log(findNode)
    setDestination((select) =>
      select.map((t)=> t.name === event ? { ...t, selected: !t.selected} : {...t, selected: false})
    )
    const matchCall = new Call()
    
    matchCall.createdAt = regCall.call.createdAt
    matchCall.no = regCall.call.no
    matchCall.serialNo = regCall.call.serialNo
    matchCall.type = regCall.call.type
    matchCall.mapNode = {
      no : findNode.no,
      index: findNode.index,
      name: findNode.name,
      type: findNode.type
    }
    
    setSelectedNode({
      call : {
        createdAt : regCall.call.createdAt,
        no : regCall.call.no,
        serialNo : regCall.call.serialNo,
        type : regCall.call.type,
        mapNode : {
          no : findNode.no,
          index: findNode.index,
          name: findNode.name,
          type: findNode.type
        }
      }
    });
   
  };
  console.log(selectedNode)
  const handleSaveCall = ()=>{
   
   
    dispatch(setRegCall(
       selectedNode
    ))
  }
  return (
    <Dialog
      open={open}
      //onClose={handleClose}
      PaperProps={{
        sx: {
          width: `${712 / 12.2}vw`,
          maxWidth: `${712 / 12.2}vw`,
          padding: `${40 / 10.8}vh ${40 / 19.2}vw`,
          borderRadius: `${16 / 19.2}vw`,
          color: "white",
          background: "#323237",
          overflow: "visible",
          "& > .inputWrapper": {
            position: "relative",
            display: "flex",
            alignItems: "center",
            marginBottom: `${36 / 10.8}vh`,
            "& > .label": {
              fontSize: `${36 / 19.2}vw`,
              fontFamily: "Pretendard",
              fontWeight: 700,
            },
            "& > .exit": {
                position: "absolute",
                right: 0,
                top: "-0.5vw",
                background: "#FF2C63",
                borderRadius: "0.3vw",
                width: "2vw",
                height: "2vw",
                display: "flex",
                padding: "0.8vw",
                "& > img": {
                    width: "100%",
                    filter: `brightness(0) invert(1)`
                }
            }
          },
          "& > .title": {
            width: "100%",
            textAlign: "center",
            fontSize: `3vw`,
            fontWeight: 700,
            color: "#fff",
            marginBottom: "0.5vw",
          },
          "& > .maps": {
            //display: "flex",
            //flexDirection: "column",
            gap: `${24 / 19.2}vw`,
            maxHeight: `${656 / 10.8}vh`,
            height: "35vw",
            padding: `${24 / 10.8}vh ${40 / 19.2}vw`,
            marginBottom: `${28 / 10.8}vh`,
            background: "white",
            borderRadius: `${16 / 19.2}vw`,
            overflow: "auto",
            //boxSizing: "content-box",
            "& > .node": {
              display: "inline-block",
              background: "#ECECEC",
              color: "#888",
              fontFamily: "Pretendard",
              borderRadius: "1.5vw",
              fontSize: "1.8vw",
              padding: "0.8vw",
              //width: "3vw",
              //height: "3vw",
            },
            "& > .nodeActive": {
              display: "inline-block",
              background: "#3C96D2",
              color: "#white",
              fontFamily: "Pretendard",
              borderRadius: "1.5vw",
              fontSize: "1.8vw",
              padding: "0.8vw",
            },
          },
          "& > .actions": {
            display: "flex",
            gap: `${16 / 19.2}vw`,
            "& > button": {
              flex: 1,
              height: `${100 / 15.8}vh`,
              borderRadius: `${12 / 19.2}vw`,
              fontSize: `${32 / 19.2}vw`,
            },
            "& > .cancelButton": {
              background: "linear-gradient(#FFFFFF, #E0E0E0)",
            },
            "& > .confirmButton": {
              color: "white",
              background: "#3C96D2",
              fontFamily: "Pretendard",
              fontSize: "1.8vw",
              fontWeight: 700,
              "&:disabled": {
                color: " #808083",
                background: "linear-gradient(#375081, #3C4481)",
              },
            },
          },
        },
      }}
    >
      <div className="inputWrapper">
        <Typography className="label">{title}</Typography>
        <FormControl sx={{ m: 1, minWidth: 120, width: "10vw" }} size="small">
          {/* <InputLabel id="demo-select-small-label">지도 선택</InputLabel> */}
          <Select
            sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', // 전체 border 제거
                    borderBottom: '2px solid white', // 아래쪽만 border 적용
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderBottom: '2px solid white', // hover 상태의 아래쪽 border 유지
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderBottom: '2px solid white', // 포커스 상태의 아래쪽 border 유지
                  },
                  '.MuiSvgIcon-root': {
                    color: 'white', // 드롭다운 아이콘 색상 흰색
                  },
                  fontSize: "1.2vw",
                  fontWeight: 500,
                  color: 'white', // 텍스트 색상 흰색
            }}
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectMap}
            //label="지도 선택"
            onChange={handleChange}
            variant="outlined"
          >
            {regCall.unAllocateMapList.map((v, i) => (
              <MenuItem value={v.name} key={i}>
                {v.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="exit" onClick={handleAddCallClose}>
            <img src="/img/cancel.svg" />
        </div>
      </div>
        <Typography className="title">목적지 리스트</Typography>
      <div className="maps">
        {destination &&
          destination.map((v, i) => (
            // <div className={`destination${v.selected ? "selected" : " "}`}>{v.name}
            // <Typography>{v.name}</Typography>
            // </div>
            <div
              //className={destination.some((v)=>v.name === selectedNode?.name) ? "nodeActive" : "node"}
              className={v.selected ? "nodeActive" : "node"}
              //className={`node`}
              onClick={() => handleNodeClick(v.name)}
              key={i}
            >
              {v.name}
            </div>
          ))}
        {/* {maps &&
            maps.map((map, mapIdx) => (
              <div className="map" key={map.name}>
                <Typography className="mapName">{map.name}</Typography>
                {map.destinations.map((d, destIdx) => (
                  <div
                    className={`destination${d.selected ? "" : " disabled"}`}
                    key={d.name}
                    onClick={handleDestinationClick(mapIdx, destIdx)}
                  >
                    <Typography>{d.name}</Typography>
                    {d.priority > 0 && <StarIcon />}
                  </div>
                ))}
              </div>
            ))} */}
      </div>
      <div className="actions">
        <Button className="confirmButton" onClick={handleSaveCall}>콜 할당 저장하기</Button>
      </div>
    </Dialog>
  );
};

export default AddCallDialog;
