export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Бүтээгдэхүүн',
    items: [
      {
        name: 'Бүтээгдэхүүний жагсаалт',
        slug: 'admin/products',
        description: 'Create UI that is shared across routes',
      },
      {
        name: 'Шинээр нэмэх',
        slug: 'admin/products/add',
        description: 'Create UI that is shared across routes',
      },
      {
        name: 'Статистик',
        slug: 'admin/products/analytics',
        description: 'Create UI that is shared across routes',
      },
    ],
  },
  {
    name: 'Төрөл',
    items: [
      {
        name: 'Төрлийн жагсаалт',
        slug: 'admin/categories',
        description: 'Create UI that is shared across routes',
      },
      {
        name: 'Шинээр төрөл нэмэх',
        slug: 'admin/categories/add',
        description: 'Create UI that is shared across routes',
      },
    ],
  },
];
