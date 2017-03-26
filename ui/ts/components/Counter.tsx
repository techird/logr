import "./Counter.less"
import * as React from "react";
import { createSSHClient } from "../service";

export class Counter extends React.Component<any, any> {
    state = {
        count: 0,
        log: ""
    }
    logArea: HTMLPreElement;
    render() {
        return (
            <div>
                <p onClick={() => this.inc()}>Count: {this.state.count}</p>
                <pre ref={el => this.logArea = el} id="log-area" style={{ }}>{this.state.log}</pre>
            </div>
        );
    }
    inc() {
        this.setState({ count: this.state.count + 1 });
        const ssh = createSSHClient();
        ssh.on('ready', () => {
            this.log('SSH 已连接', true);
            ssh.shell((err, stream) => {
                if (err) {
                    this.log(err.message, true);
                    return;
                }
                stream.stderr.on('data', chunk => {
                    this.log(chunk.toString());
                });
                stream.stdout.on('data', data => {
                    const decoder = new TextDecoder('utf-8');
                    this.log( decoder.decode(data));
                });
                stream.on('close', () => {
                    this.log('连接已关闭', true);
                });
                stream.end('pwd\nexit\n');
            });
        });
        ssh.on('error', (e) => {
            this.log('SSH 错误：', true);
        });
        ssh.connect({
            host: '192.168.1.1',
            port: 22,
            username: 'root',
            password: '********'
        });
    }
    log(chunk: string, eof = false) {
        this.setState({ log: this.state.log + chunk + (eof ? '\n' : '') });
    }
}