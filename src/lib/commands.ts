import { CommandResult } from '@/types/terminal';
import { portfolioData } from './portfolio-data';

type CommandFunction = (args: string[], currentPath: string) => CommandResult;

export const commands: Record<string, CommandFunction> = {
  help: (): CommandResult => ({
    output: `[LOG] > help command executed
✅ Available commands:

📁 Portfolio Navigation:
  summary             - Professional summary and overview
  bio                 - Personal biography and background  
  skills              - Technical skills and expertise
  experience          - Work experience and achievements
  projects            - Featured projects and implementations
  education           - Educational background and courses
  certifications      - Professional certifications and training
  contact             - Contact information and availability

🔧 System Commands:
  ls                  - List directory contents
  cd [directory]      - Change directory
  pwd                 - Print working directory
  clear               - Clear terminal screen
  whoami              - Display current user
  date                - Show current date and time
  uname               - System information
  theme [name]        - Change terminal theme
  history             - Show command history

🎯 Package Manager Style:
  npm install <cmd>   - Install and execute commands (npm style)
  yarn <cmd>          - Execute commands (yarn style)
  pip install <cmd>   - Execute commands (python style)

💡 Tips:
  • Use Tab for command autocomplete
  • Use ↑/↓ arrows for command history
  • Use Ctrl+L to clear screen
  • Use Ctrl+B to toggle sidebar
  • Type any portfolio command to see content`,
    type: 'info'
  }),

  summary: (): CommandResult => ({
    output: portfolioData.summary,
    type: 'success'
  }),

  bio: (): CommandResult => ({
    output: portfolioData.bio,
    type: 'success'
  }),

  skills: (): CommandResult => ({
    output: portfolioData.skills,
    type: 'info'
  }),

  experience: (): CommandResult => ({
    output: portfolioData.experience,
    type: 'info'
  }),

  projects: (): CommandResult => ({
    output: portfolioData.projects,
    type: 'info'
  }),

  education: (): CommandResult => ({
    output: portfolioData.education,
    type: 'info'
  }),

  certifications: (): CommandResult => ({
    output: portfolioData.certifications,
    type: 'info'
  }),

  contact: (): CommandResult => ({
    output: portfolioData.contact,
    type: 'info'
  }),

  // Directory Navigation Commands
  ls: (args: string[], currentPath: string): CommandResult => {
    const directories = [
      'summary', 'bio', 'skills', 'experience', 'projects', 
      'education', 'certifications', 'contact'
    ];
    
    const files = ['README.md', 'package.json', '.gitignore'];
    
    let output = `[LOG] > ls command executed
✅ Directory contents:

📁 Directories:
${directories.map(dir => `  📂 ${dir}/`).join('\n')}

📄 Files:
${files.map(file => `  📄 ${file}`).join('\n')}

💡 Tip: Use 'cd <directory>' to navigate or click sidebar items`;

    return {
      output,
      type: 'info'
    };
  },

  cd: (args: string[]): CommandResult => {
    if (!args[0]) {
      return {
        output: `[LOG] > cd command executed
✅ Current directory: /portfolio`,
        type: 'info',
        path: 'portfolio'
      };
    }

    const validPaths = ['summary', 'bio', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact', '..', '/', 'portfolio'];
    
    if (args[0] === '..' || args[0] === '/') {
      return {
        output: `[LOG] > cd ${args[0]}
✅ Changed directory to: /portfolio`,
        type: 'success',
        path: 'portfolio'
      };
    }

    if (validPaths.includes(args[0])) {
      return {
        output: `[LOG] > cd ${args[0]}
✅ Changed directory to: /portfolio/${args[0]}`,
        type: 'success',
        path: args[0]
      };
    }

    return {
      output: `[LOG] > cd ${args[0]}
❌ Error: Directory '${args[0]}' not found
💡 Available directories: ${validPaths.slice(0, -3).join(', ')}`,
      type: 'error'
    };
  },

  pwd: (args: string[], currentPath: string): CommandResult => ({
    output: `[LOG] > pwd command executed
✅ Current directory: /portfolio/${currentPath}`,
    type: 'info'
  }),

  clear: (): CommandResult => ({
    output: '',
    type: 'clear'
  }),

  whoami: (): CommandResult => ({
    output: `[LOG] > whoami command executed
✅ Current user: manoj-hegde
👨‍💻 Full Stack MERN Developer
🏢 Company: Invenzo Labs, Bengaluru`,
    type: 'info'
  }),

  date: (): CommandResult => ({
    output: `[LOG] > date command executed
✅ Current date and time: ${new Date().toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata'
    })} IST`,
    type: 'info'
  }),

  uname: (): CommandResult => ({
    output: `[LOG] > uname command executed
✅ System Information:
🖥️  Portfolio Terminal v2.1.0
⚡ Built with: Next.js 15, TypeScript, Tailwind CSS
🎨 Framework: React 18 with Framer Motion
💻 Runtime: Node.js with Turbo
🌐 Deployed on: Vercel Platform`,
    type: 'info'
  }),

  history: (): CommandResult => ({
    output: `[LOG] > history command executed
✅ Command history feature active
💡 Use ↑/↓ arrow keys to navigate through previous commands
🔧 Recent commands are automatically saved during session`,
    type: 'info'
  }),

  // Theme Commands
  theme: (args: string[]): CommandResult => {
    const availableThemes = ['vscode', 'cyberpunk', 'retro', 'classic'];
    if (args[0]) {
      if (availableThemes.includes(args[0])) {
        return {
          output: `[LOG] > theme ${args[0]}
✅ Theme changed to: ${args[0]}
🎨 Available themes: ${availableThemes.join(', ')}`,
          type: 'success'
        };
      } else {
        return {
          output: `[LOG] > theme ${args[0]}
❌ Unknown theme: ${args[0]}
🎨 Available themes: ${availableThemes.join(', ')}`,
          type: 'error'
        };
      }
    }
    return {
      output: `[LOG] > theme command executed
🎨 Available themes:
${availableThemes.map(t => `  • ${t}`).join('\n')}

💡 Usage: theme <name>
⚡ Quick switch: Ctrl+Shift+T`,
      type: 'info'
    };
  },

  // Package Manager Style Commands
  npm: (args: string[]): CommandResult => {
    if (args[0] === 'install' && args[1]) {
      const command = args[1];
      if (commands[command]) {
        return {
          output: `[LOG] > npm install ${command}
📦 Installing ${command}@latest...
✅ Successfully installed ${command}

${commands[command]([], '').output}`,
          type: 'success'
        };
      }
      return {
        output: `[LOG] > npm install ${command}
❌ Package '${command}' not found
📦 Available packages: summary, bio, skills, experience, projects, education, certifications, contact`,
        type: 'error'
      };
    }
    return {
      output: `[LOG] > npm command executed
📦 NPM Portfolio Manager v8.19.0

Usage: npm install <package>
Available packages:
• summary - Professional overview
• bio - Personal background  
• skills - Technical expertise
• experience - Work history
• projects - Featured work
• education - Academic background
• certifications - Professional training
• contact - Get in touch`,
      type: 'info'
    };
  },

  yarn: (args: string[]): CommandResult => {
    if (args[0] && commands[args[0]]) {
      return {
        output: `[LOG] > yarn ${args[0]}
🧶 yarn ${args[0]} v1.22.19
✨ Done in 0.84s

${commands[args[0]]([], '').output}`,
        type: 'success'
      };
    }
    return {
      output: `[LOG] > yarn command executed  
🧶 Yarn Portfolio Manager v1.22.19

Usage: yarn <command>
Available commands: bio, summary, skills, experience, projects, education, certifications, contact

⚡ Fast, reliable, and secure dependency management for portfolio content`,
      type: 'info'
    };
  },

  pip: (args: string[]): CommandResult => {
    if (args[0] === 'install' && args[1]) {
      const command = args[1];
      if (commands[command]) {
        return {
          output: `[LOG] > pip install ${command}
🐍 Collecting ${command}...
📦 Installing collected packages: ${command}
✅ Successfully installed ${command}

${commands[command]([], '').output}`,
          type: 'success'
        };
      }
      return {
        output: `[LOG] > pip install ${command}
❌ No matching distribution found for ${command}
🐍 Available packages: skills, projects, experience, education`,
        type: 'error'
      };
    }
    return {
      output: `[LOG] > pip command executed
🐍 pip 23.2.1 from Portfolio PyPI

Usage: pip install <package>
Available packages for portfolio data:
• skills - Technical stack and expertise
• projects - Development portfolio  
• experience - Professional background
• education - Academic qualifications`,
      type: 'info'
    };
  },

  // Fun/Easter Egg Commands
  matrix: (args: string[]): CommandResult => {
    if (args[0] === 'rain') {
      return {
        output: `[LOG] > matrix rain
✅ Matrix rain effect activated!
🌧️  Digital rain falling... Watch the magic happen!
💊 Remember: There is no spoon`,
        type: 'success'
      };
    }
    return {
      output: `[LOG] > matrix command executed
🔮 Matrix Portfolio System v1.0
💊 Commands:
  • matrix rain - Activate digital rain effect
  
"Welcome to the real world" - Morpheus`,
      type: 'info'
    };
  },

  about: (): CommandResult => ({
    output: `[LOG] > about command executed
✅ Portfolio Terminal Information:

👨‍💻 Developer: Manoj Hegde
🏢 Company: Invenzo Labs, Bengaluru  
📧 Contact: manojhegde2001@gmail.com
🎓 Education: B.Tech Computer Science
💼 Role: Full Stack MERN Developer

🚀 This interactive terminal portfolio showcases:
• Professional experience and skills
• Featured projects and achievements  
• Technical expertise and certifications
• Contact information and availability

Built with ❤️ using Next.js, TypeScript, and modern web technologies`,
    type: 'success'
  }),

  readme: (): CommandResult => ({
    output: `[LOG] > readme command executed
✅ Portfolio README:

# Manoj Hegde - Interactive Terminal Portfolio

## Quick Start
• Type 'help' to see all available commands
• Use sidebar navigation for quick access
• Try package manager style: 'npm install skills'
• Use Ctrl+B to toggle sidebar

## Featured Sections  
• summary - Professional overview
• skills - Technical expertise
• experience - Work history at Invenzo Labs
• projects - Featured developments
• education - Academic background
• contact - Get in touch

## Technologies Used
Next.js 15, TypeScript, Tailwind CSS, Framer Motion

Made with 💻 by Manoj Hegde`,
    type: 'info'
  })
};
