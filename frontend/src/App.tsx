import React from 'react';
import { Reset } from 'styled-reset';
import { useRoutes } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import Robot from './pages/Robot';
import Bell from './pages/Bell';
import { useInterval } from './utils/useInterval';
import { useAppDispatch, useAppSelector } from './store';
import { getRegCall, getDeviceAll } from './slices/DeviceSlice';
import { CallBase } from './types/servinggo-protocol ';

function App() {
  const dispatch = useAppDispatch();
  const { regCall, callList } = useAppSelector((state)=>state.device)
  //const regCall = useAppSelector((state)=>state.device);
  const [reg, setReg] = React.useState<CallBase>(new CallBase());

  useInterval(()=>{
    dispatch(getRegCall())
  }, 1000)
  React.useEffect(()=>{
    setReg(regCall ? regCall : new CallBase());
    //dispatch(getDeviceAll());
  }, [])
  //console.log(regCall)
  //console.log(callList)
 const num = 1
  return (
    <div className="App">
      <Reset />
      {useRoutes([
        // { path: "/", element: <Main /> },
        {
          element: <Layout />,
          children: [
            { path: "/", element: <Main /> },
            { path: "/robot", element: <Robot /> },
            { path: "/bell", element: <Bell num={reg}/> },
          ],
        },
        // { path: "/*", element: <Navigate to="/serving" /> },
      ])}
    </div>
  );
}

export default App;
