// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract GambleGameFactory {

    GambleGame[] public deployedGambleGames;
    address payable public owner;
    string public version;
    event eCreateGamble(
        GambleGame indexed newGamble
    );

    constructor() {
        owner = payable(msg.sender);
        version = "0.0.1";
    }

    modifier onlyOwner() {
        require( 
            msg.sender == owner, 
            "Only the owner of the gamble can execute this function"
        );
        _;
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(payable(address(0)));
    }

    function transferOwnership(address payable newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address payable newOwner) internal virtual {
        owner = newOwner;
    }

    function createGambleGame( string memory firstTeam, string memory secondTeam, string memory gambleDesc, string memory gambleType, string memory gambleSubType ) public {
        require( bytes(firstTeam).length > 0
            && bytes(secondTeam).length > 0  
            && keccak256(abi.encode(firstTeam)) != keccak256(abi.encode(secondTeam))
            && bytes(gambleDesc).length > 0 ,
            "You must enter at least two different teams, and a description"
        );
        require( bytes(firstTeam).length < 31
            && bytes(secondTeam).length < 31  
            && bytes(gambleDesc).length < 301 ,
            "The max length of team names is 30 characters and the max length for description is 300 characters"
        );

        require( bytes(gambleType).length < 31
            && bytes(gambleSubType).length < 31,
            "The max length of type is 30 characters"
        );

        GambleGame newGambleGame = new GambleGame( msg.sender, firstTeam, secondTeam, gambleDesc, gambleType, gambleSubType, owner, version );
        emit eCreateGamble( newGambleGame );
        deployedGambleGames.push(newGambleGame);
    }

    function getDeployedGambleGames() public view returns (GambleGame[] memory) {
        return deployedGambleGames;
    }

    function getContractBalance() view public returns (uint) {
        return address(this).balance;
    }
}


contract GambleGame {
    
    struct Gamble {
        address payable playerAddress;
        string teamGambled;
        uint amount;
    }


    string public version;
    bool public completed;
    uint public completedDate;
    bool public completedByWinner;
    string public winner;
    bool public official;
    address payable public owner;
    address public manager;
    string public firstTeam;
    string public secondTeam;
    string public gambleDesc;
    string public gambleType;
    string public gambleSubType;
    Gamble[] public gambles;
    mapping ( string => uint) public balance;

    modifier onlyOwner() {
        require( 
            msg.sender == owner, 
            "Only the owner of the gamble can execute this function"
        );
        _;
    }

    modifier managerRequired() {
        require( 
            msg.sender == manager || msg.sender == owner, 
            "Only the manager of the gamble can execute this function"
        );
        _;
    }

    modifier validTeam( string calldata team ) {
        require(
            keccak256(abi.encode(firstTeam)) == keccak256(abi.encode(team)) 
            || 
            keccak256(abi.encode(secondTeam)) == keccak256(abi.encode(team)),
            "You must select a valid team"
        );
        _;
    }

    modifier mustBeIncompleted() {
        require(
            !completed,
            "This gamble is already completed"
        );
        _;
    }

    

    constructor( address _manager, string memory _firstTeam, string memory _secondTeam, string memory _gambleDesc, string memory _gambleType, string memory _gambleSubType , address payable _owner, string memory _version ) {
        owner = _owner;
        manager = _manager;
        firstTeam = _firstTeam;
        secondTeam = _secondTeam;
        gambleDesc = _gambleDesc;
        gambleType = _gambleType;
        gambleSubType = _gambleSubType;
        completed = false;
        completedByWinner = false;
        version = _version;
        
        if (manager == owner) {
            official = true;
        } else {
            official = false;
        }
    }

    function enterGamble( string calldata teamGambled ) payable public validTeam(teamGambled) mustBeIncompleted {
        require(
            msg.value >= 0.002 ether,
            "Minimum amount to gamble is 0.002 eth"
        );

        gambles.push(Gamble({
            playerAddress: payable(msg.sender), 
            teamGambled: teamGambled, 
            amount: msg.value
            })
        ) ;
        balance[teamGambled] += msg.value;
    }

    function pickWinners( string calldata winnerTeam ) public managerRequired mustBeIncompleted validTeam(winnerTeam) {

        uint contractBalanceSnap = address(this).balance;

        for( uint i = 0; i < gambles.length; i++) {
            if( keccak256(abi.encode(gambles[i].teamGambled)) == keccak256(abi.encode(winnerTeam)) ) {

                (bool sent, ) = gambles[i].playerAddress.call{value: contractBalanceSnap * gambles[i].amount * 99 / 100 / balance[winnerTeam] }("");
                require(sent, "Failed to send Ether");

            } else  {
            continue;
            }
        }

        winner = winnerTeam;
        balance[firstTeam] = 0;
        balance[secondTeam] = 0;
        delete gambles;
        completed = true;
        completedByWinner = true;
        completedDate = block.timestamp;
        (bool sent2, ) = owner.call{value: address(this).balance }("");
        require(sent2, "Failed to send Ether");

    }

    function cancelGamble() public managerRequired mustBeIncompleted {
        
         for( uint i = 0; i < gambles.length; i++) {
                (bool sent, ) = gambles[i].playerAddress.call{value: gambles[i].amount * 99 / 100 }("");
                require(sent, "Failed to send Ether");
        }

        balance[firstTeam] = 0;
        balance[secondTeam] = 0;
        delete gambles;
        completed = true;
        completedDate = block.timestamp;
        (bool sent2, ) = owner.call{value: address(this).balance }("");
        require(sent2, "Failed to send Ether");
    }

    function getGambles() view public returns (Gamble[] memory) {
        return gambles;
    }

    function getContractBalance() view public returns (uint) {
        return address(this).balance;
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(payable(address(0)));
    }

    function transferOwnership(address payable newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address payable newOwner) internal virtual {
        owner = newOwner;
    }

}