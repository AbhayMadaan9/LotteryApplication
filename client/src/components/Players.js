import React from 'react'

export default function Players(
    {state}
) {
    const [account, setaccount] = React.useState("Not connected")
    const [registeredPlayers, setregisteredPlayers] = React.useState([])
    React.useEffect(() => {
        const getAccount = async()=>{
            const {web3} = state;
            const accounts = await web3.eth.getAccounts();
            setaccount(accounts[0]);
        }
        state.web3 && getAccount()
    }, [state, state.web3])


    React.useEffect(() => {
        const getPlayers =  async()=>{
            const {contract} = state;
            const players = await contract.methods.allParticipants().call();
            console.log(players);
            const registeredPlayers = await Promise.all(
                players.map((player)=>{
                    return player;
                })
            )
        setregisteredPlayers(registeredPlayers)
        console.log(registeredPlayers);
        }
        state.web3 && getPlayers()
    }, [state, state.web3])
    return (
    <div style={{backgroundColor:"gainsboro", width:"100%", textAlign: "center"}}>
        <h1>Connected Account: {account}</h1>
    
    <br/>
    <h1>Pay 2 ether at this account: 0x1AeE50803e0D3928c3591e7c7894121eB47228Ea</h1>
    <br/>
    <h1>Total Players: {registeredPlayers.length !== 0 && registeredPlayers.map((name)=>(name))}</h1>
    
    </div>
  )
}
