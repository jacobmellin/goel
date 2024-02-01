import os from 'os';
import path from 'path';
import process from 'process';
import { spawn, spawnSync } from 'child_process';

let tauriDriver;

export const config = {
    specs: ['./test/specs/**/*.mjs'],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        'tauri:options': {
            'application': '../../src-tauri/target/release/goel'
        },
        browserName: 'wry',
    }],
    host: '127.0.0.1',
    port: 4444,
    reporters: ['spec'],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    onPrepare: () => {
        spawnSync('cargo', ['build', '--release']);
    },

    beforeSession: () => {
        (tauriDriver = spawn(
            path.resolve(os.homedir(), '.cargo', 'bin', 'tauri-driver'),
            [],
            { stdio: [ null, process.stdout, process.stderr ] }
        ))
    },
    afterSession: () => tauriDriver.kill()
};
