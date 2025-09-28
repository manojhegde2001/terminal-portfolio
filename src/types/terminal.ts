export interface CommandOutput {
    command: string;
    result: string;
    timestamp: Date;
    type: 'success' | 'error' | 'info' | 'warning' | 'command' | 'clear';
  }
  
  export interface CommandResult {
    output: string;
    type: 'success' | 'error' | 'info' | 'warning' | 'clear';
    path?: string;
  }
  