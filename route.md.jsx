import { NextResponse } from "next/server";
import { initializeAppwrite } from "../../../configs/appwriteConfig";
import { db } from "@/configs/db";
import { productsTable } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";

// For adding data to appwrite and NenoDb
export async function POST(req) {
  const storage = initializeAppwrite();

  try {
    // Parse form data
    const formData = await req.formData();
    const image = formData.get("image");
    const file = formData.get("file");
    const data = JSON.parse(formData.get("data"));

    // Validate files
    if (!image || !file) {
      return NextResponse.json({
        success: false,
        error: "Both image and file are required.",
      });
    }

    // Upload Image to Storage
    const imageUpload = await storage.createFile(
      process.env.NEXT_APPWRITE_IMAGE_BUCKET_ID,
      "unique()",
      image
    );

    // Upload File to Storage
    const fileUpload = await storage.createFile(
      process.env.NEXT_APPWRITE_FILE_BUCKET_ID,
      "unique()",
      file
    );

    // Construct URLs for the image and file
    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/674c63f40020cdf35c8e/files/${ima}/view?project=${process.env.NEXT_APPWRITE_PROJECT_TD}&project=${process.env.process.env.NEXT_APPWRITE_PROJECT_TD}&mode=admin``;
    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_APPWRITE_FILE_BUCKET_ID}/files/${fileUpload.$id}/view`;

    // Save product data to Neon DB
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

    // console.log("Insert result:", result);

    return NextResponse.json({
      success: true,
      data: result[0], // Return the inserted product data
    });
  } catch (error) {
    console.error("Error uploading to Appwrite storage:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

// For getting an data from db
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const result = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.createdBy, email))
    .orderBy(desc(productsTable.id));

  console.log(result);

  return NextResponse.json(result);
}
