import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/product";
// import "../styles/global.css";
import "../styles/AdminModal.css"

const CATEGORY_OPTIONS = ["inabel", "ikat", "kalinga"];

const AdminHome = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    image: null,
    price: "",
    stock: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      console.error("Failed to fetch products:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (product = null) => {
    setEditProduct(product);
    setShowForm(true);
    setError("");

    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        category: product.category,
        image: null,
        price: product.price,
        stock: product.stock,
      });
      setPreview(
        product.image ? `http://localhost:8000/storage/${product.image}` : null
      );
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      category: "",
      image: null,
      price: "",
      stock: "",
    });
    setPreview(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditProduct(null);
    resetForm();
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, image: file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !form.name ||
      !form.description ||
      !form.category ||
      !form.price ||
      !form.stock
    ) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      let result;
      if (editProduct) {
        result = await updateProduct(editProduct.id, formData);
      } else {
        result = await createProduct(formData);
      }

      if (result.ok) {
        await loadProducts();
        handleCloseForm();
      } else {
        setError(result.error || "Failed to save product.");
      }
    } catch {
      setError("Failed to save product.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      setLoading(true);
      await deleteProduct(id);
      await loadProducts();
      setLoading(false);
    }
  };

  // ✅ Improved filtering logic
  const filteredProducts = products.filter((p) => {
    const matchesFilter = filter
      ? p.category?.toLowerCase() === filter.toLowerCase()
      : true;
    const matchesSearch = search
      ? p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        {user && (
          <button className="admin-logout-btn" onClick={logout}>
            
          </button>
        )}
      </header>

      {/* Controls */}
      <div className="admin-controls">
        <button className="admin-add-btn" onClick={() => handleOpenForm()}>
          + Add Product
        </button>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="admin-filter"
        >
          <option value="">All Categories</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Table */}
      <div className="admin-products">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* ✅ Show loading message instead of "No products found" */}
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>
                  ⏳ Loading products, please wait...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <React.Fragment key={product.id}>
                  <tr
                    className="admin-product-row"
                    onClick={() =>
                      setExpandedRow(
                        expandedRow === product.id ? null : product.id
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <img
                        src={
                          product.image
                            ? `http://localhost:8000/storage/${product.image}`
                            : "https://via.placeholder.com/60"
                        }
                        alt={product.name}
                        className="admin-product-img"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₱{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        className="admin-edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenForm(product);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(product.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {expandedRow === product.id && (
                    <tr className="admin-expandable-row">
                      <td colSpan={6}>
                        <div className="expandable-content">
                          <p>
                            <strong>Description:</strong> {product.description}
                          </p>
                          <div className="expandable-image-wrapper">
                            <img
                              src={
                                product.image
                                  ? `http://localhost:8000/storage/${product.image}`
                                  : "https://via.placeholder.com/200"
                              }
                              alt={product.name}
                              className="expandable-product-img"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="admin-modal-bg" onClick={handleCloseForm}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editProduct ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-grid">
                <label>
                  Name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  Category
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select category</option>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Price
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    required
                    min={0}
                  />
                </label>

                <label>
                  Stock
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleInputChange}
                    required
                    min={0}
                  />
                </label>
              </div>

              <label>
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />
              </label>

              <label className="admin-dropzone">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                />
                <div onClick={() => fileInputRef.current.click()}>
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="admin-preview-img"
                    />
                  ) : (
                    <span>Click or drag image here to upload</span>
                  )}
                </div>
              </label>

              {error && <div className="admin-error">{error}</div>}

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="admin-cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-save-btn" disabled={loading}>
                  {editProduct ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
