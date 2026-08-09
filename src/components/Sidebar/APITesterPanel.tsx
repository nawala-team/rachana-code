import { useState } from 'react';
import { RocketIcon, HistoryIcon, PlayIcon, LoadingIcon } from '../Icons/Icons';
import './APITesterPanel.css';

interface RequestHistory {
  id: string;
  method: string;
  url: string;
  status?: number;
  time?: number;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const methodColors: Record<HttpMethod, string> = {
  GET: '#61affe', POST: '#49cc90', PUT: '#fca130', PATCH: '#50e3c2', DELETE: '#f93e3e',
};

export default function APITesterPanel() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [body, setBody] = useState('{\n  "title": "foo",\n  "body": "bar"\n}');
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'body' | 'headers'>('body');
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const sendRequest = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const options: RequestInit = { method, headers: JSON.parse(headers) };
      if (method !== 'GET') options.body = body;
      const res = await fetch(url, options);
      const data = await res.text();
      setStatus(res.status);
      setResponseTime(Date.now() - startTime);
      try { setResponse(JSON.stringify(JSON.parse(data), null, 2)); } catch { setResponse(data); }
      setHistory(prev => [{ id: Date.now().toString(), method, url, status: res.status, time: Date.now() - startTime }, ...prev.slice(0, 9)]);
    } catch (err) {
      setResponse(`Error: ${err instanceof Error ? err.message : 'Failed'}`);
      setStatus(0);
    }
    setLoading(false);
  };

  const statusClass = (s: number) => s >= 200 && s < 300 ? 'success' : s >= 400 ? 'error' : 'warning';

  return (
    <div className="api-tester">
      <div className="api-header"><h3><RocketIcon size={16} /> API Tester</h3></div>
      <div className="request-bar">
        <select value={method} onChange={e => setMethod(e.target.value as HttpMethod)} className="method-select" style={{ color: methodColors[method] }}>
          {Object.keys(methodColors).map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter URL..." className="url-input" />
        <button onClick={sendRequest} disabled={loading} className="send-btn">{loading ? <LoadingIcon size={12} /> : <PlayIcon size={12} />} Send</button>
      </div>
      <div className="request-tabs">
        <button className={activeTab === 'body' ? 'active' : ''} onClick={() => setActiveTab('body')}>Body</button>
        <button className={activeTab === 'headers' ? 'active' : ''} onClick={() => setActiveTab('headers')}>Headers</button>
      </div>
      <textarea className="request-body" value={activeTab === 'body' ? body : headers} onChange={e => activeTab === 'body' ? setBody(e.target.value) : setHeaders(e.target.value)} spellCheck={false} />
      <div className="response-section">
        <div className="response-header">
          <span>Response</span>
          {status !== null && <span className={`status-badge ${statusClass(status)}`}>{status || 'Err'}</span>}
          {responseTime && <span className="response-time">{responseTime}ms</span>}
        </div>
        <pre className="response-body">{loading ? 'Loading...' : response || 'Send a request to see response'}</pre>
      </div>
      {history.length > 0 && (
        <div className="history-section">
          <div className="history-header"><HistoryIcon size={14} /> History</div>
          {history.map(h => (
            <div key={h.id} className="history-item" onClick={() => { setMethod(h.method as HttpMethod); setUrl(h.url); }}>
              <span style={{ color: methodColors[h.method as HttpMethod] }}>{h.method}</span>
              <span className="history-url">{h.url.slice(0, 25)}...</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
