// Matrix Portfolio Main Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Matrix Portfolio Loaded');
    // Ensure canvas is properly sized before initialization
    const canvas = document.getElementById('matrix-rain');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    initializeMatrix();
    initializeTerminal();
});

// Matrix Rain Effect
function initializeMatrix() {
    console.log('Initializing Matrix Rain Effect');
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) {
        console.error('Matrix rain canvas not found');
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('2D context not available for matrix rain');
        return;
    }
    console.log('Canvas context obtained successfully');
    // Matrix rain characters and setup
    const latinChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%".repeat(3); // Repeat to increase probability
    const japaneseChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const sanskritChars = "ॐ॒॑॓॔क़ख़ग़ज़ड़ढ़फ़य़ॠॡ॰ॱॲॳॴॵॶॷॸॹॺॻॼॽॾॿअआइईउऊऋऌऍऎएऐऑऒओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह";
    // Combine with weighted distribution (latin chars ~65%)
    const matrix = latinChars + japaneseChars + sanskritChars;
    const characters = matrix.split("");
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];
    const glitchProbability = 0.2; // 20% chance for glitch effects
    // Initialize drops
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
    // Drawing the characters
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
    }
    setInterval(draw, 65);
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

Type 'cat projects/<number>' for details`, //Example cat projects/1
//     'projects/1': `GitHub Projects:
// - Data Science Portfolio (Python)
// - Machine Learning Models (Scikit-learn)
// - Deep Learning Architectures (TensorFlow, PyTorch)
// - Data Visualization Dashboards (Plotly, Matplotlib)
// - Web Scraping Tools (BeautifulSoup, Scrapy)
// - Data Analysis Pipeline (Pandas, NumPy)
// - Security Scanner (Python, Go)
// - Neural Network Framework (PyTorch)
// - Automated Trading Bot (Python)`,
//     'projects/2': `Kaggle Competitions:
// - Titanic: Machine Learning from Disaster   
// - House Prices: Advanced Regression
// - Natural Language Processing`,
//     'projects/3': `CTF Writeups:
//     - HackTheBox Challenges
//     - CTFtime Competition Solutions
//     - Custom Security Tools`,
//     'projects/4': `Security Tools:
//     - Network Vulnerability Scanner
//     - Password Strength Analyzer
//     - Web Application Firewall
//     - Intrusion Detection System`,
//     //

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
function initializeTerminal() {
    console.log('Initializing Terminal');
    const loginContainer = document.getElementById('login-container');
    const terminalContent = document.getElementById('terminal-content');
    const loginTyped = document.getElementById('login-typed');
    const asciiArt = loginContainer?.querySelector('.ascii-art');
    const terminalHeader = document.querySelector('.terminal-header');

    if (!loginContainer || !terminalContent || !loginTyped || !terminalHeader) {
        console.error('Terminal elements not found:', {
            loginContainer: !!loginContainer,
            terminalContent: !!terminalContent,
            loginTyped: !!loginTyped,
            terminalHeader: !!terminalHeader
        });
        return;
    }

    console.log('All terminal elements found, proceeding with initialization');
    
    // Set initial states
    terminalHeader.style.display = 'flex';
    terminalHeader.style.opacity = '1';
    
    if (asciiArt) {
        asciiArt.style.display = 'none';
        asciiArt.style.opacity = '0';
    }
    
    terminalContent.style.display = 'none';
    terminalContent.style.opacity = '0';
    
    loginContainer.style.display = 'block';
    loginContainer.style.opacity = '0';

    // Start the login sequence
    setTimeout(() => {
        console.log('Starting login sequence');
        loginContainer.style.opacity = '1';
        loginTyped.textContent = '';
        
        // Start typing effect
        const text = "anmol";
        let charIndex = 0;

        function typeCharacter() {
            if (charIndex < text.length) {
                loginTyped.textContent += text[charIndex];
                charIndex++;
                setTimeout(typeCharacter, 150);
            } else {
                console.log('Login typing complete');
                // Show enter message after typing
                setTimeout(() => {
                    const msg = document.createElement('div');
                    msg.id = 'login-message';
                    msg.textContent = '[Press Enter to continue]';
                    loginContainer.appendChild(msg);
                    msg.style.opacity = '0';
                    setTimeout(() => msg.style.opacity = '1', 300);
                }, 500);
            }
        }

        // Start typing after a brief delay
        setTimeout(typeCharacter, 1000);
    }, 500);
}

// Handle Enter key press
document.addEventListener('keypress', function onEnterPress(e) {
    const loginContainer = document.getElementById('login-container');
    const terminalContent = document.getElementById('terminal-content');
    const asciiArt = loginContainer?.querySelector('.ascii-art');

    if (e.key === 'Enter' && loginContainer && loginContainer.style.display !== 'none') {
        console.log('Enter pressed during login');
        document.removeEventListener('keypress', onEnterPress);
        
        // Show ASCII art
        if (asciiArt) {
            console.log('Showing ASCII art');
            asciiArt.style.display = 'block';
            setTimeout(() => {
                asciiArt.style.opacity = '1';
                
                // Wait for ASCII art to be visible
                setTimeout(() => {
                    console.log('Transitioning to terminal');
                    // Transition to terminal
                    loginContainer.style.opacity = '0';
                    setTimeout(() => {
                        loginContainer.style.display = 'none';
                        terminalContent.style.display = 'block';
                        setTimeout(() => {
                            terminalContent.style.opacity = '1';
                            startSequentialDisplay();
                        }, 50);
                    }, 1000);
                }, 1500);
            }, 500);
        }
    }
});

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
