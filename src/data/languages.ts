// All Monaco Editor supported languages
export const languages = [
  'abap', 'apex', 'azcli', 'bat', 'bicep', 'c', 'cameligo', 'clojure', 'coffeescript',
  'cpp', 'csharp', 'csp', 'css', 'cypher', 'dart', 'dockerfile', 'ecl', 'elixir',
  'flow9', 'freemarker2', 'fsharp', 'go', 'graphql', 'handlebars', 'hcl', 'html',
  'ini', 'java', 'javascript', 'json', 'julia', 'kotlin', 'less', 'lexon', 'liquid',
  'lua', 'm3', 'markdown', 'mdx', 'mips', 'msdax', 'mysql', 'objective-c', 'pascal',
  'pascaligo', 'perl', 'pgsql', 'php', 'pla', 'plaintext', 'postiats', 'powerquery',
  'powershell', 'protobuf', 'pug', 'python', 'qsharp', 'r', 'razor', 'redis', 'redshift',
  'restructuredtext', 'ruby', 'rust', 'sb', 'scala', 'scheme', 'scss', 'shell', 'sol',
  'sparql', 'sql', 'st', 'swift', 'systemverilog', 'tcl', 'twig', 'typescript', 'vb',
  'verilog', 'xml', 'yaml', 'javascriptreact', 'typescriptreact'
];

// Language display names and icons - comprehensive list
export const langInfo: Record<string, { name: string; icon: string }> = {
  // Popular languages
  javascript: { name: 'JavaScript', icon: 'JS' },
  javascriptreact: { name: 'JavaScript React', icon: 'JSX' },
  typescript: { name: 'TypeScript', icon: 'TS' },
  typescriptreact: { name: 'TypeScript React', icon: 'TSX' },
  python: { name: 'Python', icon: 'PY' },
  java: { name: 'Java', icon: 'JV' },
  csharp: { name: 'C#', icon: 'C#' },
  cpp: { name: 'C++', icon: 'C++' },
  c: { name: 'C', icon: 'C' },
  go: { name: 'Go', icon: 'GO' },
  rust: { name: 'Rust', icon: 'RS' },
  ruby: { name: 'Ruby', icon: 'RB' },
  php: { name: 'PHP', icon: 'PHP' },
  swift: { name: 'Swift', icon: 'SW' },
  kotlin: { name: 'Kotlin', icon: 'KT' },
  scala: { name: 'Scala', icon: 'SC' },
  dart: { name: 'Dart', icon: 'DT' },
  
  // Web
  html: { name: 'HTML', icon: 'HTML' },
  css: { name: 'CSS', icon: 'CSS' },
  scss: { name: 'SCSS', icon: 'SCSS' },
  less: { name: 'Less', icon: 'LESS' },
  pug: { name: 'Pug', icon: 'PUG' },
  handlebars: { name: 'Handlebars', icon: 'HBS' },
  twig: { name: 'Twig', icon: 'TWIG' },
  
  // Data formats
  json: { name: 'JSON', icon: '{ }' },
  yaml: { name: 'YAML', icon: 'YML' },
  xml: { name: 'XML', icon: 'XML' },
  ini: { name: 'INI', icon: 'INI' },
  
  // Documentation
  markdown: { name: 'Markdown', icon: 'MD' },
  mdx: { name: 'MDX', icon: 'MDX' },
  restructuredtext: { name: 'reStructuredText', icon: 'RST' },
  
  // Database
  sql: { name: 'SQL', icon: 'SQL' },
  mysql: { name: 'MySQL', icon: 'SQL' },
  pgsql: { name: 'PostgreSQL', icon: 'PG' },
  redis: { name: 'Redis', icon: 'RDS' },
  redshift: { name: 'Redshift', icon: 'RS' },
  cypher: { name: 'Cypher', icon: 'CYP' },
  sparql: { name: 'SPARQL', icon: 'SPQ' },
  
  // Shell & Scripts
  shell: { name: 'Shell', icon: 'SH' },
  bat: { name: 'Batch', icon: 'BAT' },
  powershell: { name: 'PowerShell', icon: 'PS1' },
  azcli: { name: 'Azure CLI', icon: 'AZ' },
  
  // DevOps & Config
  dockerfile: { name: 'Dockerfile', icon: 'DOC' },
  hcl: { name: 'HCL/Terraform', icon: 'TF' },
  bicep: { name: 'Bicep', icon: 'BCP' },
  
  // Functional
  fsharp: { name: 'F#', icon: 'F#' },
  elixir: { name: 'Elixir', icon: 'EX' },
  clojure: { name: 'Clojure', icon: 'CLJ' },
  scheme: { name: 'Scheme', icon: 'SCM' },
  
  // Other languages
  lua: { name: 'Lua', icon: 'LUA' },
  perl: { name: 'Perl', icon: 'PL' },
  r: { name: 'R', icon: 'R' },
  julia: { name: 'Julia', icon: 'JL' },
  coffeescript: { name: 'CoffeeScript', icon: 'COF' },
  
  // API & Data
  graphql: { name: 'GraphQL', icon: 'GQL' },
  protobuf: { name: 'Protocol Buffers', icon: 'PB' },
  
  // Blockchain
  sol: { name: 'Solidity', icon: 'SOL' },
  
  // Hardware
  verilog: { name: 'Verilog', icon: 'VL' },
  systemverilog: { name: 'SystemVerilog', icon: 'SV' },
  
  // Other
  abap: { name: 'ABAP', icon: 'ABAP' },
  apex: { name: 'Apex', icon: 'APX' },
  pascal: { name: 'Pascal', icon: 'PAS' },
  vb: { name: 'Visual Basic', icon: 'VB' },
  razor: { name: 'Razor', icon: 'RZR' },
  tcl: { name: 'Tcl', icon: 'TCL' },
  'objective-c': { name: 'Objective-C', icon: 'OC' },
  qsharp: { name: 'Q#', icon: 'Q#' },
  
  // Default
  plaintext: { name: 'Plain Text', icon: 'TXT' },
};

export function getLangDisplay(lang: string) {
  return langInfo[lang] || { name: lang.charAt(0).toUpperCase() + lang.slice(1), icon: lang.substring(0, 3).toUpperCase() };
}
