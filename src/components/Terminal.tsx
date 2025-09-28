'use client';

import { useState, useEffect, useRef, KeyboardEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { commands } from '@/lib/commands';
import { CommandOutput } from '@/types/terminal';
import { useHotkeys } from 'react-hotkeys-hook';

type ThemeType = 'vscode' | 'cyberpunk' | 'retro' | 'classic';

interface SidebarItem {
  id: string;
  name: string;
  icon: string;
  command: string;
  isFolder?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { id: 'summary', name: 'Summary', icon: '📄', command: 'summary' },
  { id: 'skills', name: 'Skills', icon: '🛠️', command: 'skills' },
  { id: 'experience', name: 'Experience', icon: '💼', command: 'experience' },
  { id: 'projects', name: 'Projects', icon: '🚀', command: 'projects', isFolder: true },
  { id: 'certifications', name: 'Certifications', icon: '🏅', command: 'certifications' },
  { id: 'contributions', name: 'Contributions', icon: '🌟', command: 'contributions' },
  { id: 'publications', name: 'Publications', icon: '📚', command: 'publications' },
  { id: 'education', name: 'Education', icon: '🎓', command: 'education' },
  { id: 'contact', name: 'Contact', icon: '📞', command: 'contact' },
  { id: 'clear', name: 'Clear', icon: '🧹', command: 'clear' }
];

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

function TypewriterText({ text, speed = 30, onComplete, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length && !isComplete) {
      const char = text[currentIndex];
      const delay = char === '\n' ? 100 : speed + Math.random() * 20;
      
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + char);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (!isComplete && currentIndex >= text.length) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  return (
    <div className={`typewriter-output ${className}`}>
      <span dangerouslySetInnerHTML={{ __html: displayText }} />
      {!isComplete && <span className="typewriter-cursor">|</span>}
    </div>
  );
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<CommandOutput[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('portfolio');
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('vscode');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [commandCount, setCommandCount] = useState(0);
  const [activeItem, setActiveItem] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(-1);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hotkeys
  useHotkeys('ctrl+shift+c', () => {
    setOutput([]);
    setCurrentTypingIndex(-1);
  });
  useHotkeys('ctrl+shift+t', () => cycleTheme());
  useHotkeys('ctrl+b', () => setSidebarCollapsed(!sidebarCollapsed));
  useHotkeys('ctrl+`', () => inputRef.current?.focus());

  const cycleTheme = useCallback(() => {
    const themes: ThemeType[] = ['vscode', 'cyberpunk', 'retro', 'classic'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme]);

  const playSound = useCallback((frequency: number, duration: number = 0.1) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silent fail
    }
  }, []);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setIsLoaded(true);
      const welcomeTimeout = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
      return () => clearTimeout(welcomeTimeout);
    }, 1500);

    return () => clearTimeout(loadTimeout);
  }, []);

  useEffect(() => {
    if (inputRef.current && isLoaded) {
      inputRef.current.focus();
    }
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, isLoaded]);

  const executeCommand = useCallback(async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    playSound(1200, 0.1);
    setCommandCount(prev => prev + 1);
    setHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
    setIsTyping(true);

    const [baseCmd, ...args] = trimmedCmd.split(' ');
    const commandKey = baseCmd.toLowerCase();

    // Handle special commands
    if (commandKey === 'theme') {
      if (args[0] && ['vscode', 'cyberpunk', 'retro', 'classic'].includes(args[0])) {
        setTheme(args[0] as ThemeType);
      } else {
        cycleTheme();
      }
      const newOutput: CommandOutput = {
        command: trimmedCmd,
        result: `Theme changed to: ${theme}`,
        timestamp: new Date(),
        type: 'success'
      };
      setOutput(prev => [...prev, newOutput]);
      setCurrentTypingIndex(output.length);
      return;
    }

    const newOutput: CommandOutput = {
      command: trimmedCmd,
      result: '',
      timestamp: new Date(),
      type: 'command'
    };

    if (commands[commandKey]) {
      const result = commands[commandKey](args, currentPath);
      if (result.type === 'clear') {
        setOutput([]);
        setCurrentTypingIndex(-1);
        setIsTyping(false);
        return;
      }
      if (result.path) {
        setCurrentPath(result.path);
      }
      newOutput.result = result.output;
      newOutput.type = result.type;
      
      playSound(result.type === 'error' ? 400 : 1000, 0.15);
    } else {
      newOutput.result = `Command '${baseCmd}' not found. Type 'help' for available commands.`;
      newOutput.type = 'error';
      playSound(400, 0.2);
    }

    setOutput(prev => {
      const newOutputArray = [...prev, newOutput];
      setCurrentTypingIndex(newOutputArray.length - 1);
      return newOutputArray;
    });
  }, [currentPath, theme, playSound, cycleTheme, output.length]);

  const handleSidebarClick = useCallback((item: SidebarItem) => {
    setActiveItem(item.id);
    playSound(800, 0.05);
    
    if (item.command === 'clear') {
      setOutput([]);
      setCurrentTypingIndex(-1);
    } else {
      executeCommand(item.command);
    }
  }, [executeCommand, playSound]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (isTyping) return;

    switch (e.key) {
      case 'Enter':
        if (input.trim()) {
          executeCommand(input);
          setInput('');
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (history.length > 0) {
          const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= history.length) {
            setHistoryIndex(-1);
            setInput('');
          } else {
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
          }
        }
        break;
      case 'Tab':
        e.preventDefault();
        const availableCommands = Object.keys(commands);
        const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
        if (matches.length === 1) {
          setInput(matches[0]);
          playSound(600, 0.05);
        }
        break;
      default:
        if (e.key.length === 1) {
          playSound(800, 0.03);
        }
    }
  }, [input, history, historyIndex, isTyping, executeCommand, playSound]);

  const formatOutput = (item: CommandOutput, index: number) => {
    const getOutputClass = () => {
      switch (item.type) {
        case 'success': return 'output-success';
        case 'error': return 'output-error';
        case 'warning': return 'output-warning';
        case 'info': return 'output-info';
        default: return '';
      }
    };

    // Show typewriter animation for the current output
    if (index === currentTypingIndex) {
      return (
        <TypewriterText
          key={`typing-${index}`}
          text={item.result}
          speed={10}
          className={getOutputClass()}
          onComplete={() => {
            setIsTyping(false);
            setCurrentTypingIndex(-1);
          }}
        />
      );
    }

    // Show completed output instantly for previous items
    return (
      <motion.div
        key={`static-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`command-output ${getOutputClass()}`}
        dangerouslySetInnerHTML={{ __html: item.result }}
      />
    );
  };

  if (!isLoaded) {
    return (
      <div className={`terminal-container theme-${theme}`}>
        <div className="terminal-header">
          <div className="terminal-title">
            <div className="traffic-lights">
              <div className="traffic-light close" />
              <div className="traffic-light minimize" />
              <div className="traffic-light maximize" />
            </div>
            <span>Portfolio Terminal</span>
          </div>
          <div className="terminal-controls">
            <span>Loading...</span>
          </div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner" />
          <div className="loading-text">
            <TypewriterText text="Initializing Manoj Hegde's portfolio terminal..." speed={30} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`terminal-container theme-${theme}`}>
      {/* Header */}
      <div className="terminal-header">
        <div className="terminal-title">
          <div className="traffic-lights">
            <div className="traffic-light close" onClick={() => window.close?.()} />
            <div className="traffic-light minimize" />
            <div className="traffic-light maximize" />
          </div>
          <span>Manoj Hegde - Portfolio Terminal</span>
        </div>
        <div className="terminal-controls">
          <button className="control-button" onClick={cycleTheme}>
            {theme}
          </button>
          <span>Commands: {commandCount}</span>
          <span>projects</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="editor-container">
        {/* Sidebar - File Explorer */}
        <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <span className="sidebar-title">EXPLORER</span>
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? '▶' : '◀'}
            </button>
          </div>
          
          <div className="file-explorer">
            {sidebarItems.map((item) => (
              <motion.div
                key={item.id}
                className={`file-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleSidebarClick(item)}
                whileHover={{ backgroundColor: 'var(--vscode-bg-lighter)' }}
                whileTap={{ scale: 0.98 }}
                title={item.name} // Tooltip for collapsed state
              >
                <span className="file-icon">{item.icon}</span>
                {!sidebarCollapsed && (
                  <span className="file-name">{item.name}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Terminal Area */}
        <div className="terminal-area">
          {/* Welcome Message */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="welcome-message"
              >
                <TypewriterText
                  text="[LOG] > Welcome to Manoj Hegde's Portfolio Terminal! Type 'help' to begin. ✅"
                  speed={30}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Terminal Content */}
          <div ref={terminalRef} className="terminal-content">
            {/* Output History */}
            <div className="terminal-output">
              {output.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.01 }}
                  className="output-block"
                >
                  {item.command && (
                    <div className="command-history">
                      <span className="command-prompt">➜</span>
                      <span className="command-path">~/{currentPath}</span>
                      <span className="command-separator">$</span>
                      <span className="command-executed">{item.command}</span>
                      <span className="command-timestamp">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                  {item.result && formatOutput(item, index)}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fixed Bottom Input */}
          <div className="terminal-input-container">
            <div className="command-line">
              <span className="command-prompt">➜</span>
              <span className="command-path">~/{currentPath}</span>
              <span className="command-separator">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="command-input"
                disabled={isTyping}
                autoFocus
                spellCheck={false}
                placeholder={isTyping ? "Processing..." : "Type a command (e.g., 'help')..."}
              />
              <div className="terminal-cursor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
