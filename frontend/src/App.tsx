import React, { SetStateAction } from 'react';
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
import { GetRegCallDeviceRes } from './types/servinggo-protocol ';

function App() {
  const dispatch = useAppDispatch();
  const { regCall, callList } = useAppSelector((state)=>state.device)
  
 
  useInterval(()=>{
    dispatch(getRegCall())
  }, 1000);

  React.useEffect(()=>{
    dispatch(getDeviceAll());
  }, []);


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
            { path: "/bell", element: <Bell regCall={regCall} callList={callList}/> },
          ],
        },
        // { path: "/*", element: <Navigate to="/serving" /> },
      ])}
    </div>
  );
}

export default App;
