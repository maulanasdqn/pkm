import { AuthProvider } from '@pkm/libs/auth';
import './global.css';

export const metadata = {
  title: 'Wisata Indonesia',
  description: 'Wisata Indonesia by PKM',
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
