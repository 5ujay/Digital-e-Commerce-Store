import { db } from "@/configs/db";
import { OrderTable, productsTable, usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await currentUser();

  const result = await db
    .select()
    .from(OrderTable)
    .innerJoin(productsTable, eq(OrderTable.productId, productsTable.id))
    .innerJoin(usersTable, eq(usersTable.email, productsTable.createdBy))
    .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

  return NextResponse.json(result);
}
