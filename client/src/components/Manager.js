import React, { useState, useEffect } from "react";


export default function Manager({state}) {
    const [account, setAccount] = useState("");
  const [Cbalance, setCbalance] = useState(0);
  const [lwinner, setLwinner] = useState("No winner yet");

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };
  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      setAccountListener(web3.givenProvider)
      setAccount(accounts[0]);
    };
    state.web3 && getAccount();
  }, [state, state.web3]);

  const contractBalance = async () => {
    const { contract } = state;
    try {
      const balance = await contract.methods
        .getBalance()
        .call({ from: account });
      console.log(balance);
      setCbalance(balance);
    } catch (e) {
      setCbalance("You are not the manager");
    }
}
const winner = async ()=>{
const {contract} = state;
try {
  await contract.methods.pickWinner().send({from: account}); //send is used for write operaiton on contract and call is used for read operation 
const lotterywinner = await contract.methods.winner().call();
setLwinner(lotterywinner);
} catch (e) {
  if(e.message.includes("You are not the manager"))
  {
    setLwinner("You are not the manager")
  }
  else{
  setLwinner("Less than 3 participants not allowed")
  }
  
}

}
  return (
    <div style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "gainsboro", marginLeft:"0"}}>
    <h1 onClick={contractBalance}>Balance: {Cbalance}</h1>
    <br/>
    <h1 onClick={winner}>Winner: {lwinner}</h1>

    </div>
  )
}
