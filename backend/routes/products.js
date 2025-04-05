// routes/products.js
import express from 'express';
const router = express.Router();

const initialProducts = [
    {
        _id: 1,
        name: "Grey Boy Blouse",
        description: "A lightweight, long-sleeve grey blouse with an animated design.",
        price: 50,
        image: ["Boy_Blouse1.png"],
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
        image: ["Boy_Blouse2.png"],
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
        image: ["Girl_Blouse.png"],
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
        image: ["Man_Blouse1.png"],
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
        image: ["MAn_Blouse.png"],
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
        image: ["Man_Jacket.png"],
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
        image: ["Man_Jeans1.png"],
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
        image: ["Man_Jeans2.png"],
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
        image: ["Man_vest.png"],
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
        image: ["Woman_Blouse1.png"],
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
        image: ["Woman_Blouse2.png"],
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
        image: ["Woman_Jacket.png"],
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
        image: ["Woman_Jacket1.png"],
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
        image: ["Woman_Jeans1.png"],
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
        image: ["Woman_Jeans2.png"],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true
    }
];

let products = [...initialProducts];

// GET all products (with optional filter/sort)
router.get('/', (req, res) => {
    products = [...initialProducts]; // reset

    let result = [...products];

    if (req.query.category) {
        result = result.filter(p => p.category === req.query.category);
    }
    if (req.query.subCategory) {
        result = result.filter(p => p.subCategory === req.query.subCategory);
    }

    if (req.query.sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (req.query.sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
    }

    result = result.map(p => ({
        ...p,
        image: p.image.map(img => `${req.protocol}://${req.get('host')}/images/${img}`)
    }));

    res.json(result);
});


// GET one product
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p._id === id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json({
        ...product,
        image: Array.isArray(product.image)
            ? product.image.map(img => `${req.protocol}://${req.get('host')}/images/${img}`)
            : [`${req.protocol}://${req.get('host')}/images/${product.image}`]
    });
});



// POST new product
router.post('/', (req, res) => {
    const newProduct = { ...req.body, _id: Date.now() };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PATCH update
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p._id === id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const initialLength = products.length;
    products = products.filter(p => p._id !== id);
    if (products.length === initialLength) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Deleted successfully' });
});

export default router;
