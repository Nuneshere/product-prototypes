import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Michael Fawler — Contacts — Bonsai',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="stylesheet" href="/prototype-kit/styles/application.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
