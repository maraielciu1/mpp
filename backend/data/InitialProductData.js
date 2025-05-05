const baseProducts = [
    {
        _id: 1,
        name: "Grey Boy Blouse",
        description: "A lightweight, long-sleeve grey blouse with an animated design.",
        price: 50,
        image: ["https://i.pinimg.com/736x/d1/c3/9f/d1c39f353716952e97fbff29470d9aeb.jpg"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true
    },
    {
        _id: 2,
        name: "Orange Boy Blouse",
        description: "A lightweight, long-sleeve orange blouse with cool message.",
        price: 50,
        image: ["https://i.pinimg.com/736x/0e/9d/ee/0e9dee52b0b5ee5412a90f9aefbb5a61.jpg"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false
    },
    {
        _id: 3,
        name: "Set with 2 Girl Blouses",
        description: "A set of two lightweight, long-sleeve blouses for girls, perfect for any occasion.",
        price: 80,
        image: ["https://i.pinimg.com/736x/74/41/1d/74411dc5bf1a19b5635c12aa9d8779e0.jpg"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true
    },
    {
        _id: 4,
        name: "Blue Men's Blouse",
        description: "A smart casual blue blouse for men, made from breathable fabric.",
        price: 70,
        image: ["https://i.pinimg.com/736x/1e/11/ec/1e11eccf41da44dcd106739ebf1dc893.jpg"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        bestseller: false
    },
    {
        _id: 5,
        name: "Classic Men's Shirt",
        description: "A stylish and comfortable shirt for everyday wear.",
        price: 65,
        image: ["https://i.pinimg.com/736x/30/39/1b/30391b10d031236d84adcfc04ca4b5b7.jpg"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true
    },
    {
        _id: 6,
        name: "Men's Winter Jacket",
        description: "A warm and waterproof winter jacket for men.",
        price: 120,
        image: ["https://i.pinimg.com/736x/1a/33/c4/1a33c4a5d0993a492b9cf8fdfd0d0bc1.jpg"],
        category: "Men",
        subCategory: "Outerwear",
        sizes: ["M", "L", "XL"],
        bestseller: true
    },
    {
        _id: 7,
        name: "Men's Slim Fit Jeans",
        description: "Dark-washed, slim-fit jeans designed for a modern look.",
        price: 90,
        image: ["https://i.pinimg.com/736x/6d/15/e6/6d15e626cf5928bc99541887ca4cd29d.jpg"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false
    },
    {
        _id: 8,
        name: "Men's Casual Jeans",
        description: "Light-blue denim jeans for casual everyday wear.",
        price: 85,
        image: ["https://i.pinimg.com/736x/2b/c2/0c/2bc20cd43f6f40b6928fb098c81004c3.jpg"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["M", "L", "XL"],
        bestseller: false
    },
    {
        _id: 9,
        name: "Men's Black Vest",
        description: "A sleek, sleeveless vest perfect for layering or formal wear.",
        price: 60,
        image: ["https://i.pinimg.com/736x/f3/2d/90/f32d90b4e5fa2726539e0148f5a47f88.jpg"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        bestseller: true
    },
    {
        _id: 10,
        name: "Women's White Blouse",
        description: "Elegant white blouse suitable for both casual and formal settings.",
        price: 55,
        image: ["https://i.pinimg.com/736x/fc/ef/85/fcef85eb6d9bf389394d3d3adaec6532.jpg"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false
    },
    {
        _id: 11,
        name: "Women's Peach Blouse",
        description: "Chic and soft peach blouse that pairs well with jeans or skirts.",
        price: 60,
        image: ["https://i.pinimg.com/736x/a6/0a/5c/a60a5ccc2663a3ae5fc8c4858d699619.jpg"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: true
    },
    {
        _id: 12,
        name: "Women's Quilted Jacket",
        description: "A cozy quilted jacket for cold weather outings.",
        price: 110,
        image: ["https://i.pinimg.com/736x/66/31/37/6631370f3e1c15f9027246fb0b155e3a.jpg"],
        category: "Women",
        subCategory: "Outerwear",
        sizes: ["M", "L", "XL"],
        bestseller: false
    },
    {
        _id: 13,
        name: "Women's Brown Jacket",
        description: "A stylish brown jacket with a modern cut and soft lining.",
        price: 105,
        image: ["https://i.pinimg.com/736x/a1/9b/15/a19b159da84cff50900447c6de8750c3.jpg"],
        category: "Women",
        subCategory: "Outerwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true
    },
    {
        _id: 14,
        name: "Women's Skinny Jeans",
        description: "Figure-hugging skinny jeans made with stretchy denim for comfort.",
        price: 75,
        image: ["https://i.pinimg.com/736x/5f/df/6e/5fdf6e6e82762523647308334ee61b65.jpg"],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        bestseller: false
    },
    {
        _id: 15,
        name: "Women's High-Waisted Jeans",
        description: "Trendy high-waisted jeans with a flattering silhouette.",
        price: 80,
        image: ["https://i.pinimg.com/736x/ae/6d/6d/ae6d6d1eb87eb49f5a56274e22ed7b78.jpg"],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true
    },
];


export const initialProducts = [...baseProducts];
console.log("Initial Products Loaded:", initialProducts.length);