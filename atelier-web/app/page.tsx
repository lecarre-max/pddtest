'use client'
import { useState, useRef, useEffect } from 'react'
import {
  FASHION_GROUPS, HOME_GROUPS, CHARACTER_GROUPS, COLORS,
  generateKeywords, toCN, type Realm, type ChipGroup,
} from '../lib/keywords'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Favourite {
  id: string
  keyword: string
  label: string
  realm: string
  tags: string[]
  savedAt: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function openPDD(keyword: string) {
  const enc = encodeURIComponent(keyword)
  window.open(`https://mobile.yangkeduo.com/search_result.html?search_key=${enc}`, '_blank')
}

function saveFav(item: Omit<Favourite, 'id' | 'savedAt'>) {
  const existing: Favourite[] = JSON.parse(localStorage.getItem('atelier_favs') || '[]')
  const newItem: Favourite = { ...item, id: `${Date.now()}`, savedAt: Date.now() }
  localStorage.setItem('atelier_favs', JSON.stringify([newItem, ...existing]))
  return newItem
}

function loadFavs(): Favourite[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('atelier_favs') || '[]')
}

function removeFav(id: string) {
  const existing: Favourite[] = JSON.parse(localStorage.getItem('atelier_favs') || '[]')
  localStorage.setItem('atelier_favs', JSON.stringify(existing.filter(f => f.id !== id)))
}

// ─── Sub Components ───────────────────────────────────────────────────────────
function Chip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`chip ${selected ? 'chip--selected' : ''}`}>
      {label}
    </button>
  )
}

function ColorSwatch({ color, selected, onToggle }: { color: typeof COLORS[0]; selected: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={color.name}
      className={`swatch ${selected ? 'swatch--selected' : ''}`}
      style={{
        background: color.hex,
        border: selected ? '3px solid var(--gold)' : `2px solid ${color.border || 'transparent'}`,
        boxShadow: selected ? '0 0 0 2px var(--cream), 0 0 0 4px var(--gold)' : 'none',
      }}
    >
      {selected && <span style={{ color: 'white', fontSize: 13, textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>✓</span>}
    </button>
  )
}

function KeywordCard({
  label, keyword, tip, onFav, onOpen, isFav, index
}: {
  label: string; keyword: string; tip: string;
  onFav: () => void; onOpen: () => void; isFav: boolean; index: number
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(keyword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Pinduoduo Keyword', text: `🛍️ 拼多多 search: ${keyword}` })
    } else {
      handleCopy()
    }
  }

  return (
    <div className="kw-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="kw-header">
        <span className="kw-label">{label}</span>
        <span className="kw-tip">{tip}</span>
      </div>
      <p className="kw-text">{keyword}</p>
      <div className="kw-actions">
        <button onClick={handleCopy} className={`kw-btn ${copied ? 'kw-btn--copied' : ''}`}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <button onClick={onOpen} className="kw-btn kw-btn--open">
          Open 拼多多
        </button>
        <button onClick={handleShare} className="kw-btn kw-btn--share">↑</button>
        <button onClick={onFav} className="kw-fav-btn">
          <span style={{ color: isFav ? '#c0392b' : undefined, opacity: isFav ? 1 : 0.4 }}>
            {isFav ? '♥' : '♡'}
          </span>
        </button>
      </div>
    </div>
  )
}

function FavCard({ item, onRemove }: { item: Favourite; onRemove: () => void }) {
  const [copied, setCopied] = useState(false)
  const date = new Date(item.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div className="fav-card">
      <div className="fav-top">
        <div>
          <div className="kw-label">{item.label}</div>
          <div style={{ fontFamily: 'var(--font-serif-italic)', fontSize: 11, color: 'var(--brown-light)', marginTop: 2 }}>{date}</div>
        </div>
        <button onClick={onRemove} style={{ background: 'none', border: 'none', color: 'var(--ink)', opacity: 0.35, cursor: 'pointer', fontSize: 14, padding: 4 }}>✕</button>
      </div>
      <p className="kw-text" style={{ marginBottom: 10 }}>{item.keyword}</p>
      {item.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginBottom: 12 }}>
          {item.tags.slice(0, 5).map(tag => (
            <span key={tag} style={{ background: 'var(--gold-very-light)', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}>{tag}</span>
          ))}
        </div>
      )}
      <div className="kw-actions">
        <button onClick={() => { navigator.clipboard.writeText(item.keyword); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
          className={`kw-btn ${copied ? 'kw-btn--copied' : ''}`}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <button onClick={() => openPDD(item.keyword)} className="kw-btn kw-btn--open">Open 拼多多</button>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [tab, setTab] = useState<'search' | 'wishlist'>('search')
  const [realm, setRealm] = useState<Realm>('fashion')
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [selectedColors, setSelectedColors] = useState<Record<string, boolean>>({})
  const [inspo, setInspo] = useState('')
  const [details, setDetails] = useState('')
  const [keywords, setKeywords] = useState<{ label: string; keyword: string; tip: string }[]>([])
  const [favMap, setFavMap] = useState<Record<number, boolean>>({})
  const [favourites, setFavourites] = useState<Favourite[]>([])
  const [showResult, setShowResult] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setFavourites(loadFavs()) }, [tab])

  const groups: ChipGroup[] = realm === 'fashion' ? FASHION_GROUPS : realm === 'home' ? HOME_GROUPS : CHARACTER_GROUPS

  const toggleChip = (key: string) => setSelected(p => ({ ...p, [key]: !p[key] }))
  const toggleColor = (cn: string) => setSelectedColors(p => ({ ...p, [cn]: !p[cn] }))

  const switchRealm = (r: Realm) => {
    setRealm(r)
    setSelected({})
    setKeywords([])
    setShowResult(false)
  }

  const handleGenerate = () => {
    const cats: string[] = [], styles: string[] = [], chars: string[] = []
    groups.forEach(g => g.items.forEach(item => {
      if (selected[item]) {
        if (g.type === 'cat') cats.push(item)
        else if (g.type === 'style') styles.push(item)
        else chars.push(item)
      }
    }))
    const colors = COLORS.filter(c => selectedColors[c.cn]).map(c => c.cn)
    const kwResults = generateKeywords({ cats, styles, chars, colors, inspo, details })
    if (!kwResults.length) { alert('Please select at least one category, style, or character ✦'); return }
    setKeywords(kwResults)
    setFavMap({})
    setShowResult(false)
    setTimeout(() => {
      setShowResult(true)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }, 50)
  }

  const handleFav = (kw: { label: string; keyword: string }, index: number) => {
    const tags = groups.flatMap(g => g.items.filter(i => selected[i])).slice(0, 5)
    saveFav({ keyword: kw.keyword, label: kw.label, realm, tags })
    setFavMap(p => ({ ...p, [index]: true }))
    setFavourites(loadFavs())
  }

  const handleRemoveFav = (id: string) => {
    removeFav(id)
    setFavourites(loadFavs())
  }

  return (
    <>
      <style>{`
        :root {
          --cream: #F5F0E8;
          --cream-dark: #EDE5D4;
          --cream-light: #FAF7F2;
          --gold: #B8965A;
          --gold-light: #D4A96A;
          --gold-very-light: #F0E4C8;
          --brown: #6B4E2A;
          --brown-dark: #4A3218;
          --brown-light: #9B7448;
          --rose: #C9877A;
          --sage: #8A9E7A;
          --toile-blue: #4A6B8A;
          --ink: #2C1F0E;
          --card-border: rgba(184,150,90,0.3);
          --chip-border: rgba(184,150,90,0.4);
          --font-serif: 'EB Garamond', Georgia, serif;
          --font-serif-italic: 'EB Garamond', Georgia, serif;
          --font-display: 'Cormorant Garamond', Georgia, serif;
          --font-label: 'Cinzel', Georgia, serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

        body {
          background: var(--cream);
          font-family: var(--font-serif);
          color: var(--ink);
          min-height: 100vh;
          min-height: 100dvh;
        }

        /* Toile background */
        .toile-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cg fill='none' stroke='%234a6b8a' stroke-width='0.55' opacity='0.14'%3E%3Cellipse cx='50' cy='50' rx='12' ry='18' transform='rotate(-20 50 50)'/%3E%3Cpath d='M50 32 Q60 20 55 50 Q65 35 70 50 Q60 55 50 68 Q40 55 30 50 Q35 35 45 50 Q40 20 50 32z'/%3E%3Ccircle cx='50' cy='50' r='4'/%3E%3Cpath d='M38 38 Q30 25 45 30M62 38 Q70 25 55 30M38 62 Q30 75 45 70M62 62 Q70 75 55 70'/%3E%3Cpath d='M100 10 Q115 20 108 35 Q120 28 130 38 Q118 42 115 55'/%3E%3Ccircle cx='105' cy='22' r='3'/%3E%3Cpath d='M155 60 Q165 55 170 62 Q165 68 157 66 Q153 70 150 65 Q153 58 155 60z'/%3E%3Cpath d='M15 130 Q10 120 15 110 Q25 105 35 110 Q40 120 35 130 Q25 135 15 130z'/%3E%3Cline x1='25' y1='135' x2='25' y2='145'/%3E%3Crect x='17' y='145' width='16' height='3'/%3E%3Ccircle cx='145' cy='140' r='8'/%3E%3Ccircle cx='135' cy='148' r='6'/%3E%3Ccircle cx='155' cy='148' r='6'/%3E%3Cpath d='M145 148 Q143 162 140 170M145 148 Q147 162 150 170'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .app {
          position: relative; z-index: 1;
          max-width: 480px; margin: 0 auto;
          padding: 0 0 100px 0;
          min-height: 100dvh;
        }

        /* Header */
        .header {
          text-align: center;
          padding: 52px 24px 24px;
        }
        .header-crown { color: var(--gold); font-size: 16px; letter-spacing: 10px; opacity: 0.65; margin-bottom: 10px; }
        .header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 300;
          color: var(--brown); line-height: 1.1; letter-spacing: 1px;
        }
        .header-title span { color: var(--gold); font-style: italic; }
        .header-sub {
          font-family: 'EB Garamond', serif; font-style: italic;
          font-size: 14px; color: var(--toile-blue); margin-top: 10px; line-height: 1.6; opacity: 0.85;
        }
        .ornament {
          display: flex; align-items: center; gap: 12px;
          margin: 16px 24px 0;
        }
        .ornament-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, var(--gold)); opacity: 0.4; }
        .ornament-line.right { background: linear-gradient(to left, transparent, var(--gold)); }
        .ornament-sym { color: var(--gold); font-size: 12px; opacity: 0.65; }

        /* Cards */
        .card {
          margin: 0 16px 18px;
          background: rgba(255,252,245,0.88);
          border: 1px solid var(--card-border);
          border-radius: 3px;
          padding: 22px 20px;
          box-shadow: 0 2px 20px rgba(107,78,42,0.08);
          position: relative;
        }
        .card::before {
          content: ''; position: absolute;
          top: 5px; left: 5px; right: 5px; bottom: 5px;
          border: 1px solid rgba(184,150,90,0.1); border-radius: 2px;
          pointer-events: none;
        }
        .card-title {
          font-family: 'Cinzel', serif; font-size: 9px;
          letter-spacing: 2.5px; color: var(--gold);
          text-transform: uppercase; margin-bottom: 18px;
          display: flex; align-items: center; gap: 10px;
        }
        .card-title::after { content: ''; flex: 1; height: 1px; background: var(--gold); opacity: 0.25; }

        .section-label {
          font-family: 'Cinzel', serif; font-size: 9px;
          letter-spacing: 1.8px; color: var(--brown);
          text-transform: uppercase; display: block; margin-bottom: 10px;
        }
        .section { margin-bottom: 22px; }

        /* Realm tabs */
        .tab-row { display: flex; }
        .tab-btn {
          flex: 1; padding: 10px 8px;
          font-family: 'EB Garamond', serif; font-size: 13px;
          color: var(--brown); background: transparent;
          border: 1px solid rgba(184,150,90,0.35);
          cursor: pointer; transition: all 0.18s;
          border-right-width: 0;
        }
        .tab-btn:first-child { border-radius: 3px 0 0 3px; }
        .tab-btn:last-child { border-radius: 0 3px 3px 0; border-right-width: 1px; }
        .tab-btn.active { background: var(--brown); color: var(--cream); border-color: var(--brown); }

        /* Chips */
        .chip-wrap { display: flex; flex-wrap: wrap; gap: 0; }
        .chip {
          border: 1px solid var(--chip-border);
          border-radius: 100px; padding: 7px 14px;
          margin: 0 7px 8px 0;
          font-family: 'EB Garamond', serif; font-size: 13.5px;
          color: var(--brown); background: transparent;
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .chip:active { transform: scale(0.96); }
        .chip--selected { background: var(--brown); border-color: var(--brown); color: var(--cream); }

        /* Color swatches */
        .swatch-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .swatch {
          width: 36px; height: 36px; border-radius: 50%;
          cursor: pointer; transition: all 0.18s;
          display: flex; align-items: center; justify-content: center;
        }
        .swatch:active { transform: scale(0.9); }
        .swatch--selected { transform: scale(1.08); }
        .color-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .color-tag {
          background: var(--gold-very-light); border-radius: 100px;
          padding: 3px 12px; font-family: var(--font-serif);
          font-size: 11px; color: var(--brown);
        }

        /* Text inputs */
        .text-input {
          width: 100%; background: rgba(255,252,245,0.6);
          border: 1px solid var(--chip-border); border-radius: 3px;
          padding: 13px 15px; font-family: 'EB Garamond', serif;
          font-size: 15px; color: var(--ink); outline: none;
          transition: border-color 0.2s; -webkit-appearance: none;
        }
        .text-input:focus { border-color: var(--gold); }
        .text-input::placeholder { color: rgba(107,78,42,0.38); font-style: italic; }
        textarea.text-input { resize: vertical; min-height: 72px; }

        /* Generate button */
        .generate-btn {
          width: 100%; padding: 18px;
          background: linear-gradient(135deg, var(--brown) 0%, #8a6035 100%);
          color: var(--cream); border: none; border-radius: 3px;
          font-family: 'Cinzel', serif; font-size: 10px;
          letter-spacing: 2.5px; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s; margin-top: 8px;
          box-shadow: 0 4px 16px rgba(107,78,42,0.25);
          position: relative;
        }
        .generate-btn::before {
          content: ''; position: absolute;
          inset: 2px; border: 1px solid rgba(255,252,245,0.15); border-radius: 2px;
        }
        .generate-btn:active { transform: translateY(1px); box-shadow: 0 2px 8px rgba(107,78,42,0.2); }

        /* Result section */
        .result-section { animation: fadeUp 0.4s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Keyword cards */
        .kw-card {
          background: linear-gradient(135deg, rgba(74,107,138,0.07), rgba(184,150,90,0.05));
          border: 1px solid rgba(74,107,138,0.2);
          border-radius: 3px; padding: 16px;
          margin-bottom: 14px;
          animation: fadeUp 0.35s ease both;
        }
        .kw-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .kw-label {
          font-family: 'Cinzel', serif; font-size: 8.5px;
          letter-spacing: 2px; color: var(--gold); text-transform: uppercase;
        }
        .kw-tip { font-style: italic; font-size: 11px; color: var(--toile-blue); opacity: 0.7; font-family: 'EB Garamond', serif; }
        .kw-text { font-family: 'EB Garamond', serif; font-size: 18px; color: var(--ink); margin-bottom: 13px; line-height: 1.5; }
        .kw-actions { display: flex; gap: 7px; align-items: center; }
        .kw-btn {
          background: var(--toile-blue); color: white;
          border: none; padding: 8px 13px; border-radius: 2px;
          font-family: 'EB Garamond', serif; font-size: 12px;
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .kw-btn:active { transform: scale(0.96); }
        .kw-btn--copied { background: var(--sage); }
        .kw-btn--open { background: var(--brown); flex: 1; }
        .kw-btn--share { background: transparent; border: 1px solid var(--chip-border); color: var(--brown); font-size: 15px; padding: 7px 11px; }
        .kw-fav-btn { background: none; border: none; cursor: pointer; font-size: 22px; padding: 4px 6px; line-height: 1; }

        /* Tips */
        .tips {
          font-family: 'EB Garamond', serif; font-style: italic;
          font-size: 12.5px; color: var(--toile-blue); line-height: 1.9; opacity: 0.8; margin-top: 4px;
        }

        /* Share all button */
        .share-all-btn {
          width: 100%; padding: 13px;
          background: transparent; border: 1px solid var(--gold);
          border-radius: 3px; color: var(--gold);
          font-family: 'Cinzel', serif; font-size: 9px;
          letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; margin-bottom: 16px; transition: all 0.2s;
        }
        .share-all-btn:active { background: var(--gold-very-light); }

        /* Wishlist */
        .fav-card {
          background: rgba(255,252,245,0.9);
          border: 1px solid var(--card-border);
          border-radius: 3px; padding: 18px;
          margin-bottom: 14px;
          box-shadow: 0 2px 16px rgba(107,78,42,0.07);
          position: relative;
        }
        .fav-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .empty-state { text-align: center; padding: 80px 24px 40px; }
        .empty-icon { font-size: 64px; opacity: 0.2; display: block; margin-bottom: 16px; }
        .empty-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; color: var(--brown); opacity: 0.5; margin-bottom: 10px; }
        .empty-text { font-style: italic; font-size: 14px; color: var(--ink); opacity: 0.4; line-height: 1.7; font-family: 'EB Garamond', serif; }

        /* Bottom nav */
        .bottom-nav {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
          background: rgba(250,247,242,0.97);
          border-top: 1px solid var(--card-border);
          display: flex; padding: 0;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .nav-btn {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 12px 8px 20px;
          background: none; border: none; cursor: pointer;
          gap: 3px; transition: all 0.15s;
        }
        .nav-icon { font-size: 20px; line-height: 1; }
        .nav-label {
          font-family: 'Cinzel', serif; font-size: 8px;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--brown-light); transition: color 0.15s;
        }
        .nav-btn.active .nav-label { color: var(--gold); }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--cream); }
        ::-webkit-scrollbar-thumb { background: var(--gold); opacity: 0.4; border-radius: 2px; }

        /* PWA install hint */
        .install-hint {
          margin: 0 16px 18px;
          background: var(--gold-very-light);
          border: 1px solid rgba(184,150,90,0.4);
          border-radius: 3px; padding: 13px 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .install-hint-text { font-family: 'EB Garamond', serif; font-size: 13px; color: var(--brown); line-height: 1.5; flex: 1; }
        .install-dismiss { background: none; border: none; color: var(--brown); opacity: 0.4; cursor: pointer; font-size: 16px; }
      `}</style>

      <div className="toile-bg" />

      <div className="app">
        {tab === 'search' ? (
          <>
            {/* Header */}
            <div className="header">
              <div className="header-crown">✦ ✦ ✦</div>
              <h1 className="header-title">Keyword<br /><span>Atelier</span></h1>
              <p className="header-sub">Describe your desire — receive<br />the perfect Chinese search phrase</p>
              <div className="ornament">
                <div className="ornament-line" />
                <span className="ornament-sym">✦</span>
                <div className="ornament-line right" />
              </div>
            </div>

            {/* PWA hint - shown once */}
            <InstallHint />

            {/* Realm Card */}
            <div className="card">
              <div className="card-title">I. Choose Your Realm</div>
              <div className="tab-row" style={{ marginBottom: 20 }}>
                {(['fashion','home','character'] as Realm[]).map((r, i) => (
                  <button key={r}
                    className={`tab-btn ${realm === r ? 'active' : ''}`}
                    onClick={() => switchRealm(r)}>
                    {r === 'fashion' ? '👗 Fashion' : r === 'home' ? '🏡 Home' : '✨ Chars'}
                  </button>
                ))}
              </div>

              {groups.map(g => (
                <div key={g.label} className="section">
                  <span className="section-label">{g.label}</span>
                  <div className="chip-wrap">
                    {g.items.map(item => (
                      <Chip key={item} label={item} selected={!!selected[item]} onToggle={() => toggleChip(item)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Colors Card */}
            <div className="card">
              <div className="card-title">II. Color Palette</div>
              <div className="swatch-grid">
                {COLORS.map(c => (
                  <ColorSwatch key={c.cn} color={c} selected={!!selectedColors[c.cn]} onToggle={() => toggleColor(c.cn)} />
                ))}
              </div>
              {Object.keys(selectedColors).some(k => selectedColors[k]) && (
                <div className="color-tags">
                  {COLORS.filter(c => selectedColors[c.cn]).map(c => (
                    <span key={c.cn} className="color-tag">{c.name}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Vision Card */}
            <div className="card">
              <div className="card-title">III. Your Vision</div>
              <div className="section">
                <span className="section-label">Inspo Person / Vibe</span>
                <input
                  className="text-input"
                  placeholder="Zendaya, Bridgerton, Sailor Moon…"
                  value={inspo}
                  onChange={e => setInspo(e.target.value)}
                />
              </div>
              <div className="section">
                <span className="section-label">Extra Details</span>
                <textarea
                  className="text-input"
                  placeholder="lace trim, oversized, vintage wash, with pockets…"
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  rows={2}
                />
              </div>
              <button className="generate-btn" onClick={handleGenerate}>
                ✦ Generate My Keywords ✦
              </button>
            </div>

            {/* Results */}
            {showResult && keywords.length > 0 && (
              <div ref={resultRef} className="result-section">
                <div className="card">
                  <div className="card-title">Your Keywords ✦ 您的搜索关键词</div>
                  {keywords.map((kw, i) => (
                    <KeywordCard
                      key={i} index={i}
                      label={kw.label} keyword={kw.keyword} tip={kw.tip}
                      onFav={() => handleFav(kw, i)}
                      onOpen={() => openPDD(kw.keyword)}
                      isFav={!!favMap[i]}
                    />
                  ))}
                  <button className="share-all-btn" onClick={() => {
                    const text = keywords.map(k => `${k.label}: ${k.keyword}`).join('\n')
                    if (navigator.share) navigator.share({ title: 'My Pinduoduo Keywords', text })
                    else navigator.clipboard.writeText(text)
                  }}>✦ Share All Keywords</button>
                  <p className="tips">
                    💡 Paste into 拼多多 search bar<br />
                    📱 Try each keyword separately for more results<br />
                    ⭐ Sort by 销量 (sales volume) for trusted sellers
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="header">
              <div className="header-crown" style={{ color: '#C9877A' }}>♥ ♥ ♥</div>
              <h1 className="header-title">My <span>Wishlist</span></h1>
              <p className="header-sub">Your saved keyword treasures</p>
              <div className="ornament">
                <div className="ornament-line" />
                <span className="ornament-sym">✦</span>
                <div className="ornament-line right" />
              </div>
            </div>

            <div style={{ padding: '0 16px' }}>
              {favourites.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">♡</span>
                  <p className="empty-title">No favourites yet</p>
                  <p className="empty-text">Generate keywords and tap the ♡ heart to save them here for later.</p>
                </div>
              ) : (
                <>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>
                    {favourites.length} saved keyword{favourites.length !== 1 ? 's' : ''}
                  </p>
                  {favourites.map(f => (
                    <FavCard key={f.id} item={f} onRemove={() => handleRemoveFav(f.id)} />
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Bottom nav */}
      <nav className="bottom-nav">
        <button className={`nav-btn ${tab === 'search' ? 'active' : ''}`} onClick={() => setTab('search')}>
          <span className="nav-icon">✦</span>
          <span className="nav-label">Atelier</span>
        </button>
        <button className={`nav-btn ${tab === 'wishlist' ? 'active' : ''}`} onClick={() => setTab('wishlist')}>
          <span className="nav-icon">{favourites.length > 0 ? '♥' : '♡'}</span>
          <span className="nav-label">Wishlist{favourites.length > 0 ? ` (${favourites.length})` : ''}</span>
        </button>
      </nav>
    </>
  )
}

// Install hint component
function InstallHint() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('install_hint_dismissed')
    const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (!dismissed && isIOS && !isStandalone) setShow(true)
  }, [])

  if (!show) return null

  return (
    <div className="install-hint">
      <span style={{ fontSize: 20 }}>📱</span>
      <p className="install-hint-text">
        <strong style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Add to Home Screen</strong>
        Tap <strong>Share ↑</strong> then <strong>"Add to Home Screen"</strong> to install as an app!
      </p>
      <button className="install-dismiss" onClick={() => { setShow(false); localStorage.setItem('install_hint_dismissed', '1') }}>✕</button>
    </div>
  )
}
