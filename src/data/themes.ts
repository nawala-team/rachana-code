export interface Theme {
  id: string;
  name: string;
  type: 'dark' | 'light';
  colors: {
    bg: string;
    bgSecondary: string;
    bgHover: string;
    text: string;
    textMuted: string;
    accent: string;
    border: string;
    editor: string;
    editorLineHighlight: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'rachana-dark', name: 'Rachana Dark', type: 'dark',
    colors: { bg: '#1e1e2e', bgSecondary: '#181825', bgHover: '#313244', text: '#cdd6f4', textMuted: '#6c7086', accent: '#cba6f7', border: '#313244', editor: '#1e1e2e', editorLineHighlight: '#313244' }
  },
  {
    id: 'rachana-light', name: 'Rachana Light', type: 'light',
    colors: { bg: '#eff1f5', bgSecondary: '#e6e9ef', bgHover: '#ccd0da', text: '#4c4f69', textMuted: '#7c7f93', accent: '#8839ef', border: '#ccd0da', editor: '#eff1f5', editorLineHighlight: '#e6e9ef' }
  },
  {
    id: 'dracula', name: 'Dracula', type: 'dark',
    colors: { bg: '#282a36', bgSecondary: '#21222c', bgHover: '#44475a', text: '#f8f8f2', textMuted: '#6272a4', accent: '#bd93f9', border: '#44475a', editor: '#282a36', editorLineHighlight: '#44475a' }
  },
  {
    id: 'tokyo-night', name: 'Tokyo Night', type: 'dark',
    colors: { bg: '#1a1b26', bgSecondary: '#16161e', bgHover: '#292e42', text: '#c0caf5', textMuted: '#565f89', accent: '#7aa2f7', border: '#292e42', editor: '#1a1b26', editorLineHighlight: '#292e42' }
  },
  {
    id: 'one-dark', name: 'One Dark Pro', type: 'dark',
    colors: { bg: '#282c34', bgSecondary: '#21252b', bgHover: '#2c313c', text: '#abb2bf', textMuted: '#5c6370', accent: '#61afef', border: '#3e4451', editor: '#282c34', editorLineHighlight: '#2c313c' }
  },
  {
    id: 'github-dark', name: 'GitHub Dark', type: 'dark',
    colors: { bg: '#0d1117', bgSecondary: '#010409', bgHover: '#161b22', text: '#c9d1d9', textMuted: '#8b949e', accent: '#58a6ff', border: '#30363d', editor: '#0d1117', editorLineHighlight: '#161b22' }
  },
  {
    id: 'github-light', name: 'GitHub Light', type: 'light',
    colors: { bg: '#ffffff', bgSecondary: '#f6f8fa', bgHover: '#f3f4f6', text: '#24292f', textMuted: '#57606a', accent: '#0969da', border: '#d0d7de', editor: '#ffffff', editorLineHighlight: '#f6f8fa' }
  },
  {
    id: 'nord', name: 'Nord', type: 'dark',
    colors: { bg: '#2e3440', bgSecondary: '#3b4252', bgHover: '#434c5e', text: '#eceff4', textMuted: '#4c566a', accent: '#88c0d0', border: '#4c566a', editor: '#2e3440', editorLineHighlight: '#3b4252' }
  },
  {
    id: 'catppuccin-mocha', name: 'Catppuccin Mocha', type: 'dark',
    colors: { bg: '#1e1e2e', bgSecondary: '#181825', bgHover: '#313244', text: '#cdd6f4', textMuted: '#6c7086', accent: '#f5c2e7', border: '#313244', editor: '#1e1e2e', editorLineHighlight: '#313244' }
  },
  {
    id: 'catppuccin-latte', name: 'Catppuccin Latte', type: 'light',
    colors: { bg: '#eff1f5', bgSecondary: '#e6e9ef', bgHover: '#ccd0da', text: '#4c4f69', textMuted: '#8c8fa1', accent: '#ea76cb', border: '#ccd0da', editor: '#eff1f5', editorLineHighlight: '#e6e9ef' }
  },
  {
    id: 'synthwave', name: "SynthWave '84", type: 'dark',
    colors: { bg: '#262335', bgSecondary: '#1e1a2b', bgHover: '#34294f', text: '#ffffff', textMuted: '#848bbd', accent: '#ff7edb', border: '#495495', editor: '#262335', editorLineHighlight: '#34294f' }
  },
  {
    id: 'night-owl', name: 'Night Owl', type: 'dark',
    colors: { bg: '#011627', bgSecondary: '#01111d', bgHover: '#0b2942', text: '#d6deeb', textMuted: '#637777', accent: '#82aaff', border: '#122d42', editor: '#011627', editorLineHighlight: '#0b2942' }
  },
  {
    id: 'monokai', name: 'Monokai Pro', type: 'dark',
    colors: { bg: '#2d2a2e', bgSecondary: '#221f22', bgHover: '#403e41', text: '#fcfcfa', textMuted: '#727072', accent: '#ffd866', border: '#403e41', editor: '#2d2a2e', editorLineHighlight: '#403e41' }
  },
  {
    id: 'solarized-dark', name: 'Solarized Dark', type: 'dark',
    colors: { bg: '#002b36', bgSecondary: '#073642', bgHover: '#094959', text: '#839496', textMuted: '#586e75', accent: '#268bd2', border: '#073642', editor: '#002b36', editorLineHighlight: '#073642' }
  },
  {
    id: 'solarized-light', name: 'Solarized Light', type: 'light',
    colors: { bg: '#fdf6e3', bgSecondary: '#eee8d5', bgHover: '#e4dcc8', text: '#657b83', textMuted: '#93a1a1', accent: '#268bd2', border: '#eee8d5', editor: '#fdf6e3', editorLineHighlight: '#eee8d5' }
  },
];

export const getTheme = (id: string) => themes.find(t => t.id === id) || themes[0];
