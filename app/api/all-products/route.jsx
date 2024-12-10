import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { productsTable, usersTable } from "@/configs/schema";
import { desc, asc, eq, getTableColumns, like } from "drizzle-orm";

export async function POST(req) {
  const { limit, offset, searchInput, sort } = await req.json();

  // If sorting by price, ensure it is treated as a number (ascending or descending)
  // const orderBy = sort.field === "price"
  //   ? sort.order === "desc"
  //     ? desc(productsTable.price)
  //     : asc(productsTable.price)
  //   : sort.order === "desc"
  //   ? desc(productsTable[sort.field])
  //   : asc(productsTable[sort.field]);
  let orderBy;

  if (sort.field === "price") {
    if (sort.order === "desc") {
      orderBy = desc(productsTable.price);
    } else {
      orderBy = asc(productsTable.price);
    }
  } else {
    if (sort.order === "desc") {
      orderBy = desc(productsTable[sort.field]);
    } else {
      orderBy = asc(productsTable[sort.field]);
    }
  }

  const result = await db
    .select({
      ...getTableColumns(productsTable),
      user: {
        name: usersTable.name,
        image: usersTable.image,
      },
    })
    .from(productsTable)
    .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
    .where(like(productsTable.title, "%" + searchInput + "%"))
    .orderBy(orderBy)
    .limit(Number(limit))
    .offset(offset);

  return NextResponse.json(result);
}
