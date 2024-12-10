import { db } from "@/configs/db";
import { OrderTable, productsTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await currentUser(); // Retrieve the current user

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Query the database for orders and their associated products
  const result = await db
    .select({
        ...getTableColumns(productsTable)
    })
    .from(OrderTable)
    .innerJoin(productsTable, eq(productsTable.id, OrderTable.productId))
    .where(eq(OrderTable.email, user?.primaryEmailAddress?.emailAddress)) // Filter by user's email
    .orderBy(desc(OrderTable.id)); // Order by the order ID in descending order

  return NextResponse.json(result); // Return the result as JSON
}
