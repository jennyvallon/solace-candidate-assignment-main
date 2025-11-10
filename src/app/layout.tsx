import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Solace",
    "url": "https://www.solace.health",
    "logo": "https://www.solace.com/logo.png",
    "description": "Solace provides mental health advocates and support services",
    "sameAs": [
      "https://www.solace.com/help"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": "https://www.find.solace.health"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Find Mental Health Advocates",
    "description": "Search and find qualified mental health advocates by specialty, location, and experience",
    "provider": {
      "@type": "Organization",
      "name": "Solace"
    },
    "serviceType": "Find a Patient Advocate Covered By Insurance",
    "areaServed": "US",
    "category": "Health & Wellness"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Solace Advocates",
    "url": "https://www.find.solace.health",
    "description": "Find a patient advocate Covered By Insurance",
    "publisher": {
      "@type": "Organization",
      "name": "Solace"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.find.solace.health?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body style={{ padding: '15px'}} className={inter.className}>
        {children}
      </body>
    </html>
  );
}
