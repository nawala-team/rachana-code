import { useState, useRef, useEffect } from 'react';
import { SettingsIcon, TrashIcon, LightbulbIcon, TestTubeIcon, SparklesIcon, WrenchIcon, RobotIcon, UserIcon, SendIcon, BackArrowIcon, HintIcon } from '../Icons/Icons';
import './AIAssistantPanel.css';

interface Message { id: string; role: 'user' | 'assistant'; content: string; }
interface LLMConfig { provider: string; model: string; apiKey: string; baseUrl: string; }

const providers = [
  { id: 'openai', name: 'OpenAI', models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'] },
  { id: 'anthropic', name: 'Anthropic', models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'] },
  { id: 'ollama', name: 'Ollama (Local)', models: ['llama3', 'codellama', 'mistral'] },
  { id: 'openrouter', name: 'OpenRouter', models: ['auto', 'gpt-4', 'claude-3'] },
  { id: 'google', name: 'Google AI', models: ['gemini-pro', 'gemini-ultra'] },
  { id: 'custom', name: 'Custom', models: ['custom'] },
];

const quickActions = [
  { icon: <LightbulbIcon size={14} />, label: 'Explain', prompt: 'Explain this code' },
  { icon: <TestTubeIcon size={14} />, label: 'Tests', prompt: 'Generate tests' },
  { icon: <SparklesIcon size={14} />, label: 'Refactor', prompt: 'Refactor this' },
  { icon: <WrenchIcon size={14} />, label: 'Fix', prompt: 'Fix bugs' },
];

export default function AIAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Configure your LLM in settings, then ask me anything!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState<LLMConfig>(() => {
    const s = localStorage.getItem('ai-config');
    return s ? JSON.parse(s) : { provider: 'openai', model: 'gpt-4', apiKey: '', baseUrl: '' };
  });
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { localStorage.setItem('ai-config', JSON.stringify(config)); }, [config]);

  const provider = providers.find(p => p.id === config.provider) || providers[0];

  const send = () => {
    if (!input.trim() || loading) return;
    if (!config.apiKey && config.provider !== 'ollama') {
      setShowSettings(true); return;
    }
    setMessages(m => [...m, { id: Date.now().toString(), role: 'user', content: input }]);
    setInput(''); setLoading(true);
    setTimeout(() => {
      setMessages(m => [...m, { id: (Date.now()+1).toString(), role: 'assistant', 
        content: `[${config.model}] Simulated response. Connect to real LLM API in production.\n\n\`\`\`ts\nconst x = 1;\n\`\`\`` }]);
      setLoading(false);
    }, 800);
  };

  if (showSettings) return (
    <div className="ai-panel">
      <div className="ai-settings">
        <div className="ai-settings-header">
          <h3><SettingsIcon size={16} /> LLM Settings</h3>
          <button onClick={() => setShowSettings(false)}><BackArrowIcon size={14} /> Back</button>
        </div>
        <label>Provider</label>
        <select value={config.provider} onChange={e => setConfig({...config, provider: e.target.value, model: providers.find(p=>p.id===e.target.value)?.models[0]||''})}>
          {providers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <label>Model</label>
        <select value={config.model} onChange={e => setConfig({...config, model: e.target.value})}>
          {provider.models.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <label>API Key</label>
        <input type="password" value={config.apiKey} onChange={e => setConfig({...config, apiKey: e.target.value})} placeholder="sk-..." />
        <label>Base URL (optional)</label>
        <input value={config.baseUrl} onChange={e => setConfig({...config, baseUrl: e.target.value})} placeholder="https://api.openai.com/v1" />
        {config.provider === 'ollama' && <p className="ai-hint"><HintIcon size={14} /> Run: ollama run llama3</p>}
      </div>
    </div>
  );

  return (
    <div className="ai-panel">
      <div className="ai-header">
        <span className="ai-badge">{provider.name} / {config.model}</span>
        <div><button onClick={() => setShowSettings(true)}><SettingsIcon size={14} /></button><button onClick={() => setMessages([])}><TrashIcon size={14} /></button></div>
      </div>
      <div className="ai-quick">{quickActions.map((a,i) => <button key={i} onClick={() => setInput(a.prompt)}>{a.icon} {a.label}</button>)}</div>
      <div className="ai-messages">
        {messages.map(m => <div key={m.id} className={`ai-msg ai-${m.role}`}><span>{m.role==='assistant'?<RobotIcon size={14} />:<UserIcon size={14} />}</span><div>{m.content}</div></div>)}
        {loading && <div className="ai-msg ai-assistant"><span><RobotIcon size={14} /></span><div className="ai-loading">...</div></div>}
        <div ref={endRef} />
      </div>
      <div className="ai-input-row">
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask anything..." />
        <button onClick={send} disabled={loading}><SendIcon size={14} /></button>
      </div>
    </div>
  );
}
