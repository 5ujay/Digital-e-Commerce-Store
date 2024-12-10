import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const OrderEmail = ({ orderDetail, totalAmount }) => (
  <Html>
    <Head />
    <Preview>Digi Store Receipt</Preview>

    <Body style={main}>
      <Container style={container}>
        <Section>
          <Row>
            <Column align="right" style={tableCell}>
              <Text style={heading}>Receipt</Text>
            </Column>
          </Row>
        </Section>
        <Section style={productTitleTable}>
          <Text style={productsTitle}>DigiStore</Text>
        </Section>
        <Section>
          {orderDetail?.map((order, index) => (
            <Row>
              <Column style={{ width: "64px" }}>
                <Img
                  src={`${order?.imageUrl}`}
                  width="64"
                  height="64"
                  alt="image"
                  style={productIcon}
                />
              </Column>
              <Column style={{ paddingLeft: "22px" }}>
                <Text style={productTitle}>{order?.title}</Text>
                <Text style={productDescription}>{order?.category}</Text>

                <Link
                  href={order?.fileUrl}
                  style={productLink}
                  download={order?.url}
                >
                  Download the Content
                </Link>
              </Column>

              <Column style={productPriceWrapper} align="right">
                <Text style={productPrice}>${order?.price}</Text>
              </Column>
            </Row>
          ))}
        </Section>
        <Hr style={productPriceLine} />
        <Section align="right">
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>${totalAmount}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={productPriceLineBottom} />

        <Section>
          <Row>
            <Column align="center" style={ctaTitle}>
              <Text style={ctaText}>
                Start Buying and Selling Digital Content on DIGISTORE for free
              </Text>
            </Column>
          </Row>
        </Section>

        <Hr style={walletBottomLine} />

        <Text style={footerCopyright}>
          Copyright © 2024 DigitStore by sujay pagam. <br />{" "}
          <Link href="https://portfolio-sujay-51d4.onrender.com/">
            All rights reserved
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OrderEmail;

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const informationTable = {
  borderCollapse: "collapse",
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right",
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  textAlign: "right",
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 75px 0" };

const ctaTitle = {
  display: "block",
  margin: "15px 0 0 0",
};

const ctaText = { fontSize: "24px", fontWeight: "500" };

const walletBottomLine = { margin: "65px 0 20px 0" };

const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center",
  fontSize: "12px",
  color: "rgb(102,102,102)",
};
