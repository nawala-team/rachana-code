export interface Extension {
  id: string;
  name: string;
  publisher: string;
  desc: string;
  icon: string;
  category: string;
  installed: boolean;
  downloads: string;
  rating: number;
}

export const extensions: Extension[] = [
  // LANGUAGES
  { id: 'python', name: 'Python', publisher: 'Microsoft', desc: 'IntelliSense, Linting, Debugging', icon: '🐍', category: 'Languages', installed: true, downloads: '95M', rating: 4.8 },
  { id: 'pylance', name: 'Pylance', publisher: 'Microsoft', desc: 'Fast Python language server', icon: '🐍', category: 'Languages', installed: false, downloads: '45M', rating: 4.9 },
  { id: 'jupyter', name: 'Jupyter', publisher: 'Microsoft', desc: 'Notebook support', icon: '📓', category: 'Languages', installed: false, downloads: '65M', rating: 4.7 },
  { id: 'rust-analyzer', name: 'rust-analyzer', publisher: 'rust-lang', desc: 'Rust support', icon: '🦀', category: 'Languages', installed: false, downloads: '5M', rating: 4.9 },
  { id: 'go', name: 'Go', publisher: 'Google', desc: 'Go language support', icon: '🐹', category: 'Languages', installed: false, downloads: '12M', rating: 4.7 },
  { id: 'java', name: 'Java Extension Pack', publisher: 'Microsoft', desc: 'Java development', icon: '☕', category: 'Languages', installed: false, downloads: '18M', rating: 4.5 },
  { id: 'spring', name: 'Spring Boot', publisher: 'VMware', desc: 'Spring Boot tools', icon: '🌱', category: 'Languages', installed: false, downloads: '4M', rating: 4.6 },
  { id: 'kotlin', name: 'Kotlin', publisher: 'fwcd', desc: 'Kotlin support', icon: '🟣', category: 'Languages', installed: false, downloads: '2M', rating: 4.4 },
  { id: 'scala', name: 'Scala Metals', publisher: 'Scalameta', desc: 'Scala support', icon: '🔴', category: 'Languages', installed: false, downloads: '800K', rating: 4.5 },
  { id: 'csharp', name: 'C#', publisher: 'Microsoft', desc: 'C# support', icon: '💜', category: 'Languages', installed: false, downloads: '22M', rating: 4.6 },
  { id: 'fsharp', name: 'Ionide F#', publisher: 'Ionide', desc: 'F# support', icon: '🔷', category: 'Languages', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'cpp', name: 'C/C++', publisher: 'Microsoft', desc: 'C/C++ support', icon: '🔵', category: 'Languages', installed: false, downloads: '45M', rating: 4.4 },
  { id: 'cmake', name: 'CMake Tools', publisher: 'Microsoft', desc: 'CMake support', icon: '🔧', category: 'Languages', installed: false, downloads: '8M', rating: 4.6 },
  { id: 'dart', name: 'Dart', publisher: 'Dart Code', desc: 'Dart support', icon: '🎯', category: 'Languages', installed: false, downloads: '6M', rating: 4.8 },
  { id: 'flutter', name: 'Flutter', publisher: 'Dart Code', desc: 'Flutter development', icon: '💙', category: 'Languages', installed: false, downloads: '7M', rating: 4.8 },
  { id: 'swift', name: 'Swift', publisher: 'Apple', desc: 'Swift support', icon: '🍎', category: 'Languages', installed: false, downloads: '1M', rating: 4.3 },
  { id: 'ruby', name: 'Ruby LSP', publisher: 'Shopify', desc: 'Ruby support', icon: '💎', category: 'Languages', installed: false, downloads: '3M', rating: 4.4 },
  { id: 'php', name: 'PHP Intelephense', publisher: 'Ben Mewburn', desc: 'PHP support', icon: '🐘', category: 'Languages', installed: false, downloads: '12M', rating: 4.7 },
  { id: 'laravel', name: 'Laravel', publisher: 'amir', desc: 'Laravel tools', icon: '🔴', category: 'Languages', installed: false, downloads: '2M', rating: 4.6 },
  { id: 'lua', name: 'Lua', publisher: 'sumneko', desc: 'Lua support', icon: '🌙', category: 'Languages', installed: false, downloads: '4M', rating: 4.8 },
  { id: 'r', name: 'R', publisher: 'REditorSupport', desc: 'R support', icon: '📊', category: 'Languages', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'julia', name: 'Julia', publisher: 'julialang', desc: 'Julia support', icon: '🔮', category: 'Languages', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'elixir', name: 'ElixirLS', publisher: 'ElixirLS', desc: 'Elixir support', icon: '💧', category: 'Languages', installed: false, downloads: '800K', rating: 4.7 },
  { id: 'haskell', name: 'Haskell', publisher: 'Haskell', desc: 'Haskell support', icon: 'λ', category: 'Languages', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'clojure', name: 'Calva', publisher: 'BetterThanTomorrow', desc: 'Clojure support', icon: '🟢', category: 'Languages', installed: false, downloads: '500K', rating: 4.7 },
  { id: 'powershell', name: 'PowerShell', publisher: 'Microsoft', desc: 'PowerShell support', icon: '💠', category: 'Languages', installed: false, downloads: '8M', rating: 4.6 },
  { id: 'bash', name: 'Bash IDE', publisher: 'mads-hartmann', desc: 'Bash support', icon: '🖥️', category: 'Languages', installed: false, downloads: '3M', rating: 4.5 },
  { id: 'zig', name: 'Zig', publisher: 'ziglang', desc: 'Zig support', icon: '⚡', category: 'Languages', installed: false, downloads: '300K', rating: 4.6 },
  { id: 'perl', name: 'Perl', publisher: 'Gerald Richter', desc: 'Perl support', icon: '🐪', category: 'Languages', installed: false, downloads: '500K', rating: 4.2 },
  { id: 'groovy', name: 'Groovy', publisher: 'Marlon Franca', desc: 'Groovy support', icon: '⭐', category: 'Languages', installed: false, downloads: '1M', rating: 4.3 },
  { id: 'cobol', name: 'COBOL', publisher: 'Broadcom', desc: 'COBOL support', icon: '🏛️', category: 'Languages', installed: false, downloads: '500K', rating: 4.3 },
  { id: 'fortran', name: 'Fortran', publisher: 'fortran-lang', desc: 'Fortran support', icon: '🔢', category: 'Languages', installed: false, downloads: '200K', rating: 4.4 },

  // WEB DEVELOPMENT
  { id: 'html-css', name: 'HTML CSS Support', publisher: 'ecmel', desc: 'HTML/CSS IntelliSense', icon: '🌐', category: 'Web', installed: true, downloads: '15M', rating: 4.6 },
  { id: 'auto-rename-tag', name: 'Auto Rename Tag', publisher: 'Jun Han', desc: 'Auto rename HTML tags', icon: '🏷️', category: 'Web', installed: false, downloads: '12M', rating: 4.5 },
  { id: 'auto-close-tag', name: 'Auto Close Tag', publisher: 'Jun Han', desc: 'Auto close HTML tags', icon: '🏷️', category: 'Web', installed: false, downloads: '10M', rating: 4.5 },
  { id: 'live-server', name: 'Live Server', publisher: 'Ritwick Dey', desc: 'Local dev server with reload', icon: '🔴', category: 'Web', installed: true, downloads: '35M', rating: 4.8 },
  { id: 'css-peek', name: 'CSS Peek', publisher: 'Pranay Prakash', desc: 'Peek CSS definitions', icon: '👁️', category: 'Web', installed: false, downloads: '5M', rating: 4.5 },
  { id: 'tailwindcss', name: 'Tailwind CSS IntelliSense', publisher: 'Tailwind Labs', desc: 'Tailwind autocomplete', icon: '🎨', category: 'Web', installed: false, downloads: '8M', rating: 4.9 },
  { id: 'vetur', name: 'Vetur', publisher: 'Pine Wu', desc: 'Vue.js tooling', icon: '💚', category: 'Web', installed: false, downloads: '12M', rating: 4.6 },
  { id: 'volar', name: 'Vue - Official', publisher: 'Vue', desc: 'Vue 3 support', icon: '💚', category: 'Web', installed: false, downloads: '8M', rating: 4.8 },
  { id: 'es7-react', name: 'ES7+ React Snippets', publisher: 'dsznajder', desc: 'React/Redux snippets', icon: '⚛️', category: 'Web', installed: false, downloads: '10M', rating: 4.7 },
  { id: 'react-native', name: 'React Native Tools', publisher: 'Microsoft', desc: 'React Native debug', icon: '⚛️', category: 'Web', installed: false, downloads: '4M', rating: 4.4 },
  { id: 'angular', name: 'Angular Language Service', publisher: 'Angular', desc: 'Angular support', icon: '🅰️', category: 'Web', installed: false, downloads: '5M', rating: 4.5 },
  { id: 'svelte', name: 'Svelte for VS Code', publisher: 'Svelte', desc: 'Svelte support', icon: '🔥', category: 'Web', installed: false, downloads: '2M', rating: 4.8 },
  { id: 'astro', name: 'Astro', publisher: 'Astro', desc: 'Astro framework', icon: '🚀', category: 'Web', installed: false, downloads: '1M', rating: 4.8 },
  { id: 'nextjs', name: 'Next.js', publisher: 'Next.js', desc: 'Next.js snippets', icon: '▲', category: 'Web', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'nuxt', name: 'Nuxt', publisher: 'Nuxt', desc: 'Nuxt.js support', icon: '💚', category: 'Web', installed: false, downloads: '300K', rating: 4.5 },
  { id: 'lit', name: 'lit-plugin', publisher: 'runem', desc: 'Lit element support', icon: '🔥', category: 'Web', installed: false, downloads: '200K', rating: 4.6 },
  { id: 'styled-components', name: 'vscode-styled-components', publisher: 'Julien', desc: 'Styled components', icon: '💅', category: 'Web', installed: false, downloads: '2M', rating: 4.6 },
  { id: 'sass', name: 'Sass', publisher: 'Syler', desc: 'SASS/SCSS support', icon: '🎀', category: 'Web', installed: false, downloads: '4M', rating: 4.5 },
  { id: 'less', name: 'Less IntelliSense', publisher: 'mrmlnc', desc: 'LESS support', icon: '🎀', category: 'Web', installed: false, downloads: '500K', rating: 4.3 },
  { id: 'postcss', name: 'PostCSS', publisher: 'csstools', desc: 'PostCSS support', icon: '🎨', category: 'Web', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'emmet', name: 'Emmet', publisher: 'Built-in', desc: 'Emmet abbreviations', icon: '⚡', category: 'Web', installed: true, downloads: '50M', rating: 4.9 },
  { id: 'path-intellisense', name: 'Path Intellisense', publisher: 'Christian Kohler', desc: 'Path autocomplete', icon: '📁', category: 'Web', installed: false, downloads: '10M', rating: 4.7 },
  { id: 'npm-intellisense', name: 'npm Intellisense', publisher: 'Christian Kohler', desc: 'npm autocomplete', icon: '📦', category: 'Web', installed: false, downloads: '8M', rating: 4.6 },
  { id: 'import-cost', name: 'Import Cost', publisher: 'Wix', desc: 'Display import size', icon: '📊', category: 'Web', installed: false, downloads: '4M', rating: 4.5 },
  { id: 'vscode-typescript', name: 'TypeScript Importer', publisher: 'pmneo', desc: 'Auto imports', icon: '🔷', category: 'Web', installed: false, downloads: '2M', rating: 4.4 },
  { id: 'graphql', name: 'GraphQL', publisher: 'GraphQL Foundation', desc: 'GraphQL support', icon: '◼️', category: 'Web', installed: false, downloads: '3M', rating: 4.6 },
  { id: 'prisma', name: 'Prisma', publisher: 'Prisma', desc: 'Prisma ORM support', icon: '🔷', category: 'Web', installed: false, downloads: '2M', rating: 4.8 },
  { id: 'rest-client', name: 'REST Client', publisher: 'Huachao Mao', desc: 'HTTP request tool', icon: '🌐', category: 'Web', installed: false, downloads: '5M', rating: 4.7 },
  { id: 'thunder-client', name: 'Thunder Client', publisher: 'Ranga Vadhineni', desc: 'API testing', icon: '⚡', category: 'Web', installed: false, downloads: '3M', rating: 4.8 },
  { id: 'quokka', name: 'Quokka.js', publisher: 'Wallaby.js', desc: 'JS/TS playground', icon: '🐨', category: 'Web', installed: false, downloads: '2M', rating: 4.7 },
  { id: 'vscode-jest', name: 'Jest', publisher: 'Orta', desc: 'Jest integration', icon: '🃏', category: 'Web', installed: false, downloads: '3M', rating: 4.5 },
  { id: 'vitest', name: 'Vitest', publisher: 'Vitest', desc: 'Vitest runner', icon: '⚡', category: 'Web', installed: false, downloads: '500K', rating: 4.7 },

  // FORMATTERS & LINTERS
  { id: 'prettier', name: 'Prettier', publisher: 'Prettier', desc: 'Code formatter', icon: '✨', category: 'Formatters', installed: true, downloads: '40M', rating: 4.8 },
  { id: 'eslint', name: 'ESLint', publisher: 'Microsoft', desc: 'JavaScript linter', icon: '🔍', category: 'Formatters', installed: true, downloads: '30M', rating: 4.7 },
  { id: 'biome', name: 'Biome', publisher: 'Biome', desc: 'Fast formatter & linter', icon: '🌿', category: 'Formatters', installed: false, downloads: '500K', rating: 4.8 },
  { id: 'stylelint', name: 'Stylelint', publisher: 'Stylelint', desc: 'CSS linter', icon: '🎨', category: 'Formatters', installed: false, downloads: '3M', rating: 4.5 },
  { id: 'markdownlint', name: 'markdownlint', publisher: 'David Anson', desc: 'Markdown linter', icon: '📝', category: 'Formatters', installed: false, downloads: '5M', rating: 4.6 },
  { id: 'editorconfig', name: 'EditorConfig', publisher: 'EditorConfig', desc: 'Editor settings', icon: '⚙️', category: 'Formatters', installed: false, downloads: '8M', rating: 4.5 },
  { id: 'sonarlint', name: 'SonarLint', publisher: 'SonarSource', desc: 'Code quality', icon: '🔊', category: 'Formatters', installed: false, downloads: '4M', rating: 4.4 },
  { id: 'codespell', name: 'Code Spell Checker', publisher: 'Street Side', desc: 'Spelling checker', icon: '📖', category: 'Formatters', installed: false, downloads: '6M', rating: 4.6 },
  { id: 'errorlens', name: 'Error Lens', publisher: 'Alexander', desc: 'Inline errors', icon: '🔴', category: 'Formatters', installed: false, downloads: '5M', rating: 4.8 },

  // GIT
  { id: 'gitlens', name: 'GitLens', publisher: 'GitKraken', desc: 'Git supercharged', icon: '🔮', category: 'Git', installed: true, downloads: '25M', rating: 4.7 },
  { id: 'git-graph', name: 'Git Graph', publisher: 'mhutchie', desc: 'Git graph viewer', icon: '📊', category: 'Git', installed: false, downloads: '8M', rating: 4.8 },
  { id: 'git-history', name: 'Git History', publisher: 'Don Jayamanne', desc: 'View git log', icon: '📜', category: 'Git', installed: false, downloads: '7M', rating: 4.6 },
  { id: 'gitblame', name: 'Git Blame', publisher: 'Wade Anderson', desc: 'Blame info', icon: '👤', category: 'Git', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'github-pr', name: 'GitHub Pull Requests', publisher: 'GitHub', desc: 'PR management', icon: '🐙', category: 'Git', installed: false, downloads: '10M', rating: 4.6 },
  { id: 'github-copilot', name: 'GitHub Copilot', publisher: 'GitHub', desc: 'AI pair programmer', icon: '🤖', category: 'Git', installed: false, downloads: '15M', rating: 4.7 },
  { id: 'github-actions', name: 'GitHub Actions', publisher: 'GitHub', desc: 'Actions workflow', icon: '⚙️', category: 'Git', installed: false, downloads: '3M', rating: 4.5 },
  { id: 'gitlab-workflow', name: 'GitLab Workflow', publisher: 'GitLab', desc: 'GitLab integration', icon: '🦊', category: 'Git', installed: false, downloads: '1M', rating: 4.4 },

  // DEVOPS
  { id: 'docker', name: 'Docker', publisher: 'Microsoft', desc: 'Docker support', icon: '🐳', category: 'DevOps', installed: true, downloads: '25M', rating: 4.7 },
  { id: 'kubernetes', name: 'Kubernetes', publisher: 'Microsoft', desc: 'K8s support', icon: '☸️', category: 'DevOps', installed: false, downloads: '5M', rating: 4.5 },
  { id: 'helm', name: 'Helm Intellisense', publisher: 'Tim Schneeberger', desc: 'Helm charts', icon: '⛵', category: 'DevOps', installed: false, downloads: '500K', rating: 4.4 },
  { id: 'terraform', name: 'HashiCorp Terraform', publisher: 'HashiCorp', desc: 'Terraform IaC', icon: '🏗️', category: 'DevOps', installed: false, downloads: '8M', rating: 4.6 },
  { id: 'ansible', name: 'Ansible', publisher: 'Red Hat', desc: 'Ansible support', icon: '🅰️', category: 'DevOps', installed: false, downloads: '3M', rating: 4.5 },
  { id: 'aws-toolkit', name: 'AWS Toolkit', publisher: 'Amazon', desc: 'AWS integration', icon: '☁️', category: 'DevOps', installed: false, downloads: '3M', rating: 4.4 },
  { id: 'azure-tools', name: 'Azure Tools', publisher: 'Microsoft', desc: 'Azure integration', icon: '🔷', category: 'DevOps', installed: false, downloads: '4M', rating: 4.5 },
  { id: 'gcloud', name: 'Cloud Code', publisher: 'Google', desc: 'GCP integration', icon: '☁️', category: 'DevOps', installed: false, downloads: '1M', rating: 4.4 },
  { id: 'pulumi', name: 'Pulumi', publisher: 'Pulumi', desc: 'IaC with code', icon: '🎛️', category: 'DevOps', installed: false, downloads: '200K', rating: 4.5 },
  { id: 'nginx', name: 'NGINX Configuration', publisher: 'William', desc: 'NGINX syntax', icon: '🟢', category: 'DevOps', installed: false, downloads: '1M', rating: 4.4 },

  // REMOTE
  { id: 'remote-ssh', name: 'Remote - SSH', publisher: 'Microsoft', desc: 'SSH remote dev', icon: '🔌', category: 'Remote', installed: false, downloads: '15M', rating: 4.7 },
  { id: 'remote-wsl', name: 'WSL', publisher: 'Microsoft', desc: 'WSL integration', icon: '🐧', category: 'Remote', installed: false, downloads: '12M', rating: 4.7 },
  { id: 'remote-containers', name: 'Dev Containers', publisher: 'Microsoft', desc: 'Container dev', icon: '📦', category: 'Remote', installed: false, downloads: '10M', rating: 4.6 },
  { id: 'live-share', name: 'Live Share', publisher: 'Microsoft', desc: 'Real-time collab', icon: '👥', category: 'Remote', installed: false, downloads: '12M', rating: 4.6 },
  { id: 'codespaces', name: 'GitHub Codespaces', publisher: 'GitHub', desc: 'Cloud dev env', icon: '☁️', category: 'Remote', installed: false, downloads: '3M', rating: 4.5 },

  // AI
  { id: 'copilot', name: 'GitHub Copilot', publisher: 'GitHub', desc: 'AI code completion', icon: '🤖', category: 'AI', installed: false, downloads: '15M', rating: 4.7 },
  { id: 'copilot-chat', name: 'GitHub Copilot Chat', publisher: 'GitHub', desc: 'AI chat assistant', icon: '💬', category: 'AI', installed: false, downloads: '8M', rating: 4.6 },
  { id: 'codeium', name: 'Codeium', publisher: 'Codeium', desc: 'Free AI completion', icon: '🚀', category: 'AI', installed: false, downloads: '2M', rating: 4.6 },
  { id: 'tabnine', name: 'Tabnine', publisher: 'Tabnine', desc: 'AI assistant', icon: '🧠', category: 'AI', installed: false, downloads: '5M', rating: 4.4 },
  { id: 'cody', name: 'Cody AI', publisher: 'Sourcegraph', desc: 'AI coding assistant', icon: '🤖', category: 'AI', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'cursor', name: 'Cursor', publisher: 'Cursor', desc: 'AI-first editor', icon: '✨', category: 'AI', installed: false, downloads: '300K', rating: 4.6 },
  { id: 'amazon-q', name: 'Amazon Q', publisher: 'Amazon', desc: 'AWS AI assistant', icon: '🅰️', category: 'AI', installed: false, downloads: '500K', rating: 4.3 },
  { id: 'continue', name: 'Continue', publisher: 'Continue', desc: 'Open-source AI', icon: '▶️', category: 'AI', installed: false, downloads: '200K', rating: 4.5 },

  // TESTING
  { id: 'test-explorer', name: 'Test Explorer UI', publisher: 'Holger Benl', desc: 'Test explorer', icon: '🧪', category: 'Testing', installed: false, downloads: '3M', rating: 4.6 },
  { id: 'jest-runner', name: 'Jest Runner', publisher: 'firsttris', desc: 'Run Jest tests', icon: '🃏', category: 'Testing', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'playwright', name: 'Playwright Test', publisher: 'Microsoft', desc: 'Playwright tests', icon: '🎭', category: 'Testing', installed: false, downloads: '1M', rating: 4.7 },
  { id: 'cypress', name: 'Cypress Helper', publisher: 'Cypress', desc: 'Cypress support', icon: '🌲', category: 'Testing', installed: false, downloads: '500K', rating: 4.4 },
  { id: 'coverage-gutters', name: 'Coverage Gutters', publisher: 'ryanluker', desc: 'Code coverage', icon: '📊', category: 'Testing', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'dotnet-test', name: '.NET Core Test Explorer', publisher: 'formulahendry', desc: '.NET tests', icon: '🧪', category: 'Testing', installed: false, downloads: '1M', rating: 4.4 },
  { id: 'pytest', name: 'Python Test Explorer', publisher: 'LittleFoxTeam', desc: 'Python tests', icon: '🐍', category: 'Testing', installed: false, downloads: '500K', rating: 4.3 },

  // DATABASE
  { id: 'sqltools', name: 'SQLTools', publisher: 'mtxr', desc: 'Database client', icon: '🗃️', category: 'Database', installed: false, downloads: '4M', rating: 4.5 },
  { id: 'mongodb', name: 'MongoDB for VS Code', publisher: 'MongoDB', desc: 'MongoDB support', icon: '🍃', category: 'Database', installed: false, downloads: '2M', rating: 4.4 },
  { id: 'redis', name: 'Redis', publisher: 'Dunn', desc: 'Redis client', icon: '🔴', category: 'Database', installed: false, downloads: '500K', rating: 4.3 },
  { id: 'mysql', name: 'MySQL', publisher: 'cweijan', desc: 'MySQL client', icon: '🐬', category: 'Database', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'postgres', name: 'PostgreSQL', publisher: 'cweijan', desc: 'PostgreSQL client', icon: '🐘', category: 'Database', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'sqlite', name: 'SQLite Viewer', publisher: 'alexcvzz', desc: 'SQLite viewer', icon: '📊', category: 'Database', installed: false, downloads: '1M', rating: 4.4 },

  // PRODUCTIVITY
  { id: 'todo-tree', name: 'Todo Tree', publisher: 'Gruntfuggly', desc: 'TODO comments', icon: '🌳', category: 'Productivity', installed: false, downloads: '5M', rating: 4.7 },
  { id: 'todo-highlight', name: 'TODO Highlight', publisher: 'wayou', desc: 'Highlight TODOs', icon: '📌', category: 'Productivity', installed: false, downloads: '4M', rating: 4.5 },
  { id: 'bookmarks', name: 'Bookmarks', publisher: 'Alessandro Fragnani', desc: 'Code bookmarks', icon: '🔖', category: 'Productivity', installed: false, downloads: '4M', rating: 4.7 },
  { id: 'project-manager', name: 'Project Manager', publisher: 'Alessandro Fragnani', desc: 'Project switching', icon: '📂', category: 'Productivity', installed: false, downloads: '3M', rating: 4.6 },
  { id: 'peacock', name: 'Peacock', publisher: 'John Papa', desc: 'Workspace colors', icon: '🦚', category: 'Productivity', installed: false, downloads: '3M', rating: 4.6 },
  { id: 'better-comments', name: 'Better Comments', publisher: 'Aaron Bond', desc: 'Comment styles', icon: '💬', category: 'Productivity', installed: false, downloads: '6M', rating: 4.7 },
  { id: 'indent-rainbow', name: 'Indent Rainbow', publisher: 'oderwat', desc: 'Colorize indent', icon: '🌈', category: 'Productivity', installed: false, downloads: '6M', rating: 4.6 },
  { id: 'bracket-colorizer', name: 'Bracket Pair Colorizer', publisher: 'CoenraadS', desc: 'Colorize brackets', icon: '🌈', category: 'Productivity', installed: false, downloads: '9M', rating: 4.5 },
  { id: 'polacode', name: 'Polacode', publisher: 'P & P', desc: 'Code snapshots', icon: '📸', category: 'Productivity', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'codesnap', name: 'CodeSnap', publisher: 'adpyke', desc: 'Code screenshots', icon: '📷', category: 'Productivity', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'wakatime', name: 'WakaTime', publisher: 'WakaTime', desc: 'Coding metrics', icon: '⏱️', category: 'Productivity', installed: false, downloads: '2M', rating: 4.4 },

  // THEMES
  { id: 'dracula', name: 'Dracula Official', publisher: 'Dracula Theme', desc: 'Dark theme', icon: '🧛', category: 'Themes', installed: false, downloads: '6M', rating: 4.8 },
  { id: 'one-dark', name: 'One Dark Pro', publisher: 'binaryify', desc: 'Atom One Dark', icon: '🌙', category: 'Themes', installed: false, downloads: '8M', rating: 4.7 },
  { id: 'tokyo-night', name: 'Tokyo Night', publisher: 'enkia', desc: 'Clean dark theme', icon: '🗼', category: 'Themes', installed: false, downloads: '3M', rating: 4.9 },
  { id: 'github-theme', name: 'GitHub Theme', publisher: 'GitHub', desc: 'GitHub colors', icon: '🐙', category: 'Themes', installed: false, downloads: '5M', rating: 4.7 },
  { id: 'monokai', name: 'Monokai Pro', publisher: 'monokai', desc: 'Professional theme', icon: '🎨', category: 'Themes', installed: false, downloads: '2M', rating: 4.6 },
  { id: 'nord', name: 'Nord', publisher: 'arcticicestudio', desc: 'Arctic north-bluish', icon: '❄️', category: 'Themes', installed: false, downloads: '2M', rating: 4.7 },
  { id: 'catppuccin', name: 'Catppuccin', publisher: 'Catppuccin', desc: 'Soothing pastel', icon: '🐱', category: 'Themes', installed: false, downloads: '1M', rating: 4.9 },
  { id: 'synthwave', name: "SynthWave '84", publisher: 'Robb Owen', desc: '80s inspired', icon: '🌆', category: 'Themes', installed: false, downloads: '2M', rating: 4.8 },
  { id: 'night-owl', name: 'Night Owl', publisher: 'sarah.drasner', desc: 'For night owls', icon: '🦉', category: 'Themes', installed: false, downloads: '3M', rating: 4.8 },
  { id: 'winter', name: 'Winter is Coming', publisher: 'John Papa', desc: 'Blue winter', icon: '⛄', category: 'Themes', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'ayu', name: 'Ayu', publisher: 'teabyii', desc: 'Simple theme', icon: '☀️', category: 'Themes', installed: false, downloads: '2M', rating: 4.6 },
  { id: 'gruvbox', name: 'Gruvbox Theme', publisher: 'jdinhify', desc: 'Retro groove', icon: '🟤', category: 'Themes', installed: false, downloads: '1M', rating: 4.7 },
  { id: 'palenight', name: 'Material Palenight', publisher: 'whizkydee', desc: 'Material palenight', icon: '🌃', category: 'Themes', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'cobalt2', name: 'Cobalt2', publisher: 'wesbos', desc: 'Cobalt theme', icon: '💙', category: 'Themes', installed: false, downloads: '500K', rating: 4.7 },
  { id: 'shades-of-purple', name: 'Shades of Purple', publisher: 'ahmadawais', desc: 'Purple theme', icon: '💜', category: 'Themes', installed: false, downloads: '1M', rating: 4.7 },
  { id: 'atom-one-light', name: 'Atom One Light', publisher: 'akamud', desc: 'Light theme', icon: '☀️', category: 'Themes', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'solarized', name: 'Solarized', publisher: 'ryanolsonx', desc: 'Solarized theme', icon: '🌞', category: 'Themes', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'vitesse', name: 'Vitesse Theme', publisher: 'antfu', desc: 'Vitesse theme', icon: '⚡', category: 'Themes', installed: false, downloads: '500K', rating: 4.8 },

  // ICONS
  { id: 'material-icons', name: 'Material Icon Theme', publisher: 'Philipp Kief', desc: 'Material icons', icon: '📁', category: 'Icons', installed: false, downloads: '14M', rating: 4.9 },
  { id: 'vscode-icons', name: 'vscode-icons', publisher: 'VSCode Icons', desc: 'File icons', icon: '🎨', category: 'Icons', installed: false, downloads: '12M', rating: 4.7 },
  { id: 'file-icons', name: 'file-icons', publisher: 'file-icons', desc: 'File-specific icons', icon: '📄', category: 'Icons', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'catppuccin-icons', name: 'Catppuccin Icons', publisher: 'Catppuccin', desc: 'Catppuccin icons', icon: '🐱', category: 'Icons', installed: false, downloads: '500K', rating: 4.8 },
  { id: 'symbols', name: 'Symbols', publisher: 'miguelsolorio', desc: 'Minimalist icons', icon: '✦', category: 'Icons', installed: false, downloads: '500K', rating: 4.7 },

  // MARKDOWN
  { id: 'markdown-all', name: 'Markdown All in One', publisher: 'Yu Zhang', desc: 'All-in-one MD', icon: '📝', category: 'Markdown', installed: false, downloads: '8M', rating: 4.7 },
  { id: 'markdown-preview', name: 'Markdown Preview Enhanced', publisher: 'Yiyi Wang', desc: 'Enhanced preview', icon: '👁️', category: 'Markdown', installed: false, downloads: '4M', rating: 4.6 },
  { id: 'mermaid', name: 'Markdown Preview Mermaid', publisher: 'bierner', desc: 'Mermaid diagrams', icon: '🧜', category: 'Markdown', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'markdown-table', name: 'Markdown Table', publisher: 'TakumiI', desc: 'Table formatter', icon: '📊', category: 'Markdown', installed: false, downloads: '500K', rating: 4.4 },
  { id: 'docs-yaml', name: 'Docs YAML', publisher: 'Microsoft', desc: 'YAML for docs', icon: '📋', category: 'Markdown', installed: false, downloads: '1M', rating: 4.4 },

  // DATA & CONFIG
  { id: 'yaml', name: 'YAML', publisher: 'Red Hat', desc: 'YAML support', icon: '📄', category: 'Data', installed: false, downloads: '15M', rating: 4.7 },
  { id: 'json-tools', name: 'JSON Tools', publisher: 'Erik Lynd', desc: 'JSON utilities', icon: '📋', category: 'Data', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'xml', name: 'XML Tools', publisher: 'Josh Johnson', desc: 'XML support', icon: '📄', category: 'Data', installed: false, downloads: '3M', rating: 4.4 },
  { id: 'toml', name: 'Even Better TOML', publisher: 'tamasfe', desc: 'TOML support', icon: '📄', category: 'Data', installed: false, downloads: '3M', rating: 4.8 },
  { id: 'csv', name: 'Rainbow CSV', publisher: 'mechatroner', desc: 'CSV highlighting', icon: '📊', category: 'Data', installed: false, downloads: '2M', rating: 4.7 },
  { id: 'dotenv', name: 'DotENV', publisher: 'mikestead', desc: '.env support', icon: '🔐', category: 'Data', installed: false, downloads: '5M', rating: 4.6 },
  { id: 'protobuf', name: 'vscode-proto3', publisher: 'zxh404', desc: 'Protobuf support', icon: '📦', category: 'Data', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'avro', name: 'Avro Tools', publisher: 'streetsidesoftware', desc: 'Avro support', icon: '📦', category: 'Data', installed: false, downloads: '100K', rating: 4.3 },
  { id: 'parquet', name: 'Parquet Viewer', publisher: 'dvirtz', desc: 'Parquet files', icon: '📊', category: 'Data', installed: false, downloads: '200K', rating: 4.4 },
  { id: 'ini', name: 'Ini', publisher: 'Cdelelis', desc: 'INI support', icon: '⚙️', category: 'Data', installed: false, downloads: '500K', rating: 4.3 },

  // SECURITY
  { id: 'snyk', name: 'Snyk Security', publisher: 'Snyk', desc: 'Security scanning', icon: '🔒', category: 'Security', installed: false, downloads: '1M', rating: 4.4 },
  { id: 'gitleaks', name: 'Gitleaks', publisher: 'gitleaks', desc: 'Secret detection', icon: '🔐', category: 'Security', installed: false, downloads: '200K', rating: 4.5 },
  { id: 'checkov', name: 'Checkov', publisher: 'Bridgecrew', desc: 'IaC security', icon: '✅', category: 'Security', installed: false, downloads: '300K', rating: 4.4 },
  { id: 'trivy', name: 'Trivy', publisher: 'AquaSecurity', desc: 'Vulnerability scan', icon: '🛡️', category: 'Security', installed: false, downloads: '100K', rating: 4.5 },
  { id: 'semgrep', name: 'Semgrep', publisher: 'Semgrep', desc: 'Code analysis', icon: '🔍', category: 'Security', installed: false, downloads: '200K', rating: 4.4 },
  { id: 'dependency-check', name: 'OWASP Dependency-Check', publisher: 'OWASP', desc: 'Dependency audit', icon: '🔒', category: 'Security', installed: false, downloads: '100K', rating: 4.3 },

  // SNIPPETS
  { id: 'js-snippets', name: 'JavaScript Snippets', publisher: 'charalampos', desc: 'JS snippets', icon: '📝', category: 'Snippets', installed: false, downloads: '4M', rating: 4.5 },
  { id: 'ts-snippets', name: 'TypeScript Snippets', publisher: 'nicholashsiang', desc: 'TS snippets', icon: '📝', category: 'Snippets', installed: false, downloads: '1M', rating: 4.4 },
  { id: 'html-snippets', name: 'HTML Snippets', publisher: 'abusaidm', desc: 'HTML snippets', icon: '📝', category: 'Snippets', installed: false, downloads: '5M', rating: 4.5 },
  { id: 'bootstrap-snippets', name: 'Bootstrap Snippets', publisher: 'thekalinga', desc: 'Bootstrap 5', icon: '🅱️', category: 'Snippets', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'python-snippets', name: 'Python Snippets', publisher: 'frhtylcn', desc: 'Python snippets', icon: '🐍', category: 'Snippets', installed: false, downloads: '1M', rating: 4.4 },
  { id: 'java-snippets', name: 'Java Code Generators', publisher: 'sohibe', desc: 'Java snippets', icon: '☕', category: 'Snippets', installed: false, downloads: '500K', rating: 4.3 },
  { id: 'cpp-snippets', name: 'C++ Snippets', publisher: 'hars', desc: 'C++ snippets', icon: '🔵', category: 'Snippets', installed: false, downloads: '500K', rating: 4.4 },
  { id: 'go-snippets', name: 'Go Snippets', publisher: 'premparihar', desc: 'Go snippets', icon: '🐹', category: 'Snippets', installed: false, downloads: '300K', rating: 4.4 },
  { id: 'rust-snippets', name: 'Rust Snippets', publisher: 'polypus74', desc: 'Rust snippets', icon: '🦀', category: 'Snippets', installed: false, downloads: '200K', rating: 4.5 },
  { id: 'sql-snippets', name: 'SQL Snippets', publisher: 'mtxr', desc: 'SQL snippets', icon: '🗃️', category: 'Snippets', installed: false, downloads: '500K', rating: 4.4 },

  // KEYMAPS
  { id: 'vim', name: 'Vim', publisher: 'vscodevim', desc: 'Vim emulation', icon: '💚', category: 'Keymaps', installed: false, downloads: '8M', rating: 4.5 },
  { id: 'neovim', name: 'VSCode Neovim', publisher: 'asvetliakov', desc: 'Neovim integration', icon: '💚', category: 'Keymaps', installed: false, downloads: '1M', rating: 4.7 },
  { id: 'emacs', name: 'Emacs Keymap', publisher: 'tuttieee', desc: 'Emacs keybindings', icon: '🟣', category: 'Keymaps', installed: false, downloads: '300K', rating: 4.3 },
  { id: 'sublime-keymap', name: 'Sublime Text Keymap', publisher: 'Microsoft', desc: 'Sublime keys', icon: '🟠', category: 'Keymaps', installed: false, downloads: '1M', rating: 4.4 },
  { id: 'intellij-keymap', name: 'IntelliJ IDEA Keybindings', publisher: 'Keisuke Kato', desc: 'IntelliJ keys', icon: '🔴', category: 'Keymaps', installed: false, downloads: '500K', rating: 4.4 },
  { id: 'atom-keymap', name: 'Atom Keymap', publisher: 'Microsoft', desc: 'Atom keybindings', icon: '⚛️', category: 'Keymaps', installed: false, downloads: '500K', rating: 4.3 },
  { id: 'notepadpp-keymap', name: 'Notepad++ Keymap', publisher: 'Microsoft', desc: 'Notepad++ keys', icon: '📝', category: 'Keymaps', installed: false, downloads: '200K', rating: 4.2 },

  // DEBUGGING
  { id: 'debugger-chrome', name: 'Debugger for Chrome', publisher: 'Microsoft', desc: 'Chrome debugging', icon: '🔧', category: 'Debugging', installed: false, downloads: '10M', rating: 4.5 },
  { id: 'debugger-firefox', name: 'Debugger for Firefox', publisher: 'Firefox', desc: 'Firefox debugging', icon: '🦊', category: 'Debugging', installed: false, downloads: '1M', rating: 4.4 },
  { id: 'python-debugger', name: 'Python Debugger', publisher: 'Microsoft', desc: 'Python debugging', icon: '🐍', category: 'Debugging', installed: false, downloads: '5M', rating: 4.6 },
  { id: 'lldb', name: 'CodeLLDB', publisher: 'vadimcn', desc: 'LLDB debugger', icon: '🔧', category: 'Debugging', installed: false, downloads: '3M', rating: 4.7 },
  { id: 'gdb', name: 'Native Debug', publisher: 'WebFreak', desc: 'GDB/LLDB debug', icon: '🔧', category: 'Debugging', installed: false, downloads: '1M', rating: 4.4 },

  // DOCUMENTATION
  { id: 'autodocstring', name: 'autoDocstring', publisher: 'Nils Werner', desc: 'Python docstrings', icon: '📖', category: 'Documentation', installed: false, downloads: '2M', rating: 4.6 },
  { id: 'jsdoc', name: 'Document This', publisher: 'Joel Day', desc: 'JSDoc generator', icon: '📖', category: 'Documentation', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'doxygen', name: 'Doxygen Documentation', publisher: 'Christoph Schlosser', desc: 'Doxygen support', icon: '📖', category: 'Documentation', installed: false, downloads: '500K', rating: 4.4 },
  { id: 'swagger', name: 'OpenAPI Editor', publisher: '42Crunch', desc: 'API documentation', icon: '📋', category: 'Documentation', installed: false, downloads: '2M', rating: 4.5 },

  // GAME DEV
  { id: 'unity', name: 'Unity', publisher: 'Unity Technologies', desc: 'Unity development', icon: '🎮', category: 'GameDev', installed: false, downloads: '2M', rating: 4.4 },
  { id: 'godot', name: 'Godot Tools', publisher: 'Geequlim', desc: 'Godot engine', icon: '🎮', category: 'GameDev', installed: false, downloads: '500K', rating: 4.6 },
  { id: 'hlsl', name: 'Shader languages', publisher: 'slevesque', desc: 'HLSL/GLSL support', icon: '🎨', category: 'GameDev', installed: false, downloads: '500K', rating: 4.5 },

  // MOBILE
  { id: 'expo', name: 'Expo Tools', publisher: 'expo', desc: 'Expo development', icon: '📱', category: 'Mobile', installed: false, downloads: '300K', rating: 4.5 },
  { id: 'ionic', name: 'Ionic', publisher: 'Ionic', desc: 'Ionic framework', icon: '💎', category: 'Mobile', installed: false, downloads: '200K', rating: 4.3 },

  // NOTEBOOKS
  { id: 'quarto', name: 'Quarto', publisher: 'quarto', desc: 'Quarto documents', icon: '📄', category: 'Notebooks', installed: false, downloads: '500K', rating: 4.7 },
  { id: 'polyglot', name: 'Polyglot Notebooks', publisher: 'ms-dotnettools', desc: 'Multi-language', icon: '📓', category: 'Notebooks', installed: false, downloads: '300K', rating: 4.5 },

  // TOOLS
  { id: 'hexeditor', name: 'Hex Editor', publisher: 'Microsoft', desc: 'Binary editor', icon: '🔢', category: 'Tools', installed: false, downloads: '2M', rating: 4.6 },
  { id: 'pdf', name: 'PDF Viewer', publisher: 'mathematic', desc: 'View PDF files', icon: '📕', category: 'Tools', installed: false, downloads: '1M', rating: 4.3 },
  { id: 'draw-io', name: 'Draw.io', publisher: 'hediet', desc: 'Diagram editor', icon: '📊', category: 'Tools', installed: false, downloads: '2M', rating: 4.7 },
  { id: 'plantuml', name: 'PlantUML', publisher: 'jebbs', desc: 'UML diagrams', icon: '📊', category: 'Tools', installed: false, downloads: '2M', rating: 4.6 },
  { id: 'color-highlight', name: 'Color Highlight', publisher: 'naumovs', desc: 'Color visualization', icon: '🎨', category: 'Tools', installed: false, downloads: '3M', rating: 4.6 },
  { id: 'live-sass', name: 'Live Sass Compiler', publisher: 'ritwickdey', desc: 'Compile Sass', icon: '🎀', category: 'Tools', installed: false, downloads: '4M', rating: 4.6 },

  // LOCALIZATION
  { id: 'lang-chinese', name: 'Chinese Language Pack', publisher: 'Microsoft', desc: '简体中文', icon: '🇨🇳', category: 'Localization', installed: false, downloads: '8M', rating: 4.7 },
  { id: 'lang-japanese', name: 'Japanese Language Pack', publisher: 'Microsoft', desc: '日本語', icon: '🇯🇵', category: 'Localization', installed: false, downloads: '3M', rating: 4.7 },
  { id: 'lang-korean', name: 'Korean Language Pack', publisher: 'Microsoft', desc: '한국어', icon: '🇰🇷', category: 'Localization', installed: false, downloads: '2M', rating: 4.7 },
  { id: 'lang-spanish', name: 'Spanish Language Pack', publisher: 'Microsoft', desc: 'Español', icon: '🇪🇸', category: 'Localization', installed: false, downloads: '2M', rating: 4.6 },
  { id: 'lang-indonesian', name: 'Indonesian Language Pack', publisher: 'nicsonlmao', desc: 'Indonesia', icon: '🇮🇩', category: 'Localization', installed: false, downloads: '500K', rating: 4.5 },

  // MORE WEB
  { id: 'turbo-console', name: 'Turbo Console Log', publisher: 'ChakrounAnas', desc: 'Quick console.log', icon: '🔧', category: 'Web', installed: false, downloads: '3M', rating: 4.6 },
  { id: 'console-ninja', name: 'Console Ninja', publisher: 'nicsonlmao', desc: 'Console in editor', icon: '🥷', category: 'Web', installed: false, downloads: '500K', rating: 4.7 },
  { id: 'headwind', name: 'Headwind', publisher: 'heybourn', desc: 'Tailwind class sorter', icon: '🌬️', category: 'Web', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'i18n-ally', name: 'i18n Ally', publisher: 'Lokalise', desc: 'i18n management', icon: '🌍', category: 'Web', installed: false, downloads: '1M', rating: 4.7 },
  { id: 'version-lens', name: 'Version Lens', publisher: 'pflannery', desc: 'Package versions', icon: '🔍', category: 'Web', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'total-typescript', name: 'Total TypeScript', publisher: 'mattpocock', desc: 'TS error translator', icon: '🔷', category: 'Web', installed: false, downloads: '500K', rating: 4.8 },

  // MORE LANGUAGES
  { id: 'solidity', name: 'Solidity', publisher: 'JuanBlanco', desc: 'Solidity support', icon: '💎', category: 'Languages', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'bicep', name: 'Bicep', publisher: 'Microsoft', desc: 'Azure Bicep', icon: '💪', category: 'Languages', installed: false, downloads: '500K', rating: 4.6 },
  { id: 'nix', name: 'Nix IDE', publisher: 'jnoortheen', desc: 'Nix language', icon: '❄️', category: 'Languages', installed: false, downloads: '300K', rating: 4.5 },
  { id: 'jsonnet', name: 'Jsonnet', publisher: 'grafana', desc: 'Jsonnet support', icon: '📋', category: 'Languages', installed: false, downloads: '200K', rating: 4.5 },
  { id: 'bazel', name: 'Bazel', publisher: 'BazelBuild', desc: 'Bazel build', icon: '🔨', category: 'Languages', installed: false, downloads: '300K', rating: 4.4 },

  // MORE DATABASE
  { id: 'dynamodb', name: 'DynamoDB', publisher: 'nicsonlmao', desc: 'DynamoDB support', icon: '🗄️', category: 'Database', installed: false, downloads: '100K', rating: 4.3 },
  { id: 'neo4j', name: 'Neo4j', publisher: 'nicsonlmao', desc: 'Neo4j graph DB', icon: '🔵', category: 'Database', installed: false, downloads: '100K', rating: 4.4 },
  { id: 'elasticsearch', name: 'Elasticsearch', publisher: 'nicsonlmao', desc: 'Elasticsearch', icon: '🔍', category: 'Database', installed: false, downloads: '200K', rating: 4.4 },

  // MORE DEVOPS
  { id: 'jenkins', name: 'Jenkins Pipeline', publisher: 'secanis', desc: 'Jenkinsfile', icon: '🔧', category: 'DevOps', installed: false, downloads: '500K', rating: 4.4 },
  { id: 'vault', name: 'HashiCorp Vault', publisher: 'HashiCorp', desc: 'Vault secrets', icon: '🔐', category: 'DevOps', installed: false, downloads: '300K', rating: 4.5 },
  { id: 'packer', name: 'HashiCorp Packer', publisher: 'HashiCorp', desc: 'Packer support', icon: '📦', category: 'DevOps', installed: false, downloads: '200K', rating: 4.4 },
  { id: 'prometheus', name: 'Prometheus', publisher: 'nicsonlmao', desc: 'PromQL support', icon: '🔥', category: 'DevOps', installed: false, downloads: '200K', rating: 4.5 },
  { id: 'grafana', name: 'Grafana', publisher: 'Grafana', desc: 'Grafana dashboards', icon: '📊', category: 'DevOps', installed: false, downloads: '200K', rating: 4.5 },

  // MORE THEMES
  { id: 'rose-pine', name: 'Rosé Pine', publisher: 'mvllow', desc: 'Elegant theme', icon: '🌹', category: 'Themes', installed: false, downloads: '500K', rating: 4.8 },
  { id: 'bearded', name: 'Bearded Theme', publisher: 'BeardedBear', desc: 'Varied colors', icon: '🧔', category: 'Themes', installed: false, downloads: '500K', rating: 4.7 },
  { id: 'andromeda', name: 'Andromeda', publisher: 'EliverLara', desc: 'Dark purple', icon: '🌌', category: 'Themes', installed: false, downloads: '500K', rating: 4.7 },
  { id: 'horizon', name: 'Horizon Theme', publisher: 'jolaleye', desc: 'Warm colors', icon: '🌅', category: 'Themes', installed: false, downloads: '500K', rating: 4.7 },
  { id: 'panda', name: 'Panda Theme', publisher: 'tinkertrain', desc: 'Minimal dark', icon: '🐼', category: 'Themes', installed: false, downloads: '500K', rating: 4.6 },

  // MORE PRODUCTIVITY
  { id: 'tabnout', name: 'TabOut', publisher: 'albert', desc: 'Tab out of quotes', icon: '↹', category: 'Productivity', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'rewrap', name: 'Rewrap', publisher: 'stkb', desc: 'Rewrap comments', icon: '📝', category: 'Productivity', installed: false, downloads: '500K', rating: 4.6 },
  { id: 'trailing-spaces', name: 'Trailing Spaces', publisher: 'shardulm94', desc: 'Highlight trailing', icon: '⬜', category: 'Productivity', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'file-nesting', name: 'File Nesting Updater', publisher: 'antfu', desc: 'File nesting', icon: '📁', category: 'Productivity', installed: false, downloads: '500K', rating: 4.7 },

  // MORE TESTING
  { id: 'mocha', name: 'Mocha Test Explorer', publisher: 'hbenl', desc: 'Mocha runner', icon: '☕', category: 'Testing', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'k6', name: 'k6', publisher: 'Grafana', desc: 'Load testing', icon: '📈', category: 'Testing', installed: false, downloads: '100K', rating: 4.5 },

  // MORE AI
  { id: 'intellicode', name: 'IntelliCode', publisher: 'Microsoft', desc: 'AI-assisted dev', icon: '🧠', category: 'AI', installed: false, downloads: '10M', rating: 4.5 },
  { id: 'codegpt', name: 'CodeGPT', publisher: 'nicsonlmao', desc: 'ChatGPT in editor', icon: '🤖', category: 'AI', installed: false, downloads: '1M', rating: 4.4 },
  { id: 'blackbox', name: 'Blackbox AI', publisher: 'BLACKBOX', desc: 'AI autocomplete', icon: '⬛', category: 'AI', installed: false, downloads: '2M', rating: 4.3 },

  // MORE ICONS
  { id: 'helium-icons', name: 'Helium Icon Theme', publisher: 'helium', desc: 'Helium icons', icon: '💜', category: 'Icons', installed: false, downloads: '300K', rating: 4.6 },
  { id: 'bearded-icons', name: 'Bearded Icons', publisher: 'BeardedBear', desc: 'Bearded icons', icon: '🧔', category: 'Icons', installed: false, downloads: '200K', rating: 4.6 },

  // MORE FORMATTERS
  { id: 'sort-imports', name: 'Sort Imports', publisher: 'amatiasq', desc: 'Sort ES imports', icon: '📋', category: 'Formatters', installed: false, downloads: '1M', rating: 4.5 },

  // MORE EXTENSION PACKS
  { id: 'angular-essentials', name: 'Angular Essentials', publisher: 'johnpapa', desc: 'Angular pack', icon: '🅰️', category: 'Web', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'python-ext-pack', name: 'Python Extension Pack', publisher: 'donjayamanne', desc: 'Python pack', icon: '🐍', category: 'Languages', installed: false, downloads: '2M', rating: 4.5 },

  // MORE SNIPPETS
  { id: 'react-hooks-snippets', name: 'React Hooks Snippets', publisher: 'AlDuncanson', desc: 'React hooks', icon: '⚛️', category: 'Snippets', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'nextjs-snippets', name: 'Next.js Snippets', publisher: 'PulkitGangwar', desc: 'Next.js code', icon: '▲', category: 'Snippets', installed: false, downloads: '300K', rating: 4.5 },
  { id: 'vue3-snippets', name: 'Vue 3 Snippets', publisher: 'hollowtree', desc: 'Vue 3 code', icon: '💚', category: 'Snippets', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'angular-snippets', name: 'Angular Snippets', publisher: 'johnpapa', desc: 'Angular code', icon: '🅰️', category: 'Snippets', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'django-snippets', name: 'Django Snippets', publisher: 'bibhasdn', desc: 'Django code', icon: '🐍', category: 'Snippets', installed: false, downloads: '300K', rating: 4.4 },
  { id: 'express-snippets', name: 'Express Snippets', publisher: 'nicsonlmao', desc: 'Express.js', icon: '🟢', category: 'Snippets', installed: false, downloads: '300K', rating: 4.4 },

  // MORE SECURITY
  { id: 'hadolint', name: 'Hadolint', publisher: 'exiasr', desc: 'Dockerfile lint', icon: '🐳', category: 'Security', installed: false, downloads: '300K', rating: 4.5 },
  { id: 'tfsec', name: 'tfsec', publisher: 'tfsec', desc: 'Terraform security', icon: '🔒', category: 'Security', installed: false, downloads: '100K', rating: 4.4 },

  // MORE DATA
  { id: 'sql-formatter', name: 'SQL Formatter', publisher: 'adpyke', desc: 'Format SQL', icon: '🗃️', category: 'Data', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'data-preview', name: 'Data Preview', publisher: 'RandomFractalsInc', desc: 'Data viz', icon: '📊', category: 'Data', installed: false, downloads: '300K', rating: 4.5 },

  // MORE GIT
  { id: 'git-stash', name: 'Git Stash', publisher: 'arturock', desc: 'Stash management', icon: '📦', category: 'Git', installed: false, downloads: '200K', rating: 4.4 },

  // MORE MARKDOWN
  { id: 'markdown-pdf', name: 'Markdown PDF', publisher: 'yzane', desc: 'Export to PDF', icon: '📕', category: 'Markdown', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'markdown-toc', name: 'Markdown TOC', publisher: 'AlanWalk', desc: 'Table of contents', icon: '📑', category: 'Markdown', installed: false, downloads: '500K', rating: 4.4 },
  { id: 'markdown-emoji', name: 'Markdown Emoji', publisher: 'bierner', desc: 'Emoji support', icon: '😀', category: 'Markdown', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'markdown-math', name: 'Markdown Math', publisher: 'goessner', desc: 'Math equations', icon: '📐', category: 'Markdown', installed: false, downloads: '500K', rating: 4.5 },

  // MORE REMOTE
  { id: 'sftp', name: 'SFTP', publisher: 'Natizyskunk', desc: 'SFTP support', icon: '📁', category: 'Remote', installed: false, downloads: '2M', rating: 4.5 },

  // MORE TOOLS  
  { id: 'faker', name: 'Faker', publisher: 'nicsonlmao', desc: 'Generate fake data', icon: '🎭', category: 'Tools', installed: false, downloads: '200K', rating: 4.4 },
  { id: 'jwt-debugger', name: 'JWT Debugger', publisher: 'nicsonlmao', desc: 'Debug JWT tokens', icon: '🔐', category: 'Tools', installed: false, downloads: '300K', rating: 4.5 },
  { id: 'base64', name: 'Base64 Encoder', publisher: 'nicsonlmao', desc: 'Encode/decode', icon: '🔢', category: 'Tools', installed: false, downloads: '300K', rating: 4.4 },

  // MORE LOCALIZATION
  { id: 'lang-arabic', name: 'Arabic Language Pack', publisher: 'Microsoft', desc: 'العربية', icon: '🇸🇦', category: 'Localization', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'lang-hindi', name: 'Hindi Language Pack', publisher: 'nicsonlmao', desc: 'हिन्दी', icon: '🇮🇳', category: 'Localization', installed: false, downloads: '300K', rating: 4.4 },
  { id: 'lang-vietnamese', name: 'Vietnamese Language Pack', publisher: 'nicsonlmao', desc: 'Tiếng Việt', icon: '🇻🇳', category: 'Localization', installed: false, downloads: '300K', rating: 4.5 },

  // ADDITIONAL POPULAR EXTENSIONS
  { id: 'code-runner', name: 'Code Runner', publisher: 'Jun Han', desc: 'Run code snippet', icon: '▶️', category: 'Tools', installed: false, downloads: '15M', rating: 4.6 },
  { id: 'output-colorizer', name: 'Output Colorizer', publisher: 'IBM', desc: 'Colorize log files', icon: '🎨', category: 'Tools', installed: false, downloads: '2M', rating: 4.5 },
  { id: 'log-file-highlighter', name: 'Log File Highlighter', publisher: 'emilast', desc: 'Highlight logs', icon: '📋', category: 'Tools', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'dotenv-vault', name: 'Dotenv Vault', publisher: 'dotenv', desc: 'Sync .env files', icon: '🔐', category: 'Security', installed: false, downloads: '200K', rating: 4.4 },
  { id: 'diff', name: 'Diff', publisher: 'fabiospampinato', desc: 'Diff two files', icon: '📊', category: 'Tools', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'database-client', name: 'Database Client', publisher: 'cweijan', desc: 'Universal DB client', icon: '🗄️', category: 'Database', installed: false, downloads: '1M', rating: 4.6 },
  { id: 'code-time', name: 'Code Time', publisher: 'Software', desc: 'Coding metrics', icon: '⏱️', category: 'Productivity', installed: false, downloads: '1M', rating: 4.4 },
  { id: 'settings-sync', name: 'Settings Sync', publisher: 'Shan', desc: 'Sync VS Code settings', icon: '🔄', category: 'Productivity', installed: false, downloads: '3M', rating: 4.5 },
  { id: 'workspace', name: 'Workspace', publisher: 'nicsonlmao', desc: 'Workspace management', icon: '📂', category: 'Productivity', installed: false, downloads: '200K', rating: 4.4 },
  { id: 'filesize', name: 'filesize', publisher: 'mkxml', desc: 'Show file size', icon: '📏', category: 'Tools', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'css-navigation', name: 'CSS Navigation', publisher: 'nicsonlmao', desc: 'CSS class navigation', icon: '🎨', category: 'Web', installed: false, downloads: '300K', rating: 4.4 },
  { id: 'auto-complete-tag', name: 'Auto Complete Tag', publisher: 'Jun Han', desc: 'HTML tag completion', icon: '🏷️', category: 'Web', installed: false, downloads: '3M', rating: 4.5 },
  { id: 'dotnet-runtime', name: '.NET Runtime Install', publisher: 'Microsoft', desc: '.NET runtime', icon: '🟣', category: 'Languages', installed: false, downloads: '5M', rating: 4.4 },
  { id: 'vscode-solution-explorer', name: 'Solution Explorer', publisher: 'fernandoescolar', desc: '.NET solution', icon: '📁', category: 'Languages', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'yaml-sort', name: 'YAML Sort', publisher: 'nicsonlmao', desc: 'Sort YAML keys', icon: '📋', category: 'Data', installed: false, downloads: '200K', rating: 4.4 },
  { id: 'json-to-ts', name: 'JSON to TS', publisher: 'MariusAlchiworkit', desc: 'JSON to TypeScript', icon: '🔷', category: 'Data', installed: false, downloads: '500K', rating: 4.5 },
  { id: 'debug-visualizer', name: 'Debug Visualizer', publisher: 'hediet', desc: 'Debug data viz', icon: '📊', category: 'Debugging', installed: false, downloads: '500K', rating: 4.6 },
  { id: 'turbo-console-log', name: 'Turbo Console Log', publisher: 'nicsonlmao', desc: 'Quick logging', icon: '🔧', category: 'Debugging', installed: false, downloads: '1M', rating: 4.5 },
  { id: 'github-theme-default', name: 'GitHub Theme Default', publisher: 'nicsonlmao', desc: 'GitHub default', icon: '🐙', category: 'Themes', installed: false, downloads: '200K', rating: 4.5 },
  { id: 'min-theme', name: 'Min Theme', publisher: 'miguelsolorio', desc: 'Minimal theme', icon: '⬜', category: 'Themes', installed: false, downloads: '500K', rating: 4.7 },
  { id: 'fluent-icons', name: 'Fluent Icons', publisher: 'miguelsolorio', desc: 'Fluent design icons', icon: '🎨', category: 'Icons', installed: false, downloads: '500K', rating: 4.7 },
  { id: 'carbon-icons', name: 'Carbon Icons', publisher: 'nicsonlmao', desc: 'IBM Carbon icons', icon: '⬛', category: 'Icons', installed: false, downloads: '200K', rating: 4.5 },
  { id: 'test-adapter', name: 'Test Adapter Converter', publisher: 'hbenl', desc: 'Test adapter', icon: '🧪', category: 'Testing', installed: false, downloads: '500K', rating: 4.4 },
  { id: 'testify', name: 'Testify', publisher: 'nicsonlmao', desc: 'Test generator', icon: '🧪', category: 'Testing', installed: false, downloads: '200K', rating: 4.4 },
  { id: 'aider', name: 'Aider', publisher: 'nicsonlmao', desc: 'AI pair programming', icon: '🤖', category: 'AI', installed: false, downloads: '200K', rating: 4.5 },
  { id: 'supermaven', name: 'Supermaven', publisher: 'supermaven', desc: 'Fast AI completion', icon: '⚡', category: 'AI', installed: false, downloads: '300K', rating: 4.6 },
];

export const categories = [
  'All', 'Languages', 'Web', 'Formatters', 'Git', 'DevOps', 'Remote', 'AI', 
  'Testing', 'Database', 'Productivity', 'Themes', 'Icons', 'Markdown',
  'Data', 'Security', 'Snippets', 'Keymaps', 'Debugging', 'Documentation',
  'GameDev', 'Mobile', 'Notebooks', 'Tools', 'Localization'
];



