import { Navbar } from '@pkm/ui';
import { ReactElement } from 'react';
import { ForgotPasswordContextProvider } from './forgot-password/_modules/context';
import { auth } from '@pkm/libs/auth/tourism';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<ReactElement> {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }
  return (
    <ForgotPasswordContextProvider>
      <main className="w-full h-screen flex flex-col">
        <Navbar apps="tourism" title="Wisata Desa Bojongsari" page="auth" />

        <section className="w-full h-full bg-[url('/images/desa-bg.webp')] bg-cover">
          <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-white flex flex-col justify-center items-center rounded-xl min-h-[520px] max-w-[500px] py-6 min-w-[480px]">
              {children}
            </div>
          </div>
        </section>
      </main>
    </ForgotPasswordContextProvider>
  );
}
