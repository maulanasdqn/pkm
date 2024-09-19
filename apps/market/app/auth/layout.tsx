import { auth } from '@pkm/libs/auth/market';
import { Navbar } from '@pkm/ui';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar apps="market" title="Digitalisasi Pasar Desa" page="auth" />

      <section className="w-full h-full bg-[url('/images/desa-bg.webp')] bg-cover">
        <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-70">
          <div className="bg-white flex flex-col justify-center items-center rounded-xl 2xl:min-h-[520px] max-w-[500px] py-6 min-w-[480px]">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
