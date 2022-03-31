//import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Punks from './views/punks';
import Punk from './views/punk';
//import Web3 from 'web3'; // Esto me dio error, la linea de abajo es funcional con webpack >= 5
 import Web3 from "web3/dist/web3.min";
import MainLayout from './layouts/main';


function App() {

    return (
    <MainLayout>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="punks" exact element={<Punks/>}/>
      <Route path="/punks/:tokenId" exact element={<Punk />} />
    </Routes>
    </MainLayout>
    
  );
}

export default App;


