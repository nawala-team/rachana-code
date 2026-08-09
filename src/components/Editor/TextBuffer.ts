/**
 * TextBuffer - Manages text content for the editor
 */
export class TextBuffer {
  private lines: string[];
  private undoStack: string[][];
  private redoStack: string[][];
  private maxUndoSize = 100;

  constructor(initialContent: string = '') {
    this.lines = initialContent.split('\n');
    this.undoStack = [];
    this.redoStack = [];
  }

  getContent(): string {
    return this.lines.join('\n');
  }

  setContent(content: string): void {
    this.saveUndo();
    this.lines = content.split('\n');
    this.redoStack = [];
  }

  getLine(lineNumber: number): string | undefined {
    return this.lines[lineNumber];
  }

  getLineCount(): number {
    return this.lines.length;
  }

  insertText(line: number, col: number, text: string): void {
    this.saveUndo();
    const currentLine = this.lines[line] || '';
    const before = currentLine.slice(0, col);
    const after = currentLine.slice(col);
    
    const newLines = text.split('\n');
    if (newLines.length === 1) {
      this.lines[line] = before + text + after;
    } else {
      this.lines[line] = before + newLines[0];
      for (let i = 1; i < newLines.length - 1; i++) {
        this.lines.splice(line + i, 0, newLines[i]);
      }
      this.lines.splice(line + newLines.length - 1, 0, newLines[newLines.length - 1] + after);
    }
    this.redoStack = [];
  }

  deleteRange(startLine: number, startCol: number, endLine: number, endCol: number): string {
    this.saveUndo();
    
    if (startLine === endLine) {
      const line = this.lines[startLine] || '';
      const deleted = line.slice(startCol, endCol);
      this.lines[startLine] = line.slice(0, startCol) + line.slice(endCol);
      return deleted;
    }

    const firstLine = this.lines[startLine] || '';
    const lastLine = this.lines[endLine] || '';
    const deleted = [
      firstLine.slice(startCol),
      ...this.lines.slice(startLine + 1, endLine),
      lastLine.slice(0, endCol)
    ].join('\n');

    this.lines[startLine] = firstLine.slice(0, startCol) + lastLine.slice(endCol);
    this.lines.splice(startLine + 1, endLine - startLine);
    this.redoStack = [];

    return deleted;
  }

  private saveUndo(): void {
    this.undoStack.push([...this.lines]);
    if (this.undoStack.length > this.maxUndoSize) {
      this.undoStack.shift();
    }
  }

  undo(): boolean {
    const state = this.undoStack.pop();
    if (state) {
      this.redoStack.push([...this.lines]);
      this.lines = state;
      return true;
    }
    return false;
  }

  redo(): boolean {
    const state = this.redoStack.pop();
    if (state) {
      this.undoStack.push([...this.lines]);
      this.lines = state;
      return true;
    }
    return false;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}

export default TextBuffer;
