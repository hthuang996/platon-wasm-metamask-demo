const abi = '[{"anonymous":false,"input":[{"name":"topic","type":"FixedHash<20>"},{"name":"arg1","type":"uint128"}],"name":"Burn","topic":1,"type":"Event"},{"constant":false,"input":[{"name":"_account","type":"FixedHash<20>"}],"name":"setOwner","output":"bool","type":"Action"},{"anonymous":false,"input":[{"name":"topic","type":"FixedHash<20>"},{"name":"arg1","type":"uint128"}],"name":"Mint","topic":1,"type":"Event"},{"constant":true,"input":[{"name":"_owner","type":"FixedHash<20>"},{"name":"_spender","type":"FixedHash<20>"}],"name":"allowance","output":"uint128","type":"Action"},{"anonymous":false,"input":[{"name":"topic1","type":"FixedHash<20>"},{"name":"topic2","type":"FixedHash<20>"},{"name":"arg1","type":"uint128"}],"name":"Transfer","topic":2,"type":"Event"},{"anonymous":false,"input":[{"name":"topic1","type":"FixedHash<20>"},{"name":"topic2","type":"FixedHash<20>"},{"name":"arg1","type":"uint128"}],"name":"Approval","topic":2,"type":"Event"},{"constant":true,"input":[{"name":"_owner","type":"FixedHash<20>"}],"name":"balanceOf","output":"uint128","type":"Action"},{"constant":false,"input":[{"name":"_to","type":"FixedHash<20>"},{"name":"_value","type":"uint128"}],"name":"transfer","output":"bool","type":"Action"},{"constant":false,"input":[{"name":"_from","type":"FixedHash<20>"},{"name":"_to","type":"FixedHash<20>"},{"name":"_value","type":"uint128"}],"name":"transferFrom","output":"bool","type":"Action"},{"constant":false,"input":[{"name":"_spender","type":"FixedHash<20>"},{"name":"_value","type":"uint128"}],"name":"approve","output":"bool","type":"Action"},{"constant":false,"input":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"name":"init","output":"void","type":"Action"},{"constant":false,"input":[{"name":"_to","type":"FixedHash<20>"},{"name":"_value","type":"uint128"}],"name":"transfer","output":"bool","type":"Action"},{"constant":false,"input":[{"name":"_from","type":"FixedHash<20>"},{"name":"_to","type":"FixedHash<20>"},{"name":"_value","type":"uint128"}],"name":"transferFrom","output":"bool","type":"Action"},{"constant":false,"input":[{"name":"_spender","type":"FixedHash<20>"},{"name":"_value","type":"uint128"}],"name":"approve","output":"bool","type":"Action"},{"constant":false,"input":[{"name":"_account","type":"FixedHash<20>"},{"name":"_value","type":"uint128"}],"name":"mint","output":"bool","type":"Action"},{"constant":false,"input":[{"name":"_account","type":"FixedHash<20>"},{"name":"_value","type":"uint128"}],"name":"burn","output":"bool","type":"Action"},{"constant":true,"input":[{"name":"_owner","type":"FixedHash<20>"},{"name":"_spender","type":"FixedHash<20>"}],"name":"allowance","output":"uint128","type":"Action"},{"constant":true,"input":[],"name":"getOwner","output":"string","type":"Action"},{"constant":true,"input":[],"name":"getName","output":"string","type":"Action"},{"constant":true,"input":[],"name":"getDecimals","output":"uint8","type":"Action"},{"constant":true,"input":[],"name":"getSymbol","output":"string","type":"Action"},{"constant":true,"input":[],"name":"getTotalSupply","output":"uint128","type":"Action"}]'
const contractAddress = 'lat1wvg23mr73nnvfjsy0kaayuqgcw7txhhhp5qjju'
const contractAddressHex = '0x7310a8ec7e8ce6c4ca047dbbd27008c3bcb35ef7'
const ownerAddress = 'lat1xzkjnq0gxc2sq8lxnzm0hgdmedfvr806zlpfl4'
const ONE_TOKEN = '1000000000000000000'
const forwarderOrigin = 'http://localhost:9010'
const testNetwork = 'http://35.247.155.162:6789'

const initialize = () => {
  //Basic Actions Section
  const onboardButton = document.getElementById('connectButton');
  const getAccountsButton = document.getElementById('getAccounts');
  const getAccountsResult = document.getElementById('getAccountsResult');
  const onSendButton = document.getElementById('sendButton');
  const onQueryButton = document.getElementById('queryButton');
  const receiver = document.getElementById('receiveAccount');
  const queryInput = document.getElementById('queryAccount');
  receiver.value = ownerAddress;
  queryInput.value = ownerAddress;

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  //This will start the onboarding proccess
  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  };

  //Eth_Accounts-getAccountsButton
  getAccountsButton.addEventListener('click', async () => {
    //we use eth_accounts because it returns a list of addresses owned by us.
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    //We take the first address in the array of addresses and display it
    getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
  });

  const onClickSend = async () => {
    try {
      let web3 = new Web3(new Web3.providers.HttpProvider(testNetwork));
      let contract = new web3.platon.Contract(JSON.parse(abi), contractAddress, {net_type: "lat", vmType: 1});
      let data = contract.methods["mint"].apply(contract.methods, [receiver.value, ONE_TOKEN]).encodeABI();
      const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        gasPrice: '0x4A817C800', // customizable by user during MetaMask confirmation.
        gas: '0xF4240', // customizable by user during MetaMask confirmation.
        to: contractAddressHex, // Required except during contract publications.
        from: ethereum.selectedAddress, // must match user's active address.
        value: '0x00', // Only required to send ether to the recipient from the initiating external account.
        data: data, // Optional, but used for defining smart contract creation and interaction.
        chainId: '210309', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };

      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    } catch (error) {
      console.error(error);
    }
  }

  const onClickQuery = async () => {
    try {
      let web3 = new Web3(new Web3.providers.HttpProvider(testNetwork));
      // 主网地址
      let contract = new web3.platon.Contract(JSON.parse(abi), contractAddress, {net_type: "lat", vmType: 1});
      let ret = await contract.methods.balanceOf(queryInput.value).call()
      document.getElementById('QueryResult').innerHTML = ret;
    } catch (error) {
      console.error(error);
    }
  }

  //------Inserted Code------\\
  const MetaMaskClientCheck = () => {
    //Now we check to see if MetaMask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      onboardButton.innerText = 'Click here to install MetaMask!';
      //When the button is clicked we call th is function
      onboardButton.onclick = onClickInstall;
      //The button is now disabled
      onboardButton.disabled = false;
    } else {
      //If MetaMask is installed we ask the user to connect to their wallet
      onboardButton.innerText = 'Connect';
      //When the button is clicked we call this function to connect the users MetaMask Wallet
      onboardButton.onclick = onClickConnect;
      //The button is now disabled
      onboardButton.disabled = false;
      onSendButton.onclick = onClickSend;
      onSendButton.disabled = false;
      onQueryButton.onclick = onClickQuery;
      onQueryButton.disabled = false;
    }
  };
  MetaMaskClientCheck();
  //------/Inserted Code------\\
}
window.addEventListener('DOMContentLoaded', initialize)
