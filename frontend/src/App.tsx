import React, { SetStateAction } from 'react';
import { Reset } from 'styled-reset';
import { useRoutes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import Robot from './pages/Robot';
import Bell from './pages/Bell';
import { useInterval } from './utils/useInterval';
import { useAppDispatch, useAppSelector } from './store';
import { getRegCall, getDeviceAll } from './slices/DeviceSlice';
import { getRobot } from './slices/RobotSlice';
import { getOrder } from './slices/OrderSlice';
import { CallBase, GetRegCallDeviceRes } from './types/servinggo-protocol';

function App() {
  const dispatch = useAppDispatch();
  const { regCall, callList } = useAppSelector((state)=>state.device)
  const { robotDetailSummaryList } = useAppSelector((state)=>state.robot)
  const { orderList } = useAppSelector((state)=>state.order);
  useInterval(()=>{
    dispatch(getRegCall());
    dispatch(getOrder());
    dispatch(getRobot());
  }, 1000);

  React.useEffect(()=>{
    dispatch(getDeviceAll());
    dispatch(getRobot());
  }, []);
 
  
  return (
    <div className="App">
      <Reset />
      {useRoutes([
        // { path: "/", element: <Main /> },
        {
          element: <Layout />,
          children: [
            { path: "/", element: <Navigate to="/robot" /> },
            { path: "/robot", element: <Robot robotDetailSummaryList={robotDetailSummaryList} callList={callList}/> },
            { path: "/bell", element: <Bell regCall={regCall} callList={callList}/> },
          ],
        },
        // { path: "/*", element: <Navigate to="/serving" /> },
      ])}
    </div>
  );
}

export default App;
