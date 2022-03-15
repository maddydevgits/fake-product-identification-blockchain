App = {

    web3Provider: null,
    contracts: {},
    scannedData: '',

    init: async function(data) {
        scannedData=data;
        return await App.initWeb3();
    },

    initWeb3: function() {
        if(window.web3) {
            App.web3Provider=window.web3.currentProvider;
        } else {
            App.web3Provider=new Web3.proviers.HttpProvider('http://localhost:8545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function() {

        $.getJSON('product.json',function(data){

            var productArtifact=data;
            App.contracts.product=TruffleContract(productArtifact);
            App.contracts.product.setProvider(App.web3Provider);
        });

        return App.fakeProduct();
    },

    fakeProduct: function() {

        var productInstance;

        var productId = scannedData;
        console.log(productId);

        web3.eth.getAccounts(function(error,accounts){

            if(error) {
                console.log(error);
            }

            var account=accounts[0];
            console.log(account);

            App.contracts.product.deployed().then(function(instance){

                productInstance=instance;
                return productInstance.verifyFakeness(web3.fromAscii(productId),{from:account});

            }).then(function(result){

                console.log(result);
                var productId;
                var pOwner;
                var pStatus;

                
                productId=web3.toAscii(result[0]);
                     
                    pOwner=web3.toAscii(result[1]);
                

                
                    pStatus=web3.toAscii(result[2]);
                

                var t= "";
                

                    var tr="<tr>";
                    tr+="<td>"+productId+"</td>";
                    tr+="<td>"+pOwner+"</td>";
                    tr+="<td>"+pStatus+"</td>";
                    tr+="</tr>";
                    t+=tr;
                
                document.getElementById('logdata').innerHTML = t;

            }).catch(function(err){

                console.log(err.message);
            });
        });
    }
};