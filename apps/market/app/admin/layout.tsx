import {
  CalendarOutlined,
  ContactsOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { SidebarMarket } from '@pkm/ui';

export default function AdminLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main className="w-full h-full flex items-center bg-neutral-10%">
      <SidebarMarket
        navItems={[
          {
            href: '/admin',
            icon: <HomeOutlined className="text-2xl" />,
            title: 'Dashboard',
          },
          {
            href: '/admin/produk',
            icon: <CalendarOutlined className="text-2xl" />,
            title: 'Produk',
          },
          {
            href: '/admin/order',
            icon: <ShoppingCartOutlined className="text-2xl" />,
            title: 'Order',
          },
          {
            href: '/admin/users',
            icon: <ContactsOutlined className="text-2xl" />,
            title: 'Manajemen Pengguna',
          },
        ]}
        imgSrc=""
        name=""
      />

      <section className="w-full h-screen overflow-y-auto px-8 py-10 container mx-auto">
        {children}
      </section>
    </main>
  );
}
