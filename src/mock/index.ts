export const CATEGORIES = ['Dogs', 'Cats', 'Birds', 'Reptiles', 'Fish'];

export const SERVICES = ['Бүтээгдэхүүн', 'Төрөл'];

export const ADDRESS = ['Хаяг', 'БЗД, 6-р хороо', '42 байрны 1 давхар'];

export const products = [
  {
    id: '1',
    name: 'Organic Dog Food',
    description:
      'Premium quality organic dog food made with human-grade ingredients.',
    image: '/public/1.jpg',
    price: 49.99,
    quantity: 20,
    category_id: '1',
  },
  {
    id: '4',
    name: 'Cat Scratching Post',
    description:
      "A sturdy and durable cat scratching post that will keep your cat's claws healthy and your furniture scratch-free.",
    image: '/2.jpg',
    price: 39.99,
    quantity: 25,
    category_id: '2',
  },
  {
    id: '5',
    name: 'Pet Carrier',
    description:
      'A comfortable and secure pet carrier that is perfect for travel or trips to the vet.',
    image: '/3.jpg',
    price: 59.99,
    quantity: 10,
    category_id: '3',
  },
  {
    id: '6',
    name: 'Dog Training Collar',
    description:
      'A reliable and effective dog training collar with adjustable levels of vibration and shock.',
    image: '/4.jpg',

    price: 79.99,
    quantity: 5,
    category_id: '1',
  },
  {
    id: '2',
    name: 'Interactive Cat Toy',
    description:
      'A fun and engaging toy that will keep your cat entertained for hours.',
    image: '/5.jpg',
    price: 19.99,
    quantity: 30,
    category_id: '2',
  },
  {
    id: '3',
    name: 'Dog Grooming Kit',
    description:
      'A comprehensive dog grooming kit that includes all the tools you need to keep your dog looking and feeling great.',
    image: '/6.jpg',
    price: 69.99,
    quantity: 15,
    category_id: '1',
  },
  {
    id: '7',
    name: 'Cat Bed',
    description:
      'A cozy and comfortable cat bed that will provide your furry friend with a warm and soft place to rest.',
    image: '/1.jpg',

    price: 29.99,
    quantity: 20,
    category_id: '2',
  },
  {
    id: '8',
    name: 'Dog Treats',
    description:
      'Healthy and delicious dog treats made with natural ingredients and free from additives and preservatives.',
    image: '/4.jpg',

    price: 12.99,
    quantity: 50,
    category_id: '1',
  },
  {
    id: '9',
    name: 'Cat Litter Box',
    description:
      'A functional and easy-to-clean cat litter box that will keep your home smelling fresh and clean.',
    image: '/7.jpg',
    price: 49.99,
    quantity: 15,
    category_id: '2',
  },
];

export const petCategories = [
  {
    id: '1',
    name: 'Dog Food',
    description:
      'A category of pet products that includes dog food and treats.',
    image: '/1.jpg',
  },
  {
    id: '2',
    name: 'Cat Supplies',
    description:
      'A category of pet products that includes cat food, litter boxes, scratching posts, and toys.',
    image: '/5.jpg',
  },
  {
    id: '3',
    name: 'Pet Accessories',
    description:
      'A category of pet products that includes carriers, beds, grooming kits, and shampoos.',
    image: '/4.jpg',
  },
  {
    id: '4',
    name: 'Bird Supplies',
    description:
      'A category of pet products that includes bird food, cages, and toys.',

    image: '/4.jpg',
  },
  {
    id: '5',
    name: 'Fish Supplies',
    description:
      'A category of pet products that includes fish food, aquariums, and decorations.',
    image: '/2.jpg',
  },
];

// Image upload hiij chadahgui baigaa uchir random image uusgej bn
export const images = ['/public/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg'];

export const getRandomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};

export const catImages = ['/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg'];
