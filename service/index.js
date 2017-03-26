/// <reference path="../ui/ts/service.ts" />
const { TextDecoder } = require("text-encoding");
const { Client: SSHClient } = require("ssh2");

module.exports = {
    createSSHClient() {
        return new SSHClient();
    }
};