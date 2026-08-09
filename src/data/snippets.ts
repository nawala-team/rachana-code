import type * as Monaco from 'monaco-editor';

export interface Snippet {
  prefix: string;
  label: string;
  body: string[];
  description: string;
}

export interface LanguageSnippets {
  [language: string]: Snippet[];
}

// Common snippets shared across languages
const commonSnippets: Snippet[] = [
  { prefix: 'log', label: 'console.log', body: ['console.log($1);'], description: 'Log output to console' },
  { prefix: 'logv', label: 'console.log with variable', body: ["console.log('$1:', $1);"], description: 'Log variable with label' },
  { prefix: 'warn', label: 'console.warn', body: ['console.warn($1);'], description: 'Log warning to console' },
  { prefix: 'error', label: 'console.error', body: ['console.error($1);'], description: 'Log error to console' },
  { prefix: 'try', label: 'try-catch', body: ['try {', '\t$1', '} catch (error) {', '\tconsole.error(error);', '}'], description: 'Try-catch block' },
  { prefix: 'tryf', label: 'try-catch-finally', body: ['try {', '\t$1', '} catch (error) {', '\tconsole.error(error);', '} finally {', '\t$2', '}'], description: 'Try-catch-finally block' },
  { prefix: 'if', label: 'if statement', body: ['if ($1) {', '\t$2', '}'], description: 'If statement' },
  { prefix: 'ife', label: 'if-else statement', body: ['if ($1) {', '\t$2', '} else {', '\t$3', '}'], description: 'If-else statement' },
  { prefix: 'switch', label: 'switch statement', body: ['switch ($1) {', '\tcase $2:', '\t\t$3', '\t\tbreak;', '\tdefault:', '\t\t$4', '}'], description: 'Switch statement' },
  { prefix: 'forloop', label: 'for loop', body: ['for (let i = 0; i < $1; i++) {', '\t$2', '}'], description: 'For loop' },
  { prefix: 'forof', label: 'for...of loop', body: ['for (const $1 of $2) {', '\t$3', '}'], description: 'For-of loop' },
  { prefix: 'forin', label: 'for...in loop', body: ['for (const $1 in $2) {', '\t$3', '}'], description: 'For-in loop' },
  { prefix: 'while', label: 'while loop', body: ['while ($1) {', '\t$2', '}'], description: 'While loop' },
  { prefix: 'dowhile', label: 'do-while loop', body: ['do {', '\t$1', '} while ($2);'], description: 'Do-while loop' },
  { prefix: 'map', label: 'array map', body: ['$1.map(($2) => {', '\treturn $3;', '})'], description: 'Array map method' },
  { prefix: 'filter', label: 'array filter', body: ['$1.filter(($2) => $3)'], description: 'Array filter method' },
  { prefix: 'reduce', label: 'array reduce', body: ['$1.reduce((acc, $2) => {', '\treturn acc + $3;', '}, $4)'], description: 'Array reduce method' },
  { prefix: 'find', label: 'array find', body: ['$1.find(($2) => $3)'], description: 'Array find method' },
  { prefix: 'foreach', label: 'array forEach', body: ['$1.forEach(($2) => {', '\t$3', '})'], description: 'Array forEach method' },
  { prefix: 'timeout', label: 'setTimeout', body: ['setTimeout(() => {', '\t$2', '}, $1);'], description: 'setTimeout function' },
  { prefix: 'interval', label: 'setInterval', body: ['setInterval(() => {', '\t$2', '}, $1);'], description: 'setInterval function' },
  { prefix: 'promise', label: 'new Promise', body: ['new Promise((resolve, reject) => {', '\t$1', '})'], description: 'Create new Promise' },
];

// JavaScript specific snippets
const javascriptSnippets: Snippet[] = [
  ...commonSnippets,
  { prefix: 'func', label: 'function', body: ['function $1($2) {', '\t$3', '}'], description: 'Function declaration' },
  { prefix: 'afunc', label: 'async function', body: ['async function $1($2) {', '\t$3', '}'], description: 'Async function declaration' },
  { prefix: 'arrow', label: 'arrow function', body: ['const $1 = ($2) => {', '\t$3', '};'], description: 'Arrow function' },
  { prefix: 'aarrow', label: 'async arrow function', body: ['const $1 = async ($2) => {', '\t$3', '};'], description: 'Async arrow function' },
  { prefix: 'class', label: 'class', body: ['class $1 {', '\tconstructor($2) {', '\t\t$3', '\t}', '}'], description: 'Class declaration' },
  { prefix: 'classext', label: 'class extends', body: ['class $1 extends $2 {', '\tconstructor($3) {', '\t\tsuper($4);', '\t\t$5', '\t}', '}'], description: 'Class with inheritance' },
  { prefix: 'iife', label: 'IIFE', body: ['(function() {', '\t$1', '})();'], description: 'Immediately invoked function expression' },
  { prefix: 'imp', label: 'import', body: ["import $1 from '$2';"], description: 'Import module' },
  { prefix: 'impd', label: 'import destructured', body: ["import { $1 } from '$2';"], description: 'Import with destructuring' },
  { prefix: 'exp', label: 'export', body: ['export $1;'], description: 'Export statement' },
  { prefix: 'expd', label: 'export default', body: ['export default $1;'], description: 'Export default' },
  { prefix: 'expf', label: 'export function', body: ['export function $1($2) {', '\t$3', '}'], description: 'Export function' },
  { prefix: 'fetch', label: 'fetch request', body: ["fetch('$1')", '\t.then((response) => response.json())', '\t.then((data) => {', '\t\t$2', '\t})', '\t.catch((error) => console.error(error));'], description: 'Fetch API request' },
  { prefix: 'destobj', label: 'destructure object', body: ['const { $1 } = $2;'], description: 'Object destructuring' },
  { prefix: 'destarr', label: 'destructure array', body: ['const [$1] = $2;'], description: 'Array destructuring' },
];

// TypeScript specific snippets
const typescriptSnippets: Snippet[] = [
  ...javascriptSnippets,
  { prefix: 'interface', label: 'interface', body: ['interface $1 {', '\t$2: $3;', '}'], description: 'Interface declaration' },
  { prefix: 'type', label: 'type alias', body: ['type $1 = $2;'], description: 'Type alias' },
  { prefix: 'typeobj', label: 'type object', body: ['type $1 = {', '\t$2: $3;', '};'], description: 'Type object declaration' },
  { prefix: 'enum', label: 'enum', body: ['enum $1 {', '\t$2,', '}'], description: 'Enum declaration' },
  { prefix: 'tfunc', label: 'typed function', body: ['function $1($2: $3): $4 {', '\t$5', '}'], description: 'Typed function declaration' },
  { prefix: 'tarrow', label: 'typed arrow function', body: ['const $1 = ($2: $3): $4 => {', '\t$5', '};'], description: 'Typed arrow function' },
  { prefix: 'generic', label: 'generic function', body: ['function $1<T>($2: T): T {', '\treturn $3;', '}'], description: 'Generic function' },
  { prefix: 'readonly', label: 'readonly property', body: ['readonly $1: $2;'], description: 'Readonly property' },
  { prefix: 'partial', label: 'Partial type', body: ['Partial<$1>'], description: 'Partial utility type' },
  { prefix: 'pick', label: 'Pick type', body: ["Pick<$1, '$2'>"], description: 'Pick utility type' },
  { prefix: 'omit', label: 'Omit type', body: ["Omit<$1, '$2'>"], description: 'Omit utility type' },
  { prefix: 'record', label: 'Record type', body: ['Record<$1, $2>'], description: 'Record utility type' },
];

// React specific snippets
const reactSnippets: Snippet[] = [
  ...typescriptSnippets,
  { prefix: 'usestate', label: 'useState hook', body: ['const [$1, set$2] = useState<$3>($4);'], description: 'React useState hook' },
  { prefix: 'useeffect', label: 'useEffect hook', body: ['useEffect(() => {', '\t$1', '', '\treturn () => {', '\t\t$2', '\t};', '}, [$3]);'], description: 'React useEffect hook' },
  { prefix: 'useeffectsimple', label: 'useEffect simple', body: ['useEffect(() => {', '\t$1', '}, [$2]);'], description: 'React useEffect without cleanup' },
  { prefix: 'usememo', label: 'useMemo hook', body: ['const $1 = useMemo(() => {', '\treturn $2;', '}, [$3]);'], description: 'React useMemo hook' },
  { prefix: 'usecallback', label: 'useCallback hook', body: ['const $1 = useCallback(($2) => {', '\t$3', '}, [$4]);'], description: 'React useCallback hook' },
  { prefix: 'useref', label: 'useRef hook', body: ['const $1 = useRef<$2>($3);'], description: 'React useRef hook' },
  { prefix: 'usecontext', label: 'useContext hook', body: ['const $1 = useContext($2);'], description: 'React useContext hook' },
  { prefix: 'usereducer', label: 'useReducer hook', body: ['const [$1, dispatch] = useReducer($2, $3);'], description: 'React useReducer hook' },
  { prefix: 'rfc', label: 'React functional component', body: ['interface $1Props {', '\t$2', '}', '', 'export default function $1({ $3 }: $1Props) {', '\treturn (', '\t\t<div>', '\t\t\t$4', '\t\t</div>', '\t);', '}'], description: 'React functional component with props' },
  { prefix: 'rfcs', label: 'React functional component simple', body: ['export default function $1() {', '\treturn (', '\t\t<div>', '\t\t\t$2', '\t\t</div>', '\t);', '}'], description: 'Simple React functional component' },
  { prefix: 'handler', label: 'event handler', body: ['const handle$1 = ($2: $3) => {', '\t$4', '};'], description: 'Event handler function' },
  { prefix: 'onclick', label: 'onClick handler', body: ['onClick={() => $1}'], description: 'onClick event handler' },
  { prefix: 'onchange', label: 'onChange handler', body: ['onChange={(e) => $1(e.target.value)}'], description: 'onChange event handler' },
  { prefix: 'onsubmit', label: 'onSubmit handler', body: ['onSubmit={(e) => {', '\te.preventDefault();', '\t$1', '}}'], description: 'onSubmit event handler' },
  { prefix: 'maprender', label: 'map to render', body: ['{$1.map(($2) => (', '\t<$3 key={$4}>$5</$3>', '))}'], description: 'Map array to JSX elements' },
  { prefix: 'cond', label: 'conditional render', body: ['{$1 && (', '\t$2', ')}'], description: 'Conditional rendering' },
  { prefix: 'fragment', label: 'React fragment', body: ['<>', '\t$1', '</>'], description: 'React fragment shorthand' },
  { prefix: 'impreact', label: 'import React', body: ["import { $1 } from 'react';"], description: 'Import from React' },
];

// Python specific snippets
const pythonSnippets: Snippet[] = [
  { prefix: 'print', label: 'print', body: ['print($1)'], description: 'Print statement' },
  { prefix: 'printf', label: 'print f-string', body: ["print(f'$1')"], description: 'Print with f-string' },
  { prefix: 'def', label: 'function', body: ['def $1($2):', '\t$3'], description: 'Function definition' },
  { prefix: 'adef', label: 'async function', body: ['async def $1($2):', '\t$3'], description: 'Async function definition' },
  { prefix: 'deft', label: 'typed function', body: ['def $1($2: $3) -> $4:', '\t$5'], description: 'Typed function definition' },
  { prefix: 'class', label: 'class', body: ['class $1:', '\tdef __init__(self$2):', '\t\t$3'], description: 'Class definition' },
  { prefix: 'classi', label: 'class with inheritance', body: ['class $1($2):', '\tdef __init__(self$3):', '\t\tsuper().__init__($4)', '\t\t$5'], description: 'Class with inheritance' },
  { prefix: 'dataclass', label: 'dataclass', body: ['@dataclass', 'class $1:', '\t$2: $3'], description: 'Dataclass definition' },
  { prefix: 'if', label: 'if statement', body: ['if $1:', '\t$2'], description: 'If statement' },
  { prefix: 'ife', label: 'if-else', body: ['if $1:', '\t$2', 'else:', '\t$3'], description: 'If-else statement' },
  { prefix: 'for', label: 'for loop', body: ['for $1 in $2:', '\t$3'], description: 'For loop' },
  { prefix: 'fori', label: 'for loop with range', body: ['for i in range($1):', '\t$2'], description: 'For loop with range' },
  { prefix: 'while', label: 'while loop', body: ['while $1:', '\t$2'], description: 'While loop' },
  { prefix: 'try', label: 'try-except', body: ['try:', '\t$1', 'except Exception as e:', '\tprint(e)'], description: 'Try-except block' },
  { prefix: 'tryf', label: 'try-except-finally', body: ['try:', '\t$1', 'except Exception as e:', '\tprint(e)', 'finally:', '\t$2'], description: 'Try-except-finally block' },
  { prefix: 'with', label: 'with statement', body: ['with $1 as $2:', '\t$3'], description: 'With statement' },
  { prefix: 'lambda', label: 'lambda', body: ['lambda $1: $2'], description: 'Lambda function' },
  { prefix: 'listcomp', label: 'list comprehension', body: ['[$1 for $2 in $3]'], description: 'List comprehension' },
  { prefix: 'dictcomp', label: 'dict comprehension', body: ['{$1: $2 for $3 in $4}'], description: 'Dictionary comprehension' },
  { prefix: 'imp', label: 'import', body: ['import $1'], description: 'Import module' },
  { prefix: 'impf', label: 'from import', body: ['from $1 import $2'], description: 'From import' },
  { prefix: 'main', label: 'main block', body: ["if __name__ == '__main__':", '\t$1'], description: 'Main entry point' },
  { prefix: 'decorator', label: 'decorator', body: ['def $1(func):', '\tdef wrapper(*args, **kwargs):', '\t\t$2', '\t\treturn func(*args, **kwargs)', '\treturn wrapper'], description: 'Decorator function' },
];

// Language to snippets mapping
export const snippetsByLanguage: LanguageSnippets = {
  javascript: javascriptSnippets,
  typescript: typescriptSnippets,
  typescriptreact: reactSnippets,
  javascriptreact: reactSnippets,
  python: pythonSnippets,
};

// Get language IDs that support snippets
export const supportedLanguages = Object.keys(snippetsByLanguage);

// Convert snippet body array to Monaco insert text with proper formatting
function convertSnippetBody(body: string[]): string {
  return body.join('\n');
}

// Register snippets with Monaco editor
export function registerSnippets(monaco: typeof Monaco): void {
  supportedLanguages.forEach((language) => {
    const snippets = snippetsByLanguage[language];
    
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions: Monaco.languages.CompletionItem[] = snippets.map((snippet) => ({
          label: snippet.prefix,
          kind: monaco.languages.CompletionItemKind.Snippet,
          documentation: snippet.description,
          insertText: convertSnippetBody(snippet.body),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: snippet.label,
          range,
        }));

        return { suggestions };
      },
    });
  });
}

export default snippetsByLanguage;
