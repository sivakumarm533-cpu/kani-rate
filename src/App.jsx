import { useEffect, useMemo, useState } from 'react'
import './App.css'
import CategoryType from './components/CategoryType.jsx'
import ProductDetail from './components/ProductDetail.jsx'

const products = [
  { code: 'GR-01', name: 'Basmati rice', category: 'Grains', detail: 'India Gate · 1 kg', old: 168, price: 155, oldDate: '23 Oct 2026', date: '24 Oct 2026', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80' },
  { code: 'VG-01', name: 'Tomatoes', category: 'Vegetables', detail: 'Fresh farm · 1 kg', old: 48, price: 38, oldDate: '23 Oct 2026', date: '24 Oct 2026', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=500&q=80' },
  { code: 'DA-01', name: 'Whole milk', category: 'Dairy', detail: 'Farm fresh · 1 litre', old: 68, price: 68, oldDate: '22 Oct 2026', date: '23 Oct 2026', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80' },
  { code: 'PN-01', name: 'Sunflower oil', category: 'Pantry', detail: 'Pure & light · 1 litre', old: 182, price: 195, oldDate: '21 Oct 2026', date: '22 Oct 2026', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80' },
  { code: 'VG-02', name: 'Red onions', category: 'Vegetables', detail: 'Nashik select · 1 kg', old: 42, price: 35, oldDate: '23 Oct 2026', date: '24 Oct 2026', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=500&q=80' },
  { code: 'DA-02', name: 'Brown eggs', category: 'Dairy', detail: 'Free range · 6 pcs', old: 54, price: 58, oldDate: '20 Oct 2026', date: '21 Oct 2026', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=500&q=80' },
]
const categories = ['All', 'Vegetables', 'Grains', 'Dairy', 'Pantry']
const categoryGroups = categories.map((name) => ({
  name,
  items: products.filter((product) => name === 'All' || product.category === name).map(({ code, name: itemName }) => ({ code, name: itemName })),
}))

function App() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(window.location.hash.startsWith('#product/') ? 'product' : window.location.hash === '#categories' ? 'categories' : 'prices')
  const [selectedProduct, setSelectedProduct] = useState(() => products.find((item) => window.location.hash === `#product/${item.code}`) ?? null)
  const navigate = (nextPage, product = null) => {
    const nextHash = nextPage === 'categories' ? '#categories' : nextPage === 'product' ? `#product/${product.code}` : '#prices'
    window.history.pushState({}, '', nextHash)
    if (product) setSelectedProduct(product)
    setPage(nextPage)
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    const syncPage = () => {
      const match = products.find((item) => window.location.hash === `#product/${item.code}`) ?? null
      setSelectedProduct(match)
      setPage(window.location.hash.startsWith('#product/') && match ? 'product' : window.location.hash === '#categories' ? 'categories' : 'prices')
    }
    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])
  const visibleProducts = useMemo(() => products.filter((item) =>
    (category === 'All' || item.category === category) &&
    `${item.name} ${item.detail}`.toLowerCase().includes(query.toLowerCase()),
  ), [category, query])

  return <main className="app-shell">
    <header className="topbar"><a className="brand" href="#top" onClick={(event) => { event.preventDefault(); navigate('prices') }}><span className="brand-mark">k</span><span>Kani <b>Rate</b></span></a><span className="market">⌖ &nbsp;Chennai, Tamil Nadu</span>{page !== 'prices' ? <button className="back-button" onClick={() => navigate(page === 'product' ? 'categories' : 'prices')}>← <span>Back</span></button> : <button className="menu-toggle" aria-label="Open categories page" onClick={() => navigate('categories')}><span/><span/><span/></button>}</header>
    {page === 'product' ? <ProductDetail product={selectedProduct} onBack={() => navigate('categories')} /> : page === 'categories' ? <section className="category-page"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="#prices" onClick={(event) => { event.preventDefault(); navigate('prices') }}>Home</a><span>/</span><span>Categories</span></nav><div className="drawer-heading"><div><span>Browse all</span><strong>Categories</strong></div></div><CategoryType groups={categoryGroups} selected={category} onSelect={setCategory} onItemSelect={(_, code) => { const product = products.find((item) => item.code === code); if (product) navigate('product', product) }} /></section> : <>
    <section className="intro" id="top"><div className="updated">● &nbsp;Updated today, 9:42 am <span>Prices in ₹</span></div></section>
    <section className="price-section" id="prices"><div className="section-heading"><div><h2>Price list</h2><p>{visibleProducts.length} everyday items</p></div><label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search items" aria-label="Search items"/></label></div>
      <div className="category-row" aria-label="Filter by category">{categories.map((item) => <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="product-list">{visibleProducts.map((item) => <article className="product-card" key={item.name}><img className="product-image" src={item.image} alt={item.name} loading="lazy"/><div className="product-info"><div className="product-title"><div><h3>{item.name}</h3><p>{item.detail}</p></div><span className="category-label">{item.category}</span></div><div className="prices"><div><span className="price-label">Old price</span><s>₹{item.old}</s></div><div className="new-price"><span className="price-label">New price</span><strong>₹{item.price}</strong></div></div><div className="card-update"><span><small>Last update</small><time>{item.oldDate}</time></span><span><small>New update</small><time>{item.date}</time></span></div></div></article>)}</div>
      {visibleProducts.length === 0 && <p className="empty-state">No items found. Try another search.</p>}
    </section>
    <footer>Prices may vary by shop. <span>© 2026 Kani Rate</span></footer>
    </>}
  </main>
}

export default App
