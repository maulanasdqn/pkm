'use client';

import { getProductsByCategory } from '@pkm/libs/actions/market';
import { Products } from '@pkm/libs/drizzle/market';
import { CardMarket, HeroMarket, TextField } from '@pkm/ui';
import { FC, ReactElement, useEffect, useState } from 'react';

export const CategoriesModule: FC<{ id: string }> = ({ id }): ReactElement => {
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<Products[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getProductsByCategory(id, search).then((category) => {
      setProducts(category?.data?.products || []);
      setCategoryName(category?.data?.name || '');
    });
  }, [id, search]);

  return (
    <section className="w-full h-full flex items-center flex-col gap-12">
      <HeroMarket
        imageUrl="/images/sample-categories.webp"
        className="gap-8 bg-opacity-40"
      >
        <hgroup className="flex flex-col gap-4 items-center">
          <h2 className="text-4xl font-bold">KATEGORI PRODUK</h2>
          <h3 className="text-3xl capitalize">{categoryName}</h3>
        </hgroup>

        <div className="w-[25%]">
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Cari Kategori"
            dimension="lg"
          />
        </div>
      </HeroMarket>

      <div className="grid grid-cols-3 pt-12 pb-20 gap-6">
        {products.map((item, i) => (
          <CardMarket
            key={i}
            name={item.name}
            price={item.price}
            href={`/products/${item.id}`}
            imageUrl={item.image}
          />
        ))}
      </div>
    </section>
  );
};
