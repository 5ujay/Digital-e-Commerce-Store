import { db } from "@/configs/db";
import { cartTable, OrderTable } from "@/configs/schema";
import OrderEmail from "@/emails/email";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { render } from "@react-email/components";

export async function POST(req) {
  const { orderDetail, email } = await req.json();

  // Calculate total amount
  const totalAmount = orderDetail.reduce(
    (acc, order) => acc + parseFloat(order.price),
    0
  );

  // Insert records into the order table
  let orderList = orderDetail.map((order) => ({
    email: email,
    productId: order.productId,
  }));

  const result = await db.insert(OrderTable).values(orderList);

  // Delete user cart items after order
  const deleteResult = await db
    .delete(cartTable)
    .where(eq(cartTable.email, email));

  // Send email
  const sendEmailResult = await SendEmail(email, orderDetail, totalAmount);

  console.log("Email send result:", sendEmailResult);

  return NextResponse.json({
    result,
    message: "Order placed and email sent successfully.",
  });
}

const SendEmail = async (email, orderDetail, totalAmount) => {
  // Render email content dynamically
  const emailHtml = await render(
    <OrderEmail orderDetail={orderDetail} totalAmount={totalAmount} />
  );

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || "",
  });

  const sentFrom = new Sender(
    "digistore@trial-3z0vklo9n9el7qrx.mlsender.net",
    "Sujay Pagam"
  );
  const recipients = [new Recipient(email, "Your Client")];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Order Receipt")
    .setHtml(emailHtml);

  try {
    const result = await mailerSend.email.send(emailParams);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
