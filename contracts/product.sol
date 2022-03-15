pragma solidity ^0.8.12;

contract product {

    bytes32[] products;
    bytes32[] owners;
    bytes32[] pStatus;

    mapping(bytes32 => bool) public vProducts;

    function setProduct(bytes32 productId,bytes32 pOwner) public{

        require(!vProducts[productId]);
        vProducts[productId] = true;

        products.push(productId);
        owners.push(pOwner);
        pStatus.push("Available");
                
    }

    function viewProducts () public view returns(bytes32[] memory, bytes32[] memory,bytes32[] memory) {
        return(products,owners,pStatus);
    }

    function sellProduct (bytes32 sProductId) public {
        bytes32 status;
        uint i;
        uint j=0;

        if(products.length>0) {
            for(i=0;i<products.length;i++) {
                if(products[i]==sProductId) {
                    j=i;
                }
            }
        }

        status=pStatus[j];
        if(status=="Available") {
            pStatus[j]="NA";
        }
    }

    function verifyFakeness(bytes32 vProductId) public view returns(bytes32,bytes32,bytes32) {

        bool status=false;
        uint i;
        uint j=0;

        if(products.length>0) {
            for(i=0;i<products.length;i++) {
                if(products[i]==vProductId) {
                    j=i;
                    status=true;
                }
            }
        }

        if(status==true) {
                if(pStatus[j]=="Available")
                    return(products[j],owners[j],"Original");
                else 
                    return (products[j],owners[j],"Fake");
        } else {
                return("NA","NA","Fake");
        }

    }
}

