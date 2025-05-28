console.log('Matrix Portfolio Loaded');

// Matrix Rain Effect
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Matrix rain characters and setup
const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const characters = matrix.split("");
const fontSize = 14;
const columns = canvas.width/fontSize;
const drops = [];

// Initialize drops
for(let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Drawing the characters
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    
    for(let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;
        
        drops[i]++;
    }
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

    // Show ASCII art first
    asciiArt.style.display = 'block';
    setTimeout(() => {
        asciiArt.style.opacity = '1';
        
        // After ASCII art, show each line and its output sequentially
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
    }, 500);
}

// Initialize terminal functionality
function initializeTerminal() {
    const loginContainer = document.getElementById('login-container');
    const terminalContent = document.getElementById('terminal-content');
    const loginTyped = document.getElementById('login-typed');
    const asciiArt = loginContainer.querySelector('.ascii-art');

    if (!loginContainer || !terminalContent || !loginTyped) {
        console.error('Terminal elements not found');
        return;
    }

    // Ensure proper initial state
    loginContainer.style.display = 'block';
    loginContainer.style.opacity = '1';
    terminalContent.style.display = 'none';
    terminalContent.style.opacity = '0';
    
    // Clear any previous state
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
            // After typing completes, show ASCII art
            setTimeout(() => {
                asciiArt.style.display = 'block';
                setTimeout(() => {
                    asciiArt.style.opacity = '1';
                    // After ASCII art, show enter message
                    setTimeout(() => {
                        const msg = document.createElement('div');
                        msg.id = 'login-message';
                        msg.textContent = '[Press Enter to continue]';
                        loginContainer.appendChild(msg);
                        setTimeout(() => msg.style.opacity = '1', 300);
                    }, 800);
                }, 50);
            }, 500);
        }
    }

    // Start typing after a brief delay
    setTimeout(typeCharacter, 1000);

    // Handle Enter key press
    document.addEventListener('keypress', function onEnterPress(e) {
        if (e.key === 'Enter' && loginContainer.style.display !== 'none') {
            document.removeEventListener('keypress', onEnterPress);
            
            // Hide login container
            loginContainer.style.opacity = '0';
            setTimeout(() => {
                loginContainer.style.display = 'none';
                
                // Show terminal content
                terminalContent.style.display = 'block';
                setTimeout(() => {
                    terminalContent.style.opacity = '1';
                    startSequentialDisplay();
                }, 50);
            }, 500);
        }
    });

    // Handle terminal commands
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
                const output = commands[cmdLower] 
                    ? commands[cmdLower](args.join(' '))
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
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Start matrix animation
    setCanvasSize();
    setInterval(draw, 35);
    
    // Initialize terminal with typing effect
    initializeTerminal();
});
