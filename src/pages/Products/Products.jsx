import { useProducts } from "../../store/ProductsContext";

function Products() {
  const { products, removeProduct } = useProducts();

  if (!products || products.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Mahsulotlar</h2>
        <p>Hech qanday mahsulot qo'shilmagan.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Mahsulotlar</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 12,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              padding: 12,
              background: "#fff",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>{p.title}</h3>
            <p style={{ margin: "0 0 8px 0", color: "#555" }}>{p.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{String(p.price)} so'm</strong>
              <div>
                <button
                  onClick={() => removeProduct(p.id)}
                  style={{ padding: "6px 10px" }}
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
