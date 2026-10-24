function ProductDetail({ product, onBack }) {
  if (!product) return null

  return (
    <section className="product-detail-page">
      <button className="detail-back" onClick={onBack}>← &nbsp;All categories</button>
      <article className="detail-card">
        <img src={product.image} alt={product.name} />
        <div className="detail-content">
          <span className="detail-code">{product.code}</span>
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.detail}</p>
          <div className="detail-prices">
            <div><span>Old price</span><s>₹{product.old}</s></div>
            <div><span>New price</span><strong>₹{product.price}</strong></div>
          </div>
          <div className="detail-updated">
            <p><span>Last update</span><time>{product.oldDate}</time></p>
            <p><span>New update</span><time>{product.date}</time></p>
          </div>
        </div>
      </article>
    </section>
  )
}

export default ProductDetail
