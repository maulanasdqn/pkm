export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full container mx-auto flex flex-col items-center gap-[10rem] 2xl:px-10 py-10 font-source-sans-pro overflow-x-hidden">
      {children}
    </section>
  );
}
