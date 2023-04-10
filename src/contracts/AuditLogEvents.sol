// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;


contract AuditLogEvents {
    event Log(uint256 dealID, uint256 fileID, uint256 filehash);

    function log(uint256 _dealID, uint256 _fileID, uint256 _filehash) public {
        emit Log(_dealID, _fileID, _filehash);
    }
}
