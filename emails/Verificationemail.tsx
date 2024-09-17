import * as React from "react";
import {
  Html,
  Preview,
  Font,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";
import Head from "next/head";

interface EmailTemplateProps {
  username: string;
  otp: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  username,
  otp,
}: EmailTemplateProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <title>Verification Code</title>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Here&apos;s your verification code: {otp}</Preview>
    <Section>
      <Row>
        <Heading as="h2">Hello {username}</Heading>
      </Row>
      <Row>
        <Text>
          Thankyou for registering, Please use the following instruction code to
          complete your registration:
        </Text>
      </Row>
      <Row>
        <Text>{otp}</Text>
      </Row>
      <Row>if you didnot request this code, please ignore this email.</Row>
    </Section>
  </Html>
);
