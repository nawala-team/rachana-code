import { useState } from 'react';
import { extensions as allExtensions, categories, type Extension } from '../../data/extensions';
import { SearchIcon, DownloadIcon, StarIcon } from '../Icons/Icons';
import './ExtensionsPanel.css';

export default function ExtensionsPanel() {
  const [exts, setExts] = useState<Extension[]>(allExtensions);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const toggle = (id: string) => {
    setExts(exts.map(e => e.id === id ? { ...e, installed: !e.installed } : e));
  };

  const list = exts.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.desc.toLowerCase().includes(search.toLowerCase()) ||
      e.publisher.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || e.category === category;
    return matchSearch && matchCat;
  });

  const installed = exts.filter(e => e.installed).length;

  return (
    <div className="ext-panel">
      <div className="ext-header">
        <div className="ext-search-wrapper">
          <SearchIcon size={14} />
          <input type="text" placeholder="Search extensions..." value={search}
            onChange={(e) => setSearch(e.target.value)} className="ext-search" />
        </div>
        <div className="ext-stats">
          <span className="stat">{exts.length} available</span>
          <span className="stat installed">{installed} installed</span>
        </div>
        <div className="ext-cats">
          {categories.map(cat => (
            <button key={cat} className={`cat-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="ext-list">
        {list.map(e => (
          <div key={e.id} className={`ext-card ${e.installed ? 'is-installed' : ''}`}>
            <div className="ext-icon">{e.icon}</div>
            <div className="ext-body">
              <div className="ext-title">
                <span className="ext-name">{e.name}</span>
                <span className="ext-rating">{Array.from({length: Math.round(e.rating)}).map((_, i) => <StarIcon key={i} size={10} />)}</span>
              </div>
              <div className="ext-meta">{e.publisher} <DownloadIcon size={10} /> {e.downloads}</div>
              <div className="ext-desc">{e.desc}</div>
            </div>
            <button className={`ext-btn ${e.installed ? 'remove' : 'install'}`} 
              onClick={() => toggle(e.id)}>
              {e.installed ? 'Remove' : 'Install'}
            </button>
          </div>
        ))}
        {list.length === 0 && <div className="ext-empty">No extensions found</div>}
      </div>
    </div>
  );
}
