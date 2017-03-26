import { Client as SSHClient } from "ssh2";

interface ServiceBridge {
    createSSHClient(): SSHClient;
}
const service: ServiceBridge = window['serviceBridge'];
export = service;