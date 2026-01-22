const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command-input');

// Focus on the input when clicking anywhere
document.body.addEventListener('click', function() {
    commandInput.focus();
});

// --- Enhanced Log Generation ---
const fakeLogLines = [
    'Connection to 192.168.1.254 established.',
    'Bypassing firewall level 3...',
    'Firewall bypassed. Gaining access to root...',
    'Access granted. User: admin',
    'Downloading data package 1 of 5... 100%',
    'Downloading data package 2 of 5... 100%',
    'Downloading data package 3 of 5... 45%... ERROR. Retrying...',
    'Downloading data package 3 of 5... 100%',
    'Downloading data package 4 of 5... 100%',
    'Downloading data package 5 of 5... 100%',
    'All packages received. Decompressing payload.bin...',
    'Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)',
    'System check: OK. CPU temperature: 58°C',
    'Scanning for vulnerabilities on port 443...',
    'Found 3 vulnerabilities. Attempting to patch...',
    'Patch successful. Session secured.',
    'Monitoring network traffic from 10.0.0.1...',
    'Injecting shellcode into PID 4123...',
    'Shellcode injected successfully.',
    'Cleaning up tracks...',
];

function generateFakeLog() {
    const timestamp = new Date().toISOString();
    const randomHex = [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const randomLine = fakeLogLines[Math.floor(Math.random() * fakeLogLines.length)];
    return `[${timestamp}] [${randomHex}] ${randomLine}`;
}
// --- End of Enhanced Log Generation ---

const commands = {
    help: 'Available commands: help, clear, ls, access <site_name>, exit',
    clear: () => {
        terminal.innerHTML = '';
    },
    ls: 'site1_iframe  site2_maps  site3_cpu  site4_custom',
    access: (args) => {
        if (!args[0]) {
            return 'Usage: access <site_name>';
        }
        const site = args[0];
        const validSites = ['site1_iframe', 'site2_maps', 'site3_cpu', 'site4_custom'];
        if (validSites.includes(site)) {
            let countdown = 3;
            const interval = setInterval(() => {
                if (countdown > 0) {
                    appendToTerminal(`Accessing ${site} in ${countdown}...`);
                }
                countdown--;
                if (countdown < 0) {
                    clearInterval(interval);
                    appendToTerminal(`Redirecting to ${site}...`);
                    sessionStorage.setItem('noAnimation', 'true'); // フラグを設定
                    // Go up one level from site5_hacker, then into the target site
                    window.location.href = `../${site}/index.html`;
                }
            }, 500);
            return `Initializing access to ${site}...`;
        } else {
            return `Error: Site "${site}" not found.`;
        }
    },
    exit: () => {
        appendToTerminal('Returning to portal...');
        setTimeout(() => {
            sessionStorage.setItem('noAnimation', 'true'); // フラグを設定
            window.location.href = '../index.html';
        }, 1000);
    }
};

function appendToTerminal(text) {
    terminal.innerHTML += text + '\n';
    window.scrollTo(0, document.body.scrollHeight);
}

commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const fullCommand = commandInput.value.trim();
        const [command, ...args] = fullCommand.split(' ');
        
        appendToTerminal(`> ${fullCommand}`);
        commandInput.value = '';

        if (commands[command]) {
            const result = typeof commands[command] === 'function' ? commands[command](args) : commands[command];
            if (result) {
                appendToTerminal(result);
            }
        } else if (fullCommand !== '') {
            // --- Log stream effect ---
            const randomLogCount = Math.floor(Math.random() * 15) + 8; // 8 to 22 lines of logs
            let count = 0;
            commandInput.disabled = true; // Disable input during log stream
            const interval = setInterval(() => {
                appendToTerminal(generateFakeLog());
                count++;
                if (count >= randomLogCount) {
                    clearInterval(interval);
                    commandInput.disabled = false; // Re-enable input
                    commandInput.focus();
                }
            }, 120); // 0.12 second interval
            // --- End of log stream effect ---
        }
    }
});

// Initial message
appendToTerminal('Hacker Simulator v1.0');
appendToTerminal('Type "help" to see available commands.');
appendToTerminal('');
commandInput.focus();

// --- Emergency Exit with 'Q' key ---
document.addEventListener('keydown', (event) => {
    // Check if the pressed key is 'q' or 'Q'
    // and ensure the user is not typing in an input field.
    if (event.key.toLowerCase() === 'q') {
        const targetTagName = event.target.tagName.toLowerCase();
                    if (targetTagName !== 'input' && targetTagName !== 'textarea') {
                        // Redirect to the home page.
                        sessionStorage.setItem('noAnimation', 'true'); // フラグを設定
                        window.location.href = '../../index.html';
                    }    }
});
