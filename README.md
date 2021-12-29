This demo will show developers how to interact with PlatON WASM contract using MetaMask plugin wallet, it also applies to EVM contracts.

# Prerequisite

* OS: Windows 10/Ubuntu 18.04
* node: 12.22.8
* web browser: firefox/chrome
# Install

```plain
npm install
```

# Usage

1. start web server
```plain
npm run serve
```

2. install metamask plugin in your browser
You can find tutorial [here](https://metamask.io/download.html).

3. Add PlatON Dev Network to metamask
You can refer this [tutorial](https://forum.latticex.foundation/t/topic/5862).

4. Import private key into your metamask wallet
Private key used in demo

```plain
8d17969fd442d82868f9f256ce12338bc41fca66bebe88b97b15e40c2f99f9fc
```

5. Open the web page
Visit [http://localhost:9011/index.html](http://localhost:9011/index.html)

You can replace localhost with public IP if you are not testing on the same server.

6. connect to wallet
Click 'CONNECT' button to connect to metamask wallet.

7. Get current connected wallet account information.
Click 'LAT_ACCOUNTS' button to get your current connected account address, which is in hex style.

The output should be

```plain
0x30ad2981e83615001fe698b6fba1bbcb52c19dfa
```

8. Query the balance of an account
Input the address from which you want to get the balance, then click 'QUERY' button.

**Note: Here you must input PlatON style address starting with 'lat'.**

9. Mint token to an account
Input the address you want to send token to, then click 'MINT' button. A MetaMask pop-up windows will appear, it asks you to sign the transaction.

10. Query balance again
After a while, a message will pop up informing you the transaction is confirmed. Now, you can query the balance again, you will see the balance increase.

# Appendix

## Contract

The deployed contract is PRC20 standard WASM contract, you can deploy any other contract using your private key. Of course, you need to modify the code and parameters.

## Web3.js

The library is generated from client-sdk-js, you can find the tutorial [here](https://forum.latticex.foundation/t/topic/5803).

# Reference

[https://docs.metamask.io/guide/create-dapp.html#project-setup](https://docs.metamask.io/guide/create-dapp.html#project-setup)

[https://devdocs.platon.network/docs/en/JS_SDK/](https://devdocs.platon.network/docs/en/JS_SDK/)

[https://forum.latticex.foundation/t/topic/5862](https://forum.latticex.foundation/t/topic/5862)

[https://forum.latticex.foundation/t/topic/5803/3](https://forum.latticex.foundation/t/topic/5803/3)

