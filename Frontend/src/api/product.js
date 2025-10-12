import api from "./axios";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.products)) return res.data.products;
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Create a new product (supports FormData with image)
export const createProduct = async (productData) => {
  try {
    const isFormData = productData instanceof FormData;
    const res = await api.post("/products", productData, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return { ok: true, product: res.data };
  } catch (error) {
    return { ok: false, error: error.response?.data?.message || "Failed to create product" };
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const isFormData = productData instanceof FormData;
    const res = await api.post(`/products/${id}`, productData, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return { ok: true, product: res.data };
  } catch (error) {
    return { ok: false, error: error.response?.data?.message || "Failed to update product" };
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.response?.data?.message || "Failed to delete product" };
  }
};