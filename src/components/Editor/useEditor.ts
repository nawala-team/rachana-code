import { useState, useCallback, useRef } from 'react';
import { TextBuffer } from './TextBuffer';

export interface CursorPosition {
  line: number;
  column: number;
}

export interface Selection {
  start: CursorPosition;
  end: CursorPosition;
}

export interface EditorState {
  content: string;
  cursor: CursorPosition;
  selection: Selection | null;
  lineCount: number;
  canUndo: boolean;
  canRedo: boolean;
}

export function useEditor(initialContent: string = '') {
  const bufferRef = useRef(new TextBuffer(initialContent));
  const [content, setContent] = useState(initialContent);
  const [cursor, setCursor] = useState<CursorPosition>({ line: 0, column: 0 });
  const [selection, setSelection] = useState<Selection | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateState = useCallback(() => {
    const buffer = bufferRef.current;
    setContent(buffer.getContent());
    setCanUndo(buffer.canUndo());
    setCanRedo(buffer.canRedo());
  }, []);

  const handleChange = useCallback((newContent: string) => {
    bufferRef.current.setContent(newContent);
    updateState();
  }, [updateState]);

  const undo = useCallback(() => {
    if (bufferRef.current.undo()) {
      updateState();
    }
  }, [updateState]);

  const redo = useCallback(() => {
    if (bufferRef.current.redo()) {
      updateState();
    }
  }, [updateState]);

  const moveCursor = useCallback((line: number, column: number) => {
    const lineCount = bufferRef.current.getLineCount();
    const clampedLine = Math.max(0, Math.min(line, lineCount - 1));
    const lineContent = bufferRef.current.getLine(clampedLine) || '';
    const clampedColumn = Math.max(0, Math.min(column, lineContent.length));
    setCursor({ line: clampedLine, column: clampedColumn });
  }, []);

  const setSelectionRange = useCallback((start: CursorPosition, end: CursorPosition) => {
    setSelection({ start, end });
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  const getSelectedText = useCallback((): string => {
    if (!selection) return '';
    const buffer = bufferRef.current;
    return buffer.getContent().split('\n').slice(
      selection.start.line,
      selection.end.line + 1
    ).join('\n');
  }, [selection]);

  return {
    content,
    cursor,
    selection,
    lineCount: bufferRef.current.getLineCount(),
    canUndo,
    canRedo,
    handleChange,
    undo,
    redo,
    moveCursor,
    setSelectionRange,
    clearSelection,
    getSelectedText,
  };
}

export default useEditor;
