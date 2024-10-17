import React, { SetStateAction } from 'react';
import { useTheme, Box, Button } from "@mui/material";
import RobotCard from '../components/RobotCard';
import type { Card } from '../types/types';
import { useAppDispatch, useAppSelector } from '../store';
import { getDeviceAll, getRegCall } from '../slices/DeviceSlice';
let RobotCardData: Card[] = [
  {id : 1, name: "RobotA", calls: []},
  {id : 2, name: "RobotB", calls: []},
  {id : 3, name: "RobotC", calls: []},
  {id : 4, name: "RobotD", calls: []},
 ]

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

const Robot = () => {
    const dispatch = useAppDispatch();
    const [cardData, setCardData] = React.useState<Card[]>(RobotCardData)
    //const [callData, setCallData] = React.useState<Call>(new Call())
    const { callList, regCall } = useAppSelector((state)=>state.device);
    let dummyCall = [
       "123","456","789","101","102","103","104","105","106",
       "107","108","109","110","110","111","112","113","114",
       "가나다라마바사아","2","3","4","5","311","312","313","314","315"
    ]
    const [selectCall, setSelectCall] = React.useState<string>("");
    const [calls, setCalls] = React.useState<string[]>(dummyCall);
    // React.useEffect(()=>{
    //   const modCallData = new Call();
    //   modCallData.No = 1111;
    //   modCallData.Type = 1
    //   modCallData.SerialNo = "2222"
    //   setCallData(modCallData)
    // }, [])
  
    React.useEffect(()=>{
      dispatch(getDeviceAll());
      dispatch(getRegCall());
    }, [])

    const theme = useTheme();
    const handleCallRemove = (e: any)=>{
      setCalls(calls.filter((v)=>v !== e))
    }
    const handleSelectCall = (e: string)=>{
     
      setSelectCall(e)
    }
   
    const handleAddCall = (cardId: number, call: string)=>{
      const length = cardData.find((v)=>v.id === cardId)?.calls.length
      if(!call || (length && length > 3)){
        return;
      }
      setCardData(e =>
        e.map(card=>
          card.id === cardId
          ? {...card, calls : [...(card.calls || []), call.toString()]}
          : card
        )
      )
     setCalls((e)=>e.filter((v)=>v !== call))
     setSelectCall("")
    }
    const handleDeleteCall= (cardId: number, call: string)=>{
     
      setCardData(e =>
        e.map(card=>
          card.id === cardId
          ? {...card, calls : card.calls?.filter((v)=>v !== call)}
          : card
        )
      )
      setCalls((e)=>[...e, call])
    }
    console.log(callList)
    return (
        <Box sx={{
            flex: 1,
            display: "flex",
            gap: "2vw",
            height: "80.5vh",
            width: "100%",
            // padding: `${20 / 10.8}vh ${24 / 19.2}vw`,
            //padding: `${20 / 10.8}vh`,
            borderRadius: `${12 / 19.2}vw`,
            boxShadow: "0px 8px 18px #00000029",
            "& > .call_list": {
              boxSizing: "border-box",
              padding: "1vw",
              width: "30%",
              height: "100%",
              background: "#35353A",
              display: "flex",
              gap: "1.2vw",
              flexDirection: "column",
              borderRadius: "0.8vw",
              //gap: "2vw",
              "& > .list_text": {
                height: "10%",
                color: "white",
                fontFamily: "Pretendard",
                fontWeight: 700,
                fontStyle: "normal",
                fontSize: "3.5vw"
              },
              "& > .listWrap": {
                width: "100%",
                height: "90%",
                //background: "red",
                overflowY: "auto",
                '&::-webkit-scrollbar': {
                  display : "none",
                },
                //display: "flex",
                whiteSpace: "wrap",
                
                "& > .button" : {
                  height: "4vw",
                  width: "auto",
                  color: "#222",
                  fontFamily: "Pretendard",
                  fontSize: "2vw",
                  borderRadius: "1.5vw",
                  background: "white",
                  fontWeight: 700,
                  margin: "0.5vw 0.5vw 0.5vw 0",
                  "& > img": {
                    width: "1vw",
                    height: "1vw",
                    padding: "0 1vw",
                    zIndex: 5
                  }
                },
                "& > .buttonActive" : {
                  height: "4vw",
                  width: "auto",
                  color: "#ffffff",
                  background: "#09F",
                  fontFamily: "Pretendard",
                  fontSize: "2vw",
                  fontWeight: 700,
                  borderRadius: "1.5vw",
                  margin: "0.5vw 0.5vw 0.5vw 0",
                  "& > img": {
                    filter: "brightness(0) invert(1)",
                    width: "1vw",
                    height: "1vw",
                    padding: "0 1vw",
                    zIndex: 5
                  }
                }
              }


          },
            "& > .cardContainer": {
                width: "70%",
                height: "100%",
                //background: "red",
                display: "flex",
                gap: "1vw",
                overflowX: "auto",
                whiteSpace: "nowrap",
                '&::-webkit-scrollbar': {
                  display : "none",
                },
            }
          }}>
            <div className="call_list">
              <span className="list_text">Call List</span>
              <div className="listWrap">
                {/* {
                  calls.map((calls, i)=>(
                    <Button className={calls === selectCall ? "buttonActive" : "button"} key={i} onClick={()=>handleSelectCall(calls)}>{calls}
                      <img src="/img/cancel.svg" onClick={()=>handleCallRemove(calls)}/>
                    </Button>
                  ))
                } */}
                {
                  callList.map((calls, i)=>(
                    <Button className={"button"} key={i} onClick={()=>handleSelectCall(calls.mapNode.name)}>{calls.mapNode.name}
                    <img src="/img/cancel.svg" onClick={()=>handleCallRemove(calls.mapNode.name)}/>
                  </Button>
                  ))
                }
              </div>
            </div>
            <div className="cardContainer">
              
            {
              cardData.map((card)=>(
                <RobotCard card={card} key={card.id} selectCall={selectCall} handleAdd={handleAddCall} handleDelete={handleDeleteCall} />
              ))
            }
            {/* <RobotAddCard /> */}
            </div>
          </Box>
    );
};

export default Robot;