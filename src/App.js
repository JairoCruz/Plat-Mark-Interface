//import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Punks from './views/punks';
//import Web3 from 'web3'; // Esto me dio error, la linea de abajo es funcional con webpack >= 5
 import Web3 from "web3/dist/web3.min";
import MainLayout from './layouts/main';


function App() {

  // useEffect(()=> {
  //   if(window.ethereum) {
  //     /* window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     })
  //     .then((accounts) => console.log(accounts)); */
  //     // this is with web3
  //     const web3 = new Web3(window.ethereum);
  //     web3.eth.requestAccounts().then(console.log);
  //   } else {
  //     console.log("debe instalar algun proveedor como metamask para continual");
  //   }
  // }, []);

  return (
    <MainLayout>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="punks" exact element={<Punks/>}/>
    </Routes>
    </MainLayout>
    
  );
}

export default App;


