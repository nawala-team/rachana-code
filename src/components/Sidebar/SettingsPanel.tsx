import { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { themes } from '../../data/themes';
import { SearchIcon, PaletteIcon, EditorIcon, SaveIcon, TerminalIcon } from '../Icons/Icons';
import './SettingsPanel.css';

const fonts = ['Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Consolas', 'Cascadia Code', 'Monaco'];

export default function SettingsPanel() {
  const { settings, updateSetting } = useSettings();
  const [search, setSearch] = useState('');

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <div className="settings-search-wrapper">
          <SearchIcon size={14} />
          <input type="text" placeholder="Search settings..." value={search}
            onChange={(e) => setSearch(e.target.value)} className="settings-search" />
        </div>
      </div>
      <div className="settings-content">
        <section className="settings-section">
          <h3><PaletteIcon size={14} /> Appearance</h3>
          <div className="setting-row">
            <span>Color Theme</span>
            <select value={settings.themeId} onChange={(e) => updateSetting('themeId', e.target.value)}>
              {themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="setting-row">
            <span>Sidebar Position</span>
            <select value={settings.sidebarPosition} onChange={(e) => updateSetting('sidebarPosition', e.target.value as 'left' | 'right')}>
              <option value="left">Left</option><option value="right">Right</option>
            </select>
          </div>
          <div className="setting-row">
            <span>Activity Bar</span>
            <input type="checkbox" checked={settings.activityBarVisible} onChange={(e) => updateSetting('activityBarVisible', e.target.checked)} />
          </div>
          <div className="setting-row">
            <span>Breadcrumbs</span>
            <input type="checkbox" checked={settings.breadcrumbs} onChange={(e) => updateSetting('breadcrumbs', e.target.checked)} />
          </div>
        </section>
        <section className="settings-section">
          <h3><EditorIcon size={14} /> Editor</h3>
          <div className="setting-row">
            <span>Font Size</span>
            <input type="number" min={8} max={32} value={settings.fontSize} onChange={(e) => updateSetting('fontSize', +e.target.value)} />
          </div>
          <div className="setting-row">
            <span>Font Family</span>
            <select value={settings.fontFamily.split(',')[0].replace(/'/g, '')} 
              onChange={(e) => updateSetting('fontFamily', `'${e.target.value}', Consolas, monospace`)}>
              {fonts.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="setting-row">
            <span>Tab Size</span>
            <select value={settings.tabSize} onChange={(e) => updateSetting('tabSize', +e.target.value)}>
              <option value={2}>2</option><option value={4}>4</option>
            </select>
          </div>
          <div className="setting-row"><span>Word Wrap</span>
            <input type="checkbox" checked={settings.wordWrap} onChange={(e) => updateSetting('wordWrap', e.target.checked)} /></div>
          <div className="setting-row"><span>Line Numbers</span>
            <input type="checkbox" checked={settings.lineNumbers} onChange={(e) => updateSetting('lineNumbers', e.target.checked)} /></div>
          <div className="setting-row"><span>Minimap</span>
            <input type="checkbox" checked={settings.minimap} onChange={(e) => updateSetting('minimap', e.target.checked)} /></div>
        </section>
        <section className="settings-section">
          <h3><SaveIcon size={14} /> Files</h3>
          <div className="setting-row">
            <span>Auto Save</span>
            <select value={settings.autoSave} onChange={(e) => updateSetting('autoSave', e.target.value as any)}>
              <option value="off">Off</option><option value="afterDelay">After Delay</option><option value="onFocusChange">On Focus Change</option>
            </select>
          </div>
          <div className="setting-row"><span>Format On Save</span>
            <input type="checkbox" checked={settings.formatOnSave} onChange={(e) => updateSetting('formatOnSave', e.target.checked)} /></div>
        </section>
        <section className="settings-section">
          <h3><TerminalIcon size={14} /> Terminal</h3>
          <div className="setting-row">
            <span>Font Size</span>
            <input type="number" min={8} max={24} value={settings.terminalFontSize} onChange={(e) => updateSetting('terminalFontSize', +e.target.value)} />
          </div>
        </section>
      </div>
    </div>
  );
}
