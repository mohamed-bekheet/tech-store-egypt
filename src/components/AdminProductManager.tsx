'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Tag, Check, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: string;
  isFeatured: boolean;
}

export default function AdminProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Peripherals',
    imageUrl: '',
    description: '',
    isFeatured: false,
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category: 'Peripherals',
      imageUrl: '',
      description: '',
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      price: p.price.toString(),
      category: p.category,
      imageUrl: p.imageUrl || '',
      description: p.description || '',
      isFeatured: p.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProduct) {
        // Update product
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingProduct.id,
            ...formData,
            price: parseFloat(formData.price),
          }),
        });
        if (res.ok) {
          const updated = await res.json();
          setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
          setIsModalOpen(false);
          router.refresh();
        }
      } else {
        // Add new product
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price),
          }),
        });
        if (res.ok) {
          const created = await res.json();
          setProducts((prev) => [created, ...prev]);
          setIsModalOpen(false);
          router.refresh();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleOffer = async (product: Product) => {
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          isFeatured: !product.isFeatured,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Manage your store catalog and special offers
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="glow-button px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="glass-panel overflow-hidden rounded-xl border border-[var(--color-border-card)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-card)] bg-white/[0.02]">
                <th className="p-4 text-[var(--color-text-muted)] font-medium text-xs uppercase tracking-wider">Item</th>
                <th className="p-4 text-[var(--color-text-muted)] font-medium text-xs uppercase tracking-wider">Category</th>
                <th className="p-4 text-[var(--color-text-muted)] font-medium text-xs uppercase tracking-wider">Price</th>
                <th className="p-4 text-[var(--color-text-muted)] font-medium text-xs uppercase tracking-wider">Special Offer</th>
                <th className="p-4 text-[var(--color-text-muted)] font-medium text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--color-text-muted)]">
                    No products found. Click "Add Product" to create your first item.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[var(--color-border-card)] hover:bg-white/[0.04] transition-colors"
                  >
                    <td className="p-4 flex items-center gap-4">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg bg-black/40 border border-white/10"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-black/40 rounded-lg flex items-center justify-center text-xs text-gray-500">
                          No Pic
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white">{product.name}</div>
                        {product.description && (
                          <div className="text-xs text-[var(--color-text-muted)] max-w-xs truncate">
                            {product.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-[var(--color-brand-blue)]">
                      {product.price.toLocaleString()} EGP
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleOffer(product)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          product.isFeatured
                            ? 'bg-[var(--color-brand-purple)]/20 text-[var(--color-brand-purple)] border border-[var(--color-brand-purple)]/40 hover:bg-[var(--color-brand-purple)]/30'
                            : 'bg-white/5 text-[var(--color-text-muted)] border border-white/10 hover:bg-white/10'
                        }`}
                        title="Click to toggle offer"
                      >
                        <Tag className="w-3.5 h-3.5" />
                        {product.isFeatured ? '🔥 In Offer' : 'Standard'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 rounded hover:bg-white/10 text-[var(--color-brand-blue)] transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded hover:bg-white/10 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border border-[var(--color-border-card)] relative bg-[#0d1117]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[var(--color-text-muted)] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-white">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1 uppercase">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Bambu Lab X1-Carbon"
                  className="w-full bg-black/50 border border-[var(--color-border-card)] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-[var(--color-brand-blue)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1 uppercase">
                    Price (EGP)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 59999"
                    className="w-full bg-black/50 border border-[var(--color-border-card)] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-[var(--color-brand-blue)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1 uppercase">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#161b22] border border-[var(--color-border-card)] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-[var(--color-brand-blue)]"
                  >
                    <option value="3D Printers">3D Printers</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Peripherals">Peripherals</option>
                    <option value="Displays">Displays</option>
                    <option value="Audio">Audio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1 uppercase">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-black/50 border border-[var(--color-border-card)] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-[var(--color-brand-blue)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1 uppercase">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description or offer highlights..."
                  className="w-full bg-black/50 border border-[var(--color-border-card)] rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-[var(--color-brand-blue)] text-sm"
                />
              </div>

              {/* Special Offer checkbox */}
              <label className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border-card)] bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-[var(--color-brand-purple)] focus:ring-[var(--color-brand-purple)]"
                />
                <div>
                  <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-[var(--color-brand-purple)]" /> Highlight as Special Offer
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    Promote this item on the homepage and special deals section
                  </div>
                </div>
              </label>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="glow-button px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
