let menu = document.querySelector('.menu');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header');

menu.addEventListener('click', () =>{
    navbar.classList.toggle('active');
})

window.onscroll = () =>{
    navbar.classList.remove('active');

    if(window.scrollY > 0){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }
}

/*Accordion Menu*/
var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {	 
        // close panel when clicked. (only one sub opens)
        for (var j = 0 ; j<acc.length; j++){
            // delete active class in button.
            acc[j].classList.remove("active");
            //set div content height 0 next to button == close accordion
            if (this!==acc[j]) {
                acc[j].nextElementSibling.style.maxHeight = null;
            }
        }

        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            //this.classList.remove("active");
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "100px";
        } 
    });
}

/*Wallet Connect
var web3;
    
async function connect() {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
    }

}*/
/*
const initialize = () => {
    //We have selected our required html elements
    const connectButton = document.getElementsByClassName('wallet');
    const addr = document.getElementById("addr");
    const displayBal = document.getElementById("displaybal");
  
    const logout = () => {
      // code for handling logout
        addr.innerText = "";
        displayBal.innerText = "";
        addr.style.display = "None";
        connectButton.innerText = "Connect";
    }
  
    const connectHandler = (ev) => {
      // we automatically try to populate address and balance if metamask is connected.
      //connectButton.innerText = "Connected";
    }
  
    const accountsChangedHandler = (accounts) => {
      // code for handling metamask account swithing by user
      if (accounts.length) {
        addr.innerText = accounts[0];
        getBalance(accounts[0]);
      } else {
        logout();
      }
    }
  
    const chainChangedHandler = (chainId) => {
      // code for handling network swithing by user. eg user may switch from ethereum to binance smart chain
        clearListeners();
        window.location.reload();
    }
  
    const clearListeners = () => {
      // clears all ethereum listeners provided by metamask
         ethereum.removeListener('wallet', connectHandler);
        ethereum.removeListener('accountsChanged', accountsChangedHandler);
        ethereum.removeListener('chainChanged', chainChangedHandler);
    }
  
    const getBalance = async (account) => {
      // code to fetch user's balance for currently active address
      const bal = await web3.eth.getBalance(account);


    // alternative way without using web3
    // const balInHex = await ethereum.request({ method: 'eth_getBalance', params: [account] });
    // const bal = web3.utils.hexToNumberString(balInHex)
    displayBal.innerText = web3.utils.fromWei(bal, "ether");
    addr.style.display = "";
    }
    
    const onClickConnect = async () => {
      // code for triggering connection to metamask and fetching all user accounts
      try {

        if (connectButton.innerText == "Connect") {
          connectButton.disabled = true;

          // Will open the MetaMask UI
          await ethereum.request({ method: 'eth_requestAccounts' });
          connectButton.disabled = false;

          //fetch user accounts.
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          connectButton.innerText = "Disconnect";

          //We take the first address in the array of addresses and display it
          accountsChangedHandler(accounts);
        } else {
          logout();
        }
    } catch (error) {
        console.error(error);
    }
    };
  
    const isMetaMaskInstalled = () => {
       //code to check if the MetaMask extension is installed
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };
  
    const metaMaskClientCheck = () => {
      // creating our web3 instance and setting up listeners for various metamask events if metamask is installed
      if (!isMetaMaskInstalled()) {
        //The button is now disabled
        connectButton.disabled = true;
        alert("Metamask not installed");
      } else {
  
        // attach click handler
        connectButton.onclick = onClickConnect;
  
        //If it is installed we change our button text
        connectButton.disabled = false;
  
        // instantiate web3, here we are using window.ethereum injected by metamask as our provider.
        window.web3 = new Web3(window.ethereum);
  
  
        // listening to events
        ethereum.on('wallet', connectHandler);
        ethereum.on('accountsChanged', accountsChangedHandler);
        ethereum.on('chainChanged', chainChangedHandler);
      }
    };
    metaMaskClientCheck();
  };
  
  // this ensure that intialize is called after our dom content has been loaded.
  window.addEventListener('DOMContentLoaded', initialize);
*/

