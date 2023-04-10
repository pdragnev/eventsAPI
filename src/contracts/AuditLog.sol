// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;


contract AuditLog {
    mapping(uint256 => mapping(uint256 => uint256)) logs;

    function log(uint256 _dealID, uint256 _fileID, uint256 _filehash) public {
        logs[_dealID][_fileID] = _filehash;
    }

    function getLog(uint256 _dealID, uint256 _fileID) public view returns (uint256) {
        return logs[_dealID][_fileID];
    }
}
