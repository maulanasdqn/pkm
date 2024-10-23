import {
  CalendarOutlined,
  ContactsOutlined,
  HomeOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { getAllMessages, getAllOrders } from '@pkm/libs/actions/market';
import { auth } from '@pkm/libs/auth/market';
import { MarketRoles, OrderStatus } from '@pkm/libs/entities';
import { SidebarMarket } from '@pkm/ui';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const session = await auth();

  if (!session) {
    redirect('/auth/login');
  }

  if (session?.user?.role.id !== MarketRoles.ADMIN) {
    redirect('/');
  }

  const messages = await getAllMessages();
  const orders = await getAllOrders();

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
            icon: (
              <div className="relative">
                <ShoppingCartOutlined className="text-2xl" />
                {orders.data?.filter(
                  (order) => order.status === OrderStatus.PENDING
                ).length ? (
                  <div className="absolute top-0 -right-1 w-2 h-2 rounded-full bg-red-500"></div>
                ) : null}
              </div>
            ),
            title: 'Order',
          },
          {
            href: '/admin/users',
            icon: <ContactsOutlined className="text-2xl" />,
            title: 'Manajemen Pengguna',
          },
          {
            href: '/admin/messages',
            icon: (
              <div className="relative">
                <MailOutlined className="text-2xl" />
                {messages.data?.filter((message) => !message.isRead).length ? (
                  <div className="absolute top-0 -right-1 w-2 h-2 rounded-full bg-red-500"></div>
                ) : null}
              </div>
            ),
            title: 'Pesan',
          },
        ]}
        imgSrc={session?.user?.image || ''}
        name={session?.user?.fullname || ''}
      />

      <section className="w-full h-screen overflow-y-auto px-8 py-10 container mx-auto">
        {children}
      </section>
    </main>
  );
}
