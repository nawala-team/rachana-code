import type * as Monaco from 'monaco-editor';

export interface CodeIssue {
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'hint';
  rule: string;
  category: 'bug' | 'vulnerability' | 'code_smell' | 'security' | 'performance';
  suggestion?: string;
}

interface Rule {
  id: string;
  category: CodeIssue['category'];
  severity: CodeIssue['severity'];
  languages: string[];
  pattern: RegExp;
  message: string;
  suggestion?: string;
}

const rules: Rule[] = [
  { id: 'no-console', category: 'code_smell', severity: 'warning',
    languages: ['javascript', 'typescript', 'typescriptreact', 'javascriptreact'],
    pattern: /console\.(log|warn|error|info|debug)\s*\(/g,
    message: 'Remove console statement before production.', suggestion: 'Use proper logging' },
  { id: 'no-debugger', category: 'bug', severity: 'error',
    languages: ['javascript', 'typescript', 'typescriptreact', 'javascriptreact'],
    pattern: /\bdebugger\b/g, message: 'Remove debugger statement.' },
  { id: 'no-alert', category: 'code_smell', severity: 'warning',
    languages: ['javascript', 'typescript', 'typescriptreact', 'javascriptreact'],
    pattern: /\b(alert|confirm|prompt)\s*\(/g,
    message: 'Avoid browser dialogs.', suggestion: 'Use modal component' },
  { id: 'no-var', category: 'code_smell', severity: 'warning',
    languages: ['javascript', 'typescript', 'typescriptreact', 'javascriptreact'],
    pattern: /\bvar\s+\w+/g, message: 'Use let/const instead of var.' },
  { id: 'no-any', category: 'code_smell', severity: 'warning',
    languages: ['typescript', 'typescriptreact'],
    pattern: /:\s*any\b/g, message: 'Avoid "any" type.', suggestion: 'Use specific types' },
  { id: 'no-eval', category: 'security', severity: 'error',
    languages: ['javascript', 'typescript', 'typescriptreact', 'javascriptreact'],
    pattern: /\beval\s*\(/g, message: 'eval() is dangerous.', suggestion: 'Use JSON.parse()' },
  { id: 'no-innerhtml', category: 'security', severity: 'warning',
    languages: ['javascript', 'typescript', 'typescriptreact', 'javascriptreact'],
    pattern: /\.innerHTML\s*=/g, message: 'innerHTML can lead to XSS.', suggestion: 'Use textContent' },
  { id: 'react-index-key', category: 'code_smell', severity: 'warning',
    languages: ['typescriptreact', 'javascriptreact'],
    pattern: /key\s*=\s*\{[^}]*index[^}]*\}/g, message: 'Avoid array index as key.' },
  { id: 'py-bare-except', category: 'bug', severity: 'warning',
    languages: ['python'], pattern: /except\s*:/g, message: 'Avoid bare except.' },
  { id: 'py-print', category: 'code_smell', severity: 'info',
    languages: ['python'], pattern: /\bprint\s*\(/g, message: 'Consider using logging.' },
];

export function analyzeCode(code: string, language: string): CodeIssue[] {
  const issues: CodeIssue[] = [];
  const lines = code.split('\n');
  const applicableRules = rules.filter(rule => rule.languages.includes(language));
  
  for (const rule of applicableRules) {
    rule.pattern.lastIndex = 0;
    let match;
    while ((match = rule.pattern.exec(code)) !== null) {
      const beforeMatch = code.substring(0, match.index);
      const lineNumber = (beforeMatch.match(/\n/g) || []).length + 1;
      const lastNewline = beforeMatch.lastIndexOf('\n');
      const column = match.index - lastNewline;
      issues.push({
        line: lineNumber, column, endLine: lineNumber, endColumn: column + match[0].length,
        message: rule.message, severity: rule.severity, rule: rule.id,
        category: rule.category, suggestion: rule.suggestion
      });
    }
  }
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const todoMatch = line.match(/\/\/\s*(TODO|FIXME|HACK):/i);
    if (todoMatch) {
      issues.push({ line: lineNum, column: todoMatch.index || 0, endLine: lineNum, endColumn: line.length,
        message: `${todoMatch[1].toUpperCase()} found.`, severity: 'info', rule: 'todo-comment', category: 'code_smell' });
    }
  });
  return issues;
}

export function issuesToMarkers(issues: CodeIssue[]): Monaco.editor.IMarkerData[] {
  return issues.map(issue => ({
    startLineNumber: issue.line, startColumn: issue.column,
    endLineNumber: issue.endLine, endColumn: issue.endColumn,
    message: `[${issue.rule}] ${issue.message}${issue.suggestion ? ` 💡 ${issue.suggestion}` : ''}`,
    severity: issue.severity === 'error' ? 8 : issue.severity === 'warning' ? 4 : 2,
    source: 'Rachana Lint',
  }));
}

export function getIssueStats(issues: CodeIssue[]) {
  return {
    errors: issues.filter(i => i.severity === 'error').length,
    warnings: issues.filter(i => i.severity === 'warning').length,
    info: issues.filter(i => i.severity === 'info').length,
  };
}
