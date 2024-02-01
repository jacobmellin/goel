import os from 'os';
import process from 'process';
import path from 'path';
import { expect } from 'chai';
import { spawn, spawnSync } from 'child_process';
import { Builder, By, Capabilities } from 'selenium-webdriver';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { before, after, describe, it } from 'mocha';

const __dirname = dirname(fileURLToPath(import.meta.url));


const application = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'src-tauri',
    'target',
    'release', 
    'goel'
);

let driver; // WebDriver instance
let tauriDriver; // tauri-driver process

before(async function() {
    this.timeout(5000);
    spawnSync('cargo', ['build', '--release']);
    
    tauriDriver = spawn(
        path.resolve(os.homedir(), '.cargo', 'bin', 'tauri-driver'),
        [],
        { stdio: [ null, process.stdout, process.stderr ] }
    );

    const capabilities = new Capabilities();
    capabilities.set('tauri:options', { application });
    capabilities.setBrowserName('wry');

    driver = await new Builder()
        .withCapabilities(capabilities)
        .usingServer('http://localhost:4444')
        .build();
});

after(async () => {
  await driver.quit();

  tauriDriver.kill();
});

describe('Goel main window', () => {
    it('should have the root element', async () => {
        const element = await driver.findElement(By.id('root'));
        expect(element).to.exist();
    });
});
