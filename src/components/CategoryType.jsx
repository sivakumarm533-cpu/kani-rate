function CategoryType({ groups, selected, onSelect, onItemSelect }) {
  return (
    <div className="category-type-list" aria-label="Categories and items">
      {groups.map((group) => (
        <section className="category-type-group" key={group.name}>
          <button
            type="button"
            className={`category-type-heading ${selected === group.name ? 'active' : ''}`}
            aria-pressed={selected === group.name}
            onClick={() => {
              onSelect(group.name)
              onItemSelected?.()
            }}
          >
            {group.name}
            <span aria-hidden="true">›</span>
          </button>
          <div className="category-type-items">
            {group.items.map((item) => (
              <button
                className="category-type-item"
                key={item.code}
                type="button"
                onClick={() => onItemSelect?.(group.name, item.code)}
              >
                <strong>{item.code}</strong>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default CategoryType
