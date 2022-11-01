let accounts;

        const connectMetamask = async () => {
            accounts = await ethereum.request({method: "eth_requestAccounts"});
            connectContract(accounts);
        };

        const connectContract = async () => {
            const Address = "0xFfA51103914bA6ec8990816a87cf0eE0Ba720571";

            const ABI = [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "name": "listProduct",
                    "outputs": [],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "name": "getProductName",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string",
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "name": "getProductStatus",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool",
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "name": "registerProduct",
                    "outputs": [],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];

            window.web3 = await new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            await getProductStatus(urlParams.get('product_id'));
        };

        connectMetamask();

        const listProduct = async () => {
            let product_id = document.getElementById('product_id').value;
            document.getElementById('product_id').value = "";
            await window.contract.methods.listProduct(product_id).send({from: accounts[0]});
        };
        
        // const getProductName = async () => {
        //     let product_name = document.getElementById('product_id').value;
        //     document.getElementById('product_id').value = "";
        //     let data = await window.contract.methods.getProductName(product_name).call();
        //     alert(data);
        // };
        //

        const getProductStatus = async () => {
            let product_id = document.getElementById('product_id').value;
            document.getElementById('product_id').value = "";
            let data = await window.contract.methods.getProductStatus(product_id).call();

            if (data === false)
            {
                await registerProduct(product_id);
                swal("Success!", "Product registered successfully!", "success");
            }
            else
            swal("Warning!", "Product is already registered. This may be a fake product !", "error");
        };

        const registerProduct = async (product_id) => {
            await window.contract.methods.registerProduct(product_id).send({from: accounts[0]});
        };
  