import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../store/ProductsContext";

function CreateProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!title.trim()) return setError("Sarlavha kiriting");
    if (!description.trim()) return setError("Tavsif kiriting");
    const num = Number(price);
    if (!price || Number.isNaN(num) || num <= 0) return setError("Iltimos, haqiqiy narx kiriting");

    const product = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim(),
      description: description.trim(),
      price: num,
    };

    addProduct(product);
    navigate("/products");
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h2>Yangi mahsulot qo'shish</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Sarlavha
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Mahsulot nomi"
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label>
          Tavsif
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mahsulot haqida qisqacha"
            style={{ width: "100%", padding: 8, marginTop: 6, minHeight: 120 }}
          />
        </label>

        <label>
          Narx (so'm)
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="10000"
            type="number"
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        {error && <div style={{ color: "#b00020" }}>{error}</div>}

        <div>
          <button type="submit" style={{ padding: "8px 14px" }}>
            Qo'shish
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
