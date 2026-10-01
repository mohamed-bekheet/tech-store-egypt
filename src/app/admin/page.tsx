import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button className="glow-button px-4 py-2 rounded font-bold">
          + Add Product
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border-card)]">
              <th className="p-4 text-[var(--color-text-muted)] font-medium">Image</th>
              <th className="p-4 text-[var(--color-text-muted)] font-medium">Name</th>
              <th className="p-4 text-[var(--color-text-muted)] font-medium">Price (EGP)</th>
              <th className="p-4 text-[var(--color-text-muted)] font-medium">Category</th>
              <th className="p-4 text-[var(--color-text-muted)] font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[var(--color-text-muted)]">
                  No products found. Click "Add Product" to create one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-[var(--color-border-card)] hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-black/40 rounded" />
                    )}
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-[var(--color-brand-blue)] font-bold">{product.price}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 text-right">
                    <button className="text-sm text-[var(--color-brand-purple)] hover:text-white mr-4">Edit</button>
                    <button className="text-sm text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
