export const dynamic = 'force-dynamic';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminProductManager from "@/components/AdminProductManager";

export default async function AdminDashboard() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session retrieval error:", error);
  }

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect("/admin/login?error=Unauthorized");
  }

  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Admin products retrieval error:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <AdminProductManager initialProducts={products} />
    </div>
  );
}
