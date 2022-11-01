pragma solidity ^0.8.3;

contract FakeProduct
{
    struct Product
    {
        string product_name;
        bool registered;
    }

    mapping(string => Product) public products;

    function listProduct(string calldata _product_name) external
    {
        products[_product_name] = Product({
            product_name: _product_name,
            registered: false
        });
    }
    
    function getProductName(string calldata _product_name) external view returns (string memory)
    {
        return products[_product_name].product_name;
    }

    function getProductStatus(string calldata _product_name) external view returns (bool)
    {
        return products[_product_name].registered;
    }

    function registerProduct(string calldata _product_name) external
    {
        products[_product_name].registered = true;
    }
}
