pragma solidity ^0.4.15;

contract Factory {

    /*
     *  Events
     */
    event ContractInstantiation(address sender, address instantiation);

    /*
     *  Storage
     */
    mapping(address => bool) public isInstantiation;
    address[] public allInstantiations; // Store all contract instantiations

    /*
     * Public functions
     */

    /// @dev Returns number of all instantiations.
    /// @return Returns the number of total instantiations.
    function getInstantiationCount()
        public
        view
        returns (uint)
    {
        return allInstantiations.length;
    }

    /// @dev Returns the address of an instantiation at a specific index.
    /// @param index The index of the instantiation to return.
    /// @return Returns the address of the instantiation.
    function getInstantiation(uint index)
        public
        view
        returns (address)
    {
        require(index < allInstantiations.length, "Index out of bounds");
        return allInstantiations[index];
    }

    /// @dev Returns all instantiations created so far.
    /// @return An array of addresses of all contract instantiations.
    function getAllInstantiations()
        public
        view
        returns (address[])
    {
        return allInstantiations;
    }

    /*
     * Internal functions
     */
    /// @dev Registers contract in factory registry.
    /// @param instantiation Address of contract instantiation.
    function register(address instantiation)
        internal
    {
        isInstantiation[instantiation] = true;
        allInstantiations.push(instantiation);
        ContractInstantiation(msg.sender, instantiation);
    }
}
