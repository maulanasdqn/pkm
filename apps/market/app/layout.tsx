import { AuthProvider } from '@pkm/libs/auth';
import './global.css';

export const metadata = {
  title: 'Pasar Digital',
  description:
    'Pasar Digital adalah sebuah platform digital yang menyediakan layanan jual beli online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
