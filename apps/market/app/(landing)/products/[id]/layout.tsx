export default function ProductIdLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <section className="w-full flex flex-col items-center gap-8">
      {children}
    </section>
  );
}
