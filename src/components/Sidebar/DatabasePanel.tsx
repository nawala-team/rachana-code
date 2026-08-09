import { useState } from 'react';
import { DatabaseIcon, TableIcon, PlugIcon, PlayIcon, LoadingIcon, StatusDot } from '../Icons/Icons';
import './DatabasePanel.css';

interface DbType { id: string; name: string; port: string; }

const dbTypes: DbType[] = [
  { id: 'postgres', name: 'PostgreSQL', port: '5432' },
  { id: 'mysql', name: 'MySQL', port: '3306' },
  { id: 'mariadb', name: 'MariaDB', port: '3306' },
  { id: 'oracle', name: 'Oracle', port: '1521' },
  { id: 'mssql', name: 'SQL Server', port: '1433' },
  { id: 'sqlite', name: 'SQLite', port: '' },
  { id: 'mongodb', name: 'MongoDB', port: '27017' },
  { id: 'redis', name: 'Redis', port: '6379' },
  { id: 'cassandra', name: 'Cassandra', port: '9042' },
  { id: 'dynamodb', name: 'DynamoDB', port: '' },
  { id: 'cockroach', name: 'CockroachDB', port: '26257' },
  { id: 'clickhouse', name: 'ClickHouse', port: '8123' },
];

const mockTables = ['users', 'products', 'orders', 'categories', 'reviews'];
const mockData = [
  { id: 1, name: 'John', email: 'john@test.com' },
  { id: 2, name: 'Jane', email: 'jane@test.com' },
  { id: 3, name: 'Bob', email: 'bob@test.com' },
];

export default function DatabasePanel() {
  const [connected, setConnected] = useState(false);
  const [dbType, setDbType] = useState('postgres');
  const [config, setConfig] = useState({ host: 'localhost', port: '5432', db: '', user: '', pass: '' });
  const [query, setQuery] = useState('SELECT * FROM users LIMIT 10;');
  const [results, setResults] = useState<{ cols: string[]; rows: typeof mockData } | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'tables' | 'query'>('tables');

  const selectDbType = (id: string) => {
    setDbType(id);
    const db = dbTypes.find(d => d.id === id);
    if (db) setConfig(prev => ({ ...prev, port: db.port }));
  };

  const connect = () => setConnected(true);
  const disconnect = () => { setConnected(false); setResults(null); };

  const runQuery = () => {
    setLoading(true);
    setTimeout(() => {
      setResults({ cols: ['id', 'name', 'email'], rows: mockData });
      setLoading(false);
    }, 300);
  };

  if (!connected) {
    return (
      <div className="db-panel">
        <div className="db-form">
          <h3><DatabaseIcon size={16} /> New Connection</h3>
          <label>Type</label>
          <div className="db-type-grid">
            {dbTypes.map(t => (
              <button key={t.id} className={dbType === t.id ? 'active' : ''} onClick={() => selectDbType(t.id)}>
                {t.name}
              </button>
            ))}
          </div>
          <label>Host</label>
          <input value={config.host} onChange={e => setConfig({ ...config, host: e.target.value })} />
          <label>Port</label>
          <input value={config.port} onChange={e => setConfig({ ...config, port: e.target.value })} />
          <label>Database</label>
          <input value={config.db} onChange={e => setConfig({ ...config, db: e.target.value })} placeholder="mydb" />
          <label>Username</label>
          <input value={config.user} onChange={e => setConfig({ ...config, user: e.target.value })} />
          <label>Password</label>
          <input type="password" value={config.pass} onChange={e => setConfig({ ...config, pass: e.target.value })} />
          <button className="db-connect-btn" onClick={connect}><PlugIcon size={14} /> Connect</button>
        </div>
      </div>
    );
  }

  return (
    <div className="db-panel">
      <div className="db-header">
        <span className="db-status"><StatusDot size={8} color="#28a745" /> {dbTypes.find(d => d.id === dbType)?.name}</span>
        <button onClick={disconnect}>Disconnect</button>
      </div>
      <div className="db-tabs">
        <button className={tab === 'tables' ? 'active' : ''} onClick={() => setTab('tables')}>Tables</button>
        <button className={tab === 'query' ? 'active' : ''} onClick={() => setTab('query')}>Query</button>
      </div>
      {tab === 'tables' && (
        <div className="db-tables">
          {mockTables.map(t => (
            <div key={t} className="db-table-item" onClick={() => { setQuery(`SELECT * FROM ${t} LIMIT 100;`); setTab('query'); }}>
              <TableIcon size={14} /> {t}
            </div>
          ))}
        </div>
      )}
      {tab === 'query' && (
        <div className="db-query">
          <textarea value={query} onChange={e => setQuery(e.target.value)} />
          <button onClick={runQuery} disabled={loading}>{loading ? <LoadingIcon size={12} /> : <PlayIcon size={12} />} Run</button>
          {results && (
            <div className="db-results">
              <table>
                <thead><tr>{results.cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
                <tbody>{results.rows.map((r, i) => <tr key={i}>{results.cols.map(c => <td key={c}>{String(r[c as keyof typeof r])}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
