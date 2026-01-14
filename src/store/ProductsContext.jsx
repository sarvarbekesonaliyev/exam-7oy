import React, { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem("products");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (e) {
      // ignore localStorage errors
    }
  }, [products]);

  function addProduct(product) {
    setProducts((prev) => [...prev, product]);
  }

  function removeProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function clearProducts() {
    setProducts([]);
  }

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, removeProduct, clearProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}

export default ProductsContext;
