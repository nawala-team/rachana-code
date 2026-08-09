import type * as Monaco from 'monaco-editor';

// JS/TS completions
const jsCompletions = [
  { label: 'log', kind: 1, insertText: 'console.log($0);', insertTextRules: 4, detail: 'console.log' },
  { label: 'warn', kind: 1, insertText: 'console.warn($0);', insertTextRules: 4, detail: 'console.warn' },
  { label: 'error', kind: 1, insertText: 'console.error($0);', insertTextRules: 4, detail: 'console.error' },
  { label: 'table', kind: 1, insertText: 'console.table($0);', insertTextRules: 4, detail: 'console.table' },
  { label: 'const', kind: 14, insertText: 'const ${1:name} = $0;', insertTextRules: 4, detail: 'const' },
  { label: 'let', kind: 14, insertText: 'let ${1:name} = $0;', insertTextRules: 4, detail: 'let' },
  { label: 'if', kind: 14, insertText: 'if (${1}) {\n\t$0\n}', insertTextRules: 4, detail: 'if' },
  { label: 'ife', kind: 14, insertText: 'if (${1}) {\n\t$2\n} else {\n\t$0\n}', insertTextRules: 4, detail: 'if-else' },
  { label: 'ter', kind: 14, insertText: '${1} ? ${2} : ${3}', insertTextRules: 4, detail: 'ternary' },
  { label: 'switch', kind: 14, insertText: 'switch (${1}) {\n\tcase ${2}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}', insertTextRules: 4, detail: 'switch' },
  { label: 'for', kind: 14, insertText: 'for (let ${1:i} = 0; $1 < ${2}; $1++) {\n\t$0\n}', insertTextRules: 4, detail: 'for' },
  { label: 'forof', kind: 14, insertText: 'for (const ${1} of ${2}) {\n\t$0\n}', insertTextRules: 4, detail: 'for...of' },
  { label: 'forin', kind: 14, insertText: 'for (const ${1} in ${2}) {\n\t$0\n}', insertTextRules: 4, detail: 'for...in' },
  { label: 'foreach', kind: 14, insertText: '${1}.forEach((${2}) => {\n\t$0\n});', insertTextRules: 4, detail: 'forEach' },
  { label: 'while', kind: 14, insertText: 'while (${1}) {\n\t$0\n}', insertTextRules: 4, detail: 'while' },
  { label: 'fn', kind: 1, insertText: 'function ${1:name}(${2}) {\n\t$0\n}', insertTextRules: 4, detail: 'function' },
  { label: 'afn', kind: 1, insertText: 'async function ${1:name}(${2}) {\n\t$0\n}', insertTextRules: 4, detail: 'async fn' },
  { label: 'arrow', kind: 1, insertText: 'const ${1:name} = (${2}) => {\n\t$0\n};', insertTextRules: 4, detail: 'arrow' },
  { label: 'aarrow', kind: 1, insertText: 'const ${1:name} = async (${2}) => {\n\t$0\n};', insertTextRules: 4, detail: 'async arrow' },
  { label: 'class', kind: 4, insertText: 'class ${1:Name} {\n\tconstructor(${2}) {\n\t\t$0\n\t}\n}', insertTextRules: 4, detail: 'class' },
  { label: 'try', kind: 14, insertText: 'try {\n\t$0\n} catch (err) {\n\tconsole.error(err);\n}', insertTextRules: 4, detail: 'try-catch' },
  { label: 'throw', kind: 14, insertText: "throw new Error('${1}');", insertTextRules: 4, detail: 'throw' },
  { label: 'imp', kind: 14, insertText: "import ${1} from '${2}';", insertTextRules: 4, detail: 'import' },
  { label: 'imn', kind: 14, insertText: "import { ${1} } from '${2}';", insertTextRules: 4, detail: 'import named' },
  { label: 'exp', kind: 14, insertText: 'export { $0 };', insertTextRules: 4, detail: 'export' },
  { label: 'expd', kind: 14, insertText: 'export default $0;', insertTextRules: 4, detail: 'export default' },
  { label: 'prom', kind: 4, insertText: 'new Promise((resolve, reject) => {\n\t$0\n})', insertTextRules: 4, detail: 'Promise' },
  { label: 'then', kind: 1, insertText: '.then((${1}) => {\n\t$0\n})', insertTextRules: 4, detail: '.then' },
  { label: 'catch', kind: 1, insertText: '.catch((err) => {\n\t$0\n})', insertTextRules: 4, detail: '.catch' },
  { label: 'await', kind: 14, insertText: 'const ${1} = await ${0};', insertTextRules: 4, detail: 'await' },
  { label: 'map', kind: 1, insertText: '${1}.map((${2}) => $0)', insertTextRules: 4, detail: 'map' },
  { label: 'filter', kind: 1, insertText: '${1}.filter((${2}) => $0)', insertTextRules: 4, detail: 'filter' },
  { label: 'reduce', kind: 1, insertText: '${1}.reduce((acc, x) => acc, ${2})', insertTextRules: 4, detail: 'reduce' },
  { label: 'find', kind: 1, insertText: '${1}.find((${2}) => $0)', insertTextRules: 4, detail: 'find' },
  { label: 'timeout', kind: 1, insertText: 'setTimeout(() => {\n\t$0\n}, ${1:1000});', insertTextRules: 4, detail: 'setTimeout' },
  { label: 'fetch', kind: 1, insertText: "const res = await fetch('${1}');\nconst data = await res.json();", insertTextRules: 4, detail: 'fetch' },
  { label: 'qs', kind: 1, insertText: "document.querySelector('${1}')", insertTextRules: 4, detail: 'querySelector' },
  { label: 'ael', kind: 1, insertText: "${1}.addEventListener('${2}', (e) => {\n\t$0\n});", insertTextRules: 4, detail: 'addEventListener' },
  { label: 'jsonp', kind: 1, insertText: 'JSON.parse(${1})', insertTextRules: 4, detail: 'JSON.parse' },
  { label: 'jsons', kind: 1, insertText: 'JSON.stringify(${1})', insertTextRules: 4, detail: 'JSON.stringify' },
];

// TypeScript specific
const tsCompletions = [
  { label: 'interface', kind: 7, insertText: 'interface ${1:Name} {\n\t$0\n}', insertTextRules: 4, detail: 'interface' },
  { label: 'type', kind: 7, insertText: 'type ${1:Name} = $0;', insertTextRules: 4, detail: 'type' },
  { label: 'enum', kind: 7, insertText: 'enum ${1:Name} {\n\t$0\n}', insertTextRules: 4, detail: 'enum' },
  { label: 'generic', kind: 1, insertText: 'function ${1}<T>(${2}: T): T {\n\t$0\n}', insertTextRules: 4, detail: 'generic' },
  { label: 'readonly', kind: 14, insertText: 'readonly ${1}: ${2};', insertTextRules: 4, detail: 'readonly' },
  { label: 'partial', kind: 7, insertText: 'Partial<${1}>', insertTextRules: 4, detail: 'Partial<T>' },
  { label: 'required', kind: 7, insertText: 'Required<${1}>', insertTextRules: 4, detail: 'Required<T>' },
  { label: 'pick', kind: 7, insertText: "Pick<${1}, '${2}'>", insertTextRules: 4, detail: 'Pick<T,K>' },
  { label: 'omit', kind: 7, insertText: "Omit<${1}, '${2}'>", insertTextRules: 4, detail: 'Omit<T,K>' },
  { label: 'record', kind: 7, insertText: 'Record<${1:string}, ${2}>', insertTextRules: 4, detail: 'Record<K,V>' },
];

// React completions
const reactCompletions = [
  { label: 'useState', kind: 1, insertText: 'const [${1}, set${2}] = useState(${3});', insertTextRules: 4, detail: 'useState' },
  { label: 'useEffect', kind: 1, insertText: 'useEffect(() => {\n\t$0\n}, [${1}]);', insertTextRules: 4, detail: 'useEffect' },
  { label: 'useCallback', kind: 1, insertText: 'const ${1} = useCallback((${2}) => {\n\t$0\n}, [${3}]);', insertTextRules: 4, detail: 'useCallback' },
  { label: 'useMemo', kind: 1, insertText: 'const ${1} = useMemo(() => $0, [${2}]);', insertTextRules: 4, detail: 'useMemo' },
  { label: 'useRef', kind: 1, insertText: 'const ${1} = useRef(${2:null});', insertTextRules: 4, detail: 'useRef' },
  { label: 'useContext', kind: 1, insertText: 'const ${1} = useContext(${2});', insertTextRules: 4, detail: 'useContext' },
  { label: 'rfc', kind: 14, insertText: 'export default function ${1}() {\n\treturn (\n\t\t<div>$0</div>\n\t);\n}', insertTextRules: 4, detail: 'React FC' },
  { label: 'rafce', kind: 14, insertText: "const ${1} = () => {\n\treturn (\n\t\t<div>$0</div>\n\t);\n};\n\nexport default $1;", insertTextRules: 4, detail: 'Arrow FC' },
];

// Python completions
const pythonCompletions = [
  { label: 'def', kind: 1, insertText: 'def ${1:name}(${2}):\n\t${0:pass}', insertTextRules: 4, detail: 'function' },
  { label: 'adef', kind: 1, insertText: 'async def ${1:name}(${2}):\n\t${0:pass}', insertTextRules: 4, detail: 'async function' },
  { label: 'class', kind: 4, insertText: 'class ${1:Name}:\n\tdef __init__(self${2}):\n\t\t${0:pass}', insertTextRules: 4, detail: 'class' },
  { label: 'if', kind: 14, insertText: 'if ${1}:\n\t${0:pass}', insertTextRules: 4, detail: 'if' },
  { label: 'ife', kind: 14, insertText: 'if ${1}:\n\t$2\nelse:\n\t$0', insertTextRules: 4, detail: 'if-else' },
  { label: 'ifel', kind: 14, insertText: 'if ${1}:\n\t$2\nelif ${3}:\n\t$4\nelse:\n\t$0', insertTextRules: 4, detail: 'if-elif' },
  { label: 'for', kind: 14, insertText: 'for ${1:item} in ${2:items}:\n\t${0:pass}', insertTextRules: 4, detail: 'for' },
  { label: 'forr', kind: 14, insertText: 'for ${1:i} in range(${2}):\n\t${0:pass}', insertTextRules: 4, detail: 'for range' },
  { label: 'while', kind: 14, insertText: 'while ${1}:\n\t${0:pass}', insertTextRules: 4, detail: 'while' },
  { label: 'try', kind: 14, insertText: 'try:\n\t$1\nexcept ${2:Exception} as e:\n\t$0', insertTextRules: 4, detail: 'try-except' },
  { label: 'with', kind: 14, insertText: "with ${1:open('file')} as ${2:f}:\n\t$0", insertTextRules: 4, detail: 'with' },
  { label: 'main', kind: 14, insertText: "if __name__ == '__main__':\n\t$0", insertTextRules: 4, detail: 'main' },
  { label: 'lambda', kind: 1, insertText: 'lambda ${1:x}: $0', insertTextRules: 4, detail: 'lambda' },
  { label: 'listcomp', kind: 14, insertText: '[${1:x} for $1 in ${2:items}]', insertTextRules: 4, detail: 'list comp' },
  { label: 'print', kind: 1, insertText: 'print($0)', insertTextRules: 4, detail: 'print' },
  { label: 'printf', kind: 1, insertText: "print(f'${1}')", insertTextRules: 4, detail: 'print f-string' },
  { label: 'impf', kind: 14, insertText: 'from ${1} import ${2}', insertTextRules: 4, detail: 'from import' },
];

// Java completions
const javaCompletions = [
  { label: 'class', kind: 4, insertText: 'public class ${1:Name} {\n\t$0\n}', insertTextRules: 4, detail: 'class' },
  { label: 'main', kind: 1, insertText: 'public static void main(String[] args) {\n\t$0\n}', insertTextRules: 4, detail: 'main' },
  { label: 'sout', kind: 1, insertText: 'System.out.println($0);', insertTextRules: 4, detail: 'println' },
  { label: 'if', kind: 14, insertText: 'if (${1}) {\n\t$0\n}', insertTextRules: 4, detail: 'if' },
  { label: 'for', kind: 14, insertText: 'for (int ${1:i} = 0; $1 < ${2}; $1++) {\n\t$0\n}', insertTextRules: 4, detail: 'for' },
  { label: 'foreach', kind: 14, insertText: 'for (${1:Type} ${2:item} : ${3:items}) {\n\t$0\n}', insertTextRules: 4, detail: 'for-each' },
  { label: 'while', kind: 14, insertText: 'while (${1}) {\n\t$0\n}', insertTextRules: 4, detail: 'while' },
  { label: 'switch', kind: 14, insertText: 'switch (${1}) {\n\tcase ${2}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}', insertTextRules: 4, detail: 'switch' },
  { label: 'try', kind: 14, insertText: 'try {\n\t$1\n} catch (${2:Exception} e) {\n\t$0\n}', insertTextRules: 4, detail: 'try-catch' },
  { label: 'method', kind: 1, insertText: 'public ${1:void} ${2:name}(${3}) {\n\t$0\n}', insertTextRules: 4, detail: 'method' },
];

// Go completions
const goCompletions = [
  { label: 'pkg', kind: 14, insertText: 'package ${1:main}', insertTextRules: 4, detail: 'package' },
  { label: 'func', kind: 1, insertText: 'func ${1:name}(${2}) ${3} {\n\t$0\n}', insertTextRules: 4, detail: 'function' },
  { label: 'main', kind: 1, insertText: 'func main() {\n\t$0\n}', insertTextRules: 4, detail: 'main' },
  { label: 'if', kind: 14, insertText: 'if ${1} {\n\t$0\n}', insertTextRules: 4, detail: 'if' },
  { label: 'iferr', kind: 14, insertText: 'if err != nil {\n\treturn ${1:err}\n}', insertTextRules: 4, detail: 'if err' },
  { label: 'for', kind: 14, insertText: 'for ${1:i} := 0; $1 < ${2}; $1++ {\n\t$0\n}', insertTextRules: 4, detail: 'for' },
  { label: 'forr', kind: 14, insertText: 'for ${1:i}, ${2:v} := range ${3} {\n\t$0\n}', insertTextRules: 4, detail: 'for range' },
  { label: 'struct', kind: 4, insertText: 'type ${1:Name} struct {\n\t$0\n}', insertTextRules: 4, detail: 'struct' },
  { label: 'interface', kind: 7, insertText: 'type ${1:Name} interface {\n\t$0\n}', insertTextRules: 4, detail: 'interface' },
  { label: 'go', kind: 14, insertText: 'go func() {\n\t$0\n}()', insertTextRules: 4, detail: 'goroutine' },
  { label: 'print', kind: 1, insertText: 'fmt.Println($0)', insertTextRules: 4, detail: 'Println' },
];

// Rust completions
const rustCompletions = [
  { label: 'fn', kind: 1, insertText: 'fn ${1:name}(${2}) -> ${3:()} {\n\t$0\n}', insertTextRules: 4, detail: 'function' },
  { label: 'main', kind: 1, insertText: 'fn main() {\n\t$0\n}', insertTextRules: 4, detail: 'main' },
  { label: 'struct', kind: 4, insertText: 'struct ${1:Name} {\n\t$0\n}', insertTextRules: 4, detail: 'struct' },
  { label: 'enum', kind: 7, insertText: 'enum ${1:Name} {\n\t$0\n}', insertTextRules: 4, detail: 'enum' },
  { label: 'impl', kind: 4, insertText: 'impl ${1:Type} {\n\t$0\n}', insertTextRules: 4, detail: 'impl' },
  { label: 'if', kind: 14, insertText: 'if ${1} {\n\t$0\n}', insertTextRules: 4, detail: 'if' },
  { label: 'iflet', kind: 14, insertText: 'if let ${1:Some(x)} = ${2} {\n\t$0\n}', insertTextRules: 4, detail: 'if let' },
  { label: 'match', kind: 14, insertText: 'match ${1} {\n\t${2:pat} => $0,\n}', insertTextRules: 4, detail: 'match' },
  { label: 'for', kind: 14, insertText: 'for ${1:item} in ${2:iter} {\n\t$0\n}', insertTextRules: 4, detail: 'for' },
  { label: 'loop', kind: 14, insertText: 'loop {\n\t$0\n}', insertTextRules: 4, detail: 'loop' },
  { label: 'print', kind: 1, insertText: 'println!("$0");', insertTextRules: 4, detail: 'println!' },
  { label: 'vec', kind: 1, insertText: 'vec![$0]', insertTextRules: 4, detail: 'vec!' },
];

// C/C++ completions
const cppCompletions = [
  { label: 'main', kind: 1, insertText: 'int main() {\n\t$0\n\treturn 0;\n}', insertTextRules: 4, detail: 'main' },
  { label: 'inc', kind: 14, insertText: '#include <${1:iostream}>', insertTextRules: 4, detail: '#include' },
  { label: 'def', kind: 14, insertText: '#define ${1:NAME} ${2:value}', insertTextRules: 4, detail: '#define' },
  { label: 'if', kind: 14, insertText: 'if (${1}) {\n\t$0\n}', insertTextRules: 4, detail: 'if' },
  { label: 'for', kind: 14, insertText: 'for (int ${1:i} = 0; $1 < ${2}; $1++) {\n\t$0\n}', insertTextRules: 4, detail: 'for' },
  { label: 'while', kind: 14, insertText: 'while (${1}) {\n\t$0\n}', insertTextRules: 4, detail: 'while' },
  { label: 'switch', kind: 14, insertText: 'switch (${1}) {\n\tcase ${2}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}', insertTextRules: 4, detail: 'switch' },
  { label: 'func', kind: 1, insertText: '${1:void} ${2:name}(${3}) {\n\t$0\n}', insertTextRules: 4, detail: 'function' },
  { label: 'class', kind: 4, insertText: 'class ${1:Name} {\npublic:\n\t$1();\nprivate:\n\t$0\n};', insertTextRules: 4, detail: 'class' },
  { label: 'struct', kind: 4, insertText: 'struct ${1:Name} {\n\t$0\n};', insertTextRules: 4, detail: 'struct' },
  { label: 'cout', kind: 1, insertText: 'std::cout << $0 << std::endl;', insertTextRules: 4, detail: 'cout' },
  { label: 'printf', kind: 1, insertText: 'printf("${1}\\n"$0);', insertTextRules: 4, detail: 'printf' },
];

// HTML completions
const htmlCompletions = [
  { label: 'html5', kind: 14, insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>${1}</title>\n</head>\n<body>\n\t$0\n</body>\n</html>', insertTextRules: 4, detail: 'HTML5' },
  { label: 'div', kind: 14, insertText: '<div>$0</div>', insertTextRules: 4, detail: '<div>' },
  { label: 'span', kind: 14, insertText: '<span>$0</span>', insertTextRules: 4, detail: '<span>' },
  { label: 'a', kind: 14, insertText: '<a href="${1}">${2}</a>', insertTextRules: 4, detail: '<a>' },
  { label: 'img', kind: 14, insertText: '<img src="${1}" alt="${2}">', insertTextRules: 4, detail: '<img>' },
  { label: 'ul', kind: 14, insertText: '<ul>\n\t<li>$0</li>\n</ul>', insertTextRules: 4, detail: '<ul>' },
  { label: 'table', kind: 14, insertText: '<table>\n\t<tr>\n\t\t<td>$0</td>\n\t</tr>\n</table>', insertTextRules: 4, detail: '<table>' },
  { label: 'form', kind: 14, insertText: '<form action="${1}" method="post">\n\t$0\n</form>', insertTextRules: 4, detail: '<form>' },
  { label: 'input', kind: 14, insertText: '<input type="${1:text}" name="${2}">', insertTextRules: 4, detail: '<input>' },
  { label: 'button', kind: 14, insertText: '<button type="${1:button}">$0</button>', insertTextRules: 4, detail: '<button>' },
  { label: 'script', kind: 14, insertText: '<script>\n\t$0\n</script>', insertTextRules: 4, detail: '<script>' },
  { label: 'link', kind: 14, insertText: '<link rel="stylesheet" href="${1}">', insertTextRules: 4, detail: '<link>' },
];

// CSS completions
const cssCompletions = [
  { label: 'flex', kind: 14, insertText: 'display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};', insertTextRules: 4, detail: 'flexbox' },
  { label: 'grid', kind: 14, insertText: 'display: grid;\ngrid-template-columns: ${1:1fr 1fr};\ngap: ${2:1rem};', insertTextRules: 4, detail: 'grid' },
  { label: 'media', kind: 14, insertText: '@media (max-width: ${1:768px}) {\n\t$0\n}', insertTextRules: 4, detail: 'media query' },
  { label: 'keyframes', kind: 14, insertText: '@keyframes ${1:name} {\n\t0% { $2 }\n\t100% { $0 }\n}', insertTextRules: 4, detail: 'keyframes' },
  { label: 'trans', kind: 14, insertText: 'transition: ${1:all} ${2:0.3s} ${3:ease};', insertTextRules: 4, detail: 'transition' },
  { label: 'shadow', kind: 14, insertText: 'box-shadow: 0 ${1:2px} ${2:4px} rgba(0,0,0,0.1);', insertTextRules: 4, detail: 'box-shadow' },
  { label: 'gradient', kind: 14, insertText: 'background: linear-gradient(${1:to right}, ${2:#000}, ${3:#fff});', insertTextRules: 4, detail: 'gradient' },
  { label: 'var', kind: 14, insertText: 'var(--${1:name})', insertTextRules: 4, detail: 'CSS var' },
];


// SQL completions
const sqlCompletions = [
  { label: 'select', kind: 14, insertText: 'SELECT ${1:*} FROM ${2:table};', insertTextRules: 4, detail: 'SELECT' },
  { label: 'selectw', kind: 14, insertText: 'SELECT ${1:*} FROM ${2:table} WHERE ${3:condition};', insertTextRules: 4, detail: 'SELECT WHERE' },
  { label: 'insert', kind: 14, insertText: 'INSERT INTO ${1:table} (${2:cols}) VALUES (${3:vals});', insertTextRules: 4, detail: 'INSERT' },
  { label: 'update', kind: 14, insertText: 'UPDATE ${1:table} SET ${2:col} = ${3:val} WHERE ${4:condition};', insertTextRules: 4, detail: 'UPDATE' },
  { label: 'delete', kind: 14, insertText: 'DELETE FROM ${1:table} WHERE ${2:condition};', insertTextRules: 4, detail: 'DELETE' },
  { label: 'create', kind: 14, insertText: 'CREATE TABLE ${1:name} (\n\tid INT PRIMARY KEY,\n\t$0\n);', insertTextRules: 4, detail: 'CREATE TABLE' },
  { label: 'join', kind: 14, insertText: 'JOIN ${1:table} ON ${2:condition}', insertTextRules: 4, detail: 'JOIN' },
  { label: 'groupby', kind: 14, insertText: 'GROUP BY ${1:col}', insertTextRules: 4, detail: 'GROUP BY' },
  { label: 'orderby', kind: 14, insertText: 'ORDER BY ${1:col} ${2:ASC}', insertTextRules: 4, detail: 'ORDER BY' },
];

// Shell/Bash completions
const shellCompletions = [
  { label: 'shebang', kind: 14, insertText: '#!/bin/bash\n$0', insertTextRules: 4, detail: 'shebang' },
  { label: 'if', kind: 14, insertText: 'if [ ${1} ]; then\n\t$0\nfi', insertTextRules: 4, detail: 'if' },
  { label: 'ife', kind: 14, insertText: 'if [ ${1} ]; then\n\t$2\nelse\n\t$0\nfi', insertTextRules: 4, detail: 'if-else' },
  { label: 'for', kind: 14, insertText: 'for ${1:item} in ${2:items}; do\n\t$0\ndone', insertTextRules: 4, detail: 'for' },
  { label: 'while', kind: 14, insertText: 'while [ ${1} ]; do\n\t$0\ndone', insertTextRules: 4, detail: 'while' },
  { label: 'case', kind: 14, insertText: 'case ${1:var} in\n\t${2:pattern})\n\t\t$0\n\t\t;;\nesac', insertTextRules: 4, detail: 'case' },
  { label: 'func', kind: 1, insertText: '${1:name}() {\n\t$0\n}', insertTextRules: 4, detail: 'function' },
  { label: 'echo', kind: 1, insertText: 'echo "${1}"', insertTextRules: 4, detail: 'echo' },
  { label: 'read', kind: 1, insertText: 'read -p "${1:prompt}: " ${2:var}', insertTextRules: 4, detail: 'read' },
];

// Markdown completions
const markdownCompletions = [
  { label: 'h1', kind: 14, insertText: '# ${1:title}', insertTextRules: 4, detail: 'Heading 1' },
  { label: 'h2', kind: 14, insertText: '## ${1:title}', insertTextRules: 4, detail: 'Heading 2' },
  { label: 'h3', kind: 14, insertText: '### ${1:title}', insertTextRules: 4, detail: 'Heading 3' },
  { label: 'bold', kind: 14, insertText: '**${1:text}**', insertTextRules: 4, detail: 'Bold' },
  { label: 'italic', kind: 14, insertText: '*${1:text}*', insertTextRules: 4, detail: 'Italic' },
  { label: 'link', kind: 14, insertText: '[${1:text}](${2:url})', insertTextRules: 4, detail: 'Link' },
  { label: 'img', kind: 14, insertText: '![${1:alt}](${2:url})', insertTextRules: 4, detail: 'Image' },
  { label: 'code', kind: 14, insertText: '```${1:lang}\n$0\n```', insertTextRules: 4, detail: 'Code block' },
  { label: 'table', kind: 14, insertText: '| ${1:Header} | ${2:Header} |\n|---|---|\n| ${3} | ${4} |', insertTextRules: 4, detail: 'Table' },
];

// YAML/JSON completions
const yamlCompletions = [
  { label: 'key', kind: 14, insertText: '${1:key}: ${2:value}', insertTextRules: 4, detail: 'key-value' },
  { label: 'list', kind: 14, insertText: '${1:key}:\n  - ${2:item}', insertTextRules: 4, detail: 'list' },
  { label: 'obj', kind: 14, insertText: '${1:key}:\n  ${2:nested}: ${3:value}', insertTextRules: 4, detail: 'nested' },
];

const jsonCompletions = [
  { label: 'obj', kind: 14, insertText: '{\n\t"${1:key}": ${2:value}\n}', insertTextRules: 4, detail: 'object' },
  { label: 'arr', kind: 14, insertText: '[\n\t$0\n]', insertTextRules: 4, detail: 'array' },
  { label: 'kv', kind: 14, insertText: '"${1:key}": ${2:value}', insertTextRules: 4, detail: 'key-value' },
];


// Ruby completions
const rubyCompletions = [
  { label: 'def', kind: 1, insertText: 'def ${1:name}(${2})\n\t$0\nend', insertTextRules: 4, detail: 'method' },
  { label: 'class', kind: 4, insertText: 'class ${1:Name}\n\tdef initialize(${2})\n\t\t$0\n\tend\nend', insertTextRules: 4, detail: 'class' },
  { label: 'if', kind: 14, insertText: 'if ${1}\n\t$0\nend', insertTextRules: 4, detail: 'if' },
  { label: 'each', kind: 14, insertText: '${1}.each do |${2}|\n\t$0\nend', insertTextRules: 4, detail: 'each' },
  { label: 'puts', kind: 1, insertText: 'puts $0', insertTextRules: 4, detail: 'puts' },
];

// PHP completions
const phpCompletions = [
  { label: 'php', kind: 14, insertText: '<?php\n$0\n?>', insertTextRules: 4, detail: 'PHP tags' },
  { label: 'func', kind: 1, insertText: 'function ${1:name}(${2}) {\n\t$0\n}', insertTextRules: 4, detail: 'function' },
  { label: 'class', kind: 4, insertText: 'class ${1:Name} {\n\tpublic function __construct(${2}) {\n\t\t$0\n\t}\n}', insertTextRules: 4, detail: 'class' },
  { label: 'if', kind: 14, insertText: 'if (${1}) {\n\t$0\n}', insertTextRules: 4, detail: 'if' },
  { label: 'foreach', kind: 14, insertText: 'foreach (${1:array} as ${2:key} => ${3:value}) {\n\t$0\n}', insertTextRules: 4, detail: 'foreach' },
  { label: 'echo', kind: 1, insertText: 'echo $0;', insertTextRules: 4, detail: 'echo' },
];

// Language to completions mapping
const languageCompletions: Record<string, any[]> = {
  javascript: jsCompletions,
  typescript: [...jsCompletions, ...tsCompletions],
  typescriptreact: [...jsCompletions, ...tsCompletions, ...reactCompletions],
  javascriptreact: [...jsCompletions, ...reactCompletions],
  python: pythonCompletions,
  java: javaCompletions,
  go: goCompletions,
  rust: rustCompletions,
  cpp: cppCompletions,
  c: cppCompletions,
  ruby: rubyCompletions,
  php: phpCompletions,
  html: htmlCompletions,
  css: cssCompletions,
  scss: cssCompletions,
  less: cssCompletions,
  sql: sqlCompletions,
  mysql: sqlCompletions,
  pgsql: sqlCompletions,
  shellscript: shellCompletions,
  bash: shellCompletions,
  sh: shellCompletions,
  powershell: shellCompletions,
  markdown: markdownCompletions,
  yaml: yamlCompletions,
  json: jsonCompletions,
  jsonc: jsonCompletions,
};

export function registerAutoComplete(monaco: typeof Monaco) {
  const languages = Object.keys(languageCompletions);
  
  languages.forEach((lang) => {
    monaco.languages.registerCompletionItemProvider(lang, {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const completions = languageCompletions[lang] || [];
        const suggestions = completions.map((item: any) => ({
          ...item,
          range,
        }));

        return { suggestions };
      },
    });
  });
}

