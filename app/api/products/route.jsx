import { db } from "@/configs/db";
import { storage } from "@/configs/firebaseConfig"; // Firebase storage import
import { OrderTable, productsTable, usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const image = formData.get("image");
  const file = formData.get("file");
  const data = JSON.parse(formData.get("data"));

  if (!image || !file) {
    return NextResponse.json(
      { message: "Image and file are required" },
      { status: 400 }
    );
  }

  try {
    // Handle image upload to Firebase Storage
    const imageName = Date.now() + ".png";
    const storageRef = ref(storage, "files/" + imageName);
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);

    // Handle file upload to Firebase Storage
    const fileName = Date.now().toString();
    const storageRefFile = ref(storage, "files/" + fileName);
    await uploadBytes(storageRefFile, file);
    const fileUrl = await getDownloadURL(storageRefFile);

    // Add the data (you can save this to a database if necessary)
    // Here we are assuming you're saving it to a NeonDB or another service
    const result = await db
      .insert(productsTable)
      .values({
        title: data?.title,
        category: data?.category,
        description: data?.description,
        fileUrl: fileUrl,
        imageUrl: imageUrl,
        price: data?.price,
        about: data?.about,
        message: data?.message,
        createdBy: data?.userEmail,
      })
      .returning(productsTable);

    return NextResponse.json({
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { message: "Error adding product", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const limit = searchParams.get("limit");
    const id = searchParams.get("id");
    const category = searchParams.get("category");

    // if (!email) {
    //   return NextResponse.json(
    //     { message: "Email is required" },
    //     { status: 400 }
    //   );
    // }

    if (email) {
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
        .where(eq(productsTable.createdBy, email))
        .orderBy(desc(productsTable.id));

      console.log("Fetched Results: ", result);

      return NextResponse.json(result);
    }

    if (id) {
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
        .where(eq(productsTable.id, id))
        .orderBy(desc(productsTable.id));

      return NextResponse.json(result[0]);
    }
    // Fetch products by category (new filter)
    if (category) {
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
        .where(eq(productsTable.category, category)) // Filter by category
        .orderBy(desc(productsTable.id))
        .limit(Number(limit)); // Limit results if specified

      return NextResponse.json(result);
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
      .orderBy(desc(productsTable.id))
      .limit(Number(limit));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  const user = await currentUser();

  const result = await db
    .delete(productsTable)
    .where(
      and(eq(productsTable.id, productId)),
      eq(productsTable.createdBy, user?.primaryEmailAddress?.emailAddress)
    );

  return NextResponse.json({result:"Deleted !!!"});
}
