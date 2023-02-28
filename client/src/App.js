import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Lottery from './contracts/lottery.json'
import Manager from "./components/Manager";
import Players from "./components/Players";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const [Address, setAddress] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Lottery.networks[networkId];

        setAddress(deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, contract: instance });
        console.log(Address);
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, [Address]);

  return (
    <div style={{ position: "relative", top: "50%", left: "50%" }}>
      <Router>
        <Route exact path="/">
          <Link to='/manager'>
            Manager
          </Link>
          <br />
          <Link to='/players'>
            Players
          </Link>
        </Route>
        <Route path="/manager">
          <Manager state={state} />
        </Route>
        <Route path="/players">
          <Players  state={state} />
        </Route>
      </Router>
    </div>
  )
}
