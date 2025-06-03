// Matrix Portfolio Main Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Matrix Portfolio Loaded');
    // Ensure canvas is properly sized before initialization
    const canvas = document.getElementById('matrix-rain');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    // Initialize matrix first and wait for it to be ready
    initializeMatrix().then(() => {
        console.log('Matrix rain initialized, starting terminal');
        initializeTerminal();
    });
});

// Matrix Rain Effect
function initializeMatrix() {
    console.log('Initializing Matrix Rain Effect');
    return new Promise((resolve) => {
        const canvas = document.getElementById('matrix-rain');
        if (!canvas) {
            console.error('Matrix rain canvas not found');
            resolve();
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('2D context not available for matrix rain');
            resolve();
            return;
        }
        console.log('Canvas context obtained successfully');
        // Matrix rain characters and setup
        const latinChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%".repeat(3);
        const japaneseChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
        const sanskritChars = "ॐ॒॑॓॔क़ख़ग़ज़ड़ढ़फ़य़ॠॡ॰ॱॲॳॴॵॶॷॸॹॺॻॼॽॾॿअआइईउऊऋऌऍऎएऐऑऒओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह";
        const matrix = latinChars + japaneseChars + sanskritChars;
        const characters = matrix.split("");
        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = [];
        const glitchProbability = 0.2;

        function resetDrops() {
            columns = Math.floor(canvas.width / fontSize);
            drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
        }

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            resetDrops();
        }

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        let frameCount = 0;
        const requiredFrames = 30; // Wait for 30 frames before considering the effect ready

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < drops.length; i++) {
                const shouldGlitch = Math.random() < glitchProbability;
                const text = characters[Math.floor(Math.random() * characters.length)];
                if (shouldGlitch) {
                    ctx.fillStyle = '#FFF';
                    ctx.font = (fontSize + 2) + 'px monospace';
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    const offset = Math.random() * 4 - 2;
                    ctx.fillStyle = '#0F0';
                    ctx.font = fontSize + 'px monospace';
                    ctx.fillText(text, i * fontSize + offset, drops[i] * fontSize);
                } else {
                    ctx.fillStyle = '#0F0';
                    ctx.font = fontSize + 'px monospace';
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                }
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }

            frameCount++;
            if (frameCount === requiredFrames) {
                console.log('Matrix rain effect ready');
                resolve();
            }
            requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw);
    });
}

// Terminal Commands
window.commands = {
    'help': () => `Available commands:
- help     : Show this help message
- whoami   : Display information about me
- skills   : List my technical skills
- projects : View my projects
- contact  : Show contact information
- clear    : Clear the terminal
- matrix   : Toggle matrix animation
- ls       : List available sections
- cat      : Read file contents`,

    'whoami': () => `Anmol Sharma — Data Scientist, Security Enthusiast, Crazy Hacker`,
    
    'skills': () => `[Data Science] Python, Machine Learning, Deep Learning, Data Visualization, Statistical Analysis, Neural Networks, NLP
[Security] Cybersecurity, Ethical Hacking, Penetration Testing, Network Security, Security Analysis
[Tools & Technologies] Linux, Git, Docker, AWS, Cloud Computing, Database Systems`,

    'projects': () => `[1] GitHub Projects
[2] Kaggle Competitions
[3] CTF Writeups
[4] Security Tools

Type 'cat projects/<number>' for details`, 

    'contact': () => `Email: anmol.sharma@example.com
LinkedIn: https://linkedin.com/in/yourusername
Twitter: @yourusername
GitHub: https://github.com/yourusername`,

    'clear': () => {
        const content = document.getElementById('terminal-content');
        const terminalLines = content.getElementsByClassName('terminal-line');
        const terminalOutputs = content.getElementsByClassName('terminal-output');
        
        Array.from(terminalLines).forEach(line => {
            if (!line.classList.contains('terminal-input-line')) {
                line.remove();
            }
        });
        
        Array.from(terminalOutputs).forEach(output => output.remove());
        return '';
    },

    'matrix': () => {
        const matrixCanvas = document.getElementById('matrix-rain');
        matrixCanvas.style.opacity = matrixCanvas.style.opacity === '0' ? '0.8' : '0';
        return 'Matrix rain effect toggled';
    },

    'ls': () => `Sections:
/about
/skills
/projects
/contact`,

    'cat': (arg) => {
        if (!arg) return 'Usage: cat <filename>';
        
        const files = {
            'projects/1': `GitHub Projects:
- Data Analysis Pipeline (Python)
- Security Scanner (Go)
- Neural Network Framework (PyTorch)
- Automated Trading Bot (Python)`,

            'projects/2': `Kaggle Competitions:
- Titanic: Machine Learning from Disaster
- House Prices: Advanced Regression
- Natural Language Processing`,

            'projects/3': `CTF Writeups:
- HackTheBox Challenges
- CTFtime Competition Solutions
- Custom Security Tools`,

            'projects/4': `Security Tools:
- Network Vulnerability Scanner
- Password Strength Analyzer
- Web Application Firewall
- Intrusion Detection System`
        };

        return files[arg] || `File not found: ${arg}`;
    }
};

// Sequential display functionality
function startSequentialDisplay() {
    const asciiArt = document.querySelector('.ascii-art');
    const terminalLines = Array.from(document.querySelectorAll('#terminal-content > .terminal-line:not(.terminal-input-line)'));
    const terminalOutputs = Array.from(document.querySelectorAll('#terminal-content > .terminal-output'));

    let delay = 1000;
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            if (terminalOutputs[index]) {
                setTimeout(() => {
                    terminalOutputs[index].style.opacity = '1';
                }, 300);
            }
        }, delay);
        delay += 800;
    });

    // Finally, show the input line
    setTimeout(() => {
        const inputLine = document.querySelector('.terminal-input-line');
        if (inputLine) {
            inputLine.style.opacity = '1';
            const terminalInput = document.getElementById('terminal-input');
            if (terminalInput) {
                terminalInput.focus();
            }
        }
    }, delay);
}

function waitForEnter() {
    console.log('Waiting for Enter key...');
    return new Promise((resolve) => {
        const handler = (e) => {
            if (e.key === 'Enter') {
                console.log('Enter key pressed');
                document.removeEventListener('keypress', handler);
                resolve();
            }
        };
        document.addEventListener('keypress', handler);
    });
}

function typeText(element, text, speed = 100) {
    console.log('Typing text:', text);
    return new Promise((resolve) => {
        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed);
            } else {
                console.log('Finished typing:', text);
                resolve();
            }
        };
        type();
    });
}

function showEnterPrompt(container, text) {
    const prompt = document.createElement('div');
    prompt.className = 'enter-prompt';
    prompt.textContent = text;
    container.appendChild(prompt);
    prompt.style.opacity = '1';
    return prompt;
}

function initializeTerminal() {
    console.log('Initializing terminal...');
    const loginContainer = document.getElementById('login-container');
    const loginTyped = document.getElementById('login-typed');
    const asciiArt = document.querySelector('.ascii-art');
    const terminalContent = document.getElementById('terminal-content');
    
    if (!loginContainer || !loginTyped || !asciiArt || !terminalContent) {
        console.error('Required elements not found:', {
            loginContainer: !!loginContainer,
            loginTyped: !!loginTyped,
            asciiArt: !!asciiArt,
            terminalContent: !!terminalContent
        });
        return;
    }

    console.log('All terminal elements found, starting login sequence');
    
    // Show login container
    loginContainer.style.opacity = '1';
    loginContainer.style.display = 'flex';
    
    // Start login sequence immediately
    startLoginSequence();
}

async function startLoginSequence() {
    console.log('Starting login sequence...');
    const loginContainer = document.getElementById('login-container');
    const loginTyped = document.getElementById('login-typed');
    const asciiArt = document.querySelector('.ascii-art');
    const terminalContent = document.getElementById('terminal-content');
    
    try {
        // Step 1: Username
        console.log('Step 1: Username');
        await typeText(loginTyped, 'anmol');
        const enterPrompt1 = showEnterPrompt(loginContainer, 'Press Enter to continue...');
        await waitForEnter();
        enterPrompt1.style.opacity = '0';
        
        // Step 2: Password
        console.log('Step 2: Password');
        loginTyped.textContent = '';
        const passwordPrompt = document.createElement('div');
        passwordPrompt.className = 'terminal-line login-prompt';
        passwordPrompt.innerHTML = '<span class="prompt">Password:</span><span class="typed" id="password-typed"></span><span class="cursor">█</span>';
        loginContainer.appendChild(passwordPrompt);
        
        const passwordTyped = document.getElementById('password-typed');
        await typeText(passwordTyped, '********');
        const enterPrompt2 = showEnterPrompt(loginContainer, 'Press Enter to continue...');
        await waitForEnter();
        enterPrompt2.style.opacity = '0';
        
        // Step 3: ASCII Art
        console.log('Step 3: ASCII Art');
        asciiArt.style.display = 'block';
        asciiArt.style.opacity = '1';
        const enterPrompt3 = showEnterPrompt(loginContainer, 'Press Enter to access system...');
        await waitForEnter();
        enterPrompt3.style.opacity = '0';
        
        // Step 4: Show Terminal
        console.log('Step 4: Show Terminal');
        loginContainer.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 500));
        loginContainer.style.display = 'none';
        terminalContent.style.opacity = '1';
        
        // Show terminal lines
        const terminalLines = document.querySelectorAll('.terminal-line, .terminal-output');
        for (const line of terminalLines) {
            line.style.opacity = '1';
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Show input line
        const inputLine = document.querySelector('.terminal-input-line');
        inputLine.style.opacity = '1';
        document.getElementById('terminal-input').focus();
        
    } catch (error) {
        console.error('Error in login sequence:', error);
    }
}

// Handle terminal commands
document.addEventListener('DOMContentLoaded', function() {
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
        terminalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const fullCommand = this.value.trim();
                if (!fullCommand) return;
                
                const [cmd, ...args] = fullCommand.split(' ');
                
                const cmdLine = document.createElement('div');
                cmdLine.className = 'terminal-line';
                cmdLine.style.opacity = '1';
                cmdLine.innerHTML = `<span class="prompt">$</span> ${fullCommand}`;
                
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-output';
                outputLine.style.opacity = '1';
                
                const cmdLower = cmd.toLowerCase();
                const output = window.commands[cmdLower] 
                    ? window.commands[cmdLower](args.join(' '))
                    : `Command not found: ${cmd}. Type 'help' for available commands.`;
                
                outputLine.innerHTML = output
                    .split('\n')
                    .map(line => line.trim())
                    .join('<br>');
                
                const terminal = document.getElementById('terminal-content');
                const inputLine = this.parentElement;
                terminal.insertBefore(cmdLine, inputLine);
                terminal.insertBefore(outputLine, inputLine);
                
                this.value = '';
                inputLine.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
