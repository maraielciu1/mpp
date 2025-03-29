import addIcon from './addIcon.png'
import bagIcon from './bagIcon.png'
import closeIcon from './closeIcon.png'
import listIcon from './listIcon.png'
import menuIcon from './menuICon.png'
import profileIcon from './profileIcon.png'
import searchIcon from './searchIcon.png'
import statsIcon from './statsIcon.png'
import userIcon from './userIcon.png'
import logo from './MyClosetLogo.png'
import p_img1 from './Boy_Blouse1.png'
import p_img2 from './Boy_Blouse2.png'
import p_img3 from './Girl_Blouse.png'
import p_img4 from './Man_Blouse1.png'
import p_img5 from './MAn_Blouse.png'
import p_img6 from './Man_Jacket.png'
import p_img7 from './Man_Jeans1.png'
import p_img8 from './Man_Jeans2.png'
import p_img9 from './Man_vest.png'
import p_img10 from './Woman_Blouse1.png'
import p_img11 from './Woman_Blouse2.png'
import p_img12 from './Woman_Jacket.png'
import p_img13 from './Woman_Jacket1.png'
import p_img14 from './Woman_Jeans1.png'
import p_img15 from './Woman_Jeans2.png'
import p_img16 from './Woman_Coat.png'
import heroimg from './front_view.png'

export const assets = {
    bagIcon,
    addIcon,
    closeIcon,
    listIcon,
    menuIcon,
    profileIcon,
    searchIcon,
    statsIcon,
    userIcon,
    logo,
    p_img1,
    p_img2,
    p_img3,
    p_img4,
    p_img5,
    p_img6,
    p_img7,
    p_img8,
    p_img9,
    p_img10,
    p_img11,
    p_img12,
    p_img13,
    p_img14,
    p_img15,
    p_img16,
    heroimg
}

export const products = [
    {
        _id: 1,
        name: "Grey Boy Blouse",
        description: "A lightweight, long-sleeve grey blouse with an animated design.",
        price: 50,
        image: [p_img1],
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
        image: [p_img2],
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
        image: [p_img3],
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
        image: [p_img4],
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
        image: [p_img5],
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
        image: [p_img6],
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
        image: [p_img7],
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
        image: [p_img8],
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
        image: [p_img9],
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
        image: [p_img10],
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
        image: [p_img11],
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
        image: [p_img12],
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
        image: [p_img13],
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
        image: [p_img14],
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
        image: [p_img15],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true
    }

]

export const imageOptions = [
    { label: 'Boy Blouse 1', value: 'p_img1' },
    { label: 'Boy Blouse 2', value: 'p_img2' },
    { label: 'Girl Blouse', value: 'p_img3' },
    { label: 'Man Blouse 1', value: 'p_img4' },
    { label: 'Man Shirt', value: 'p_img5' },
    { label: 'Man Jacket', value: 'p_img6' },
    { label: 'Man Jeans 1', value: 'p_img7' },
    { label: 'Man Jeans 2', value: 'p_img8' },
    { label: 'Man Vest', value: 'p_img9' },
    { label: 'Woman Blouse 1', value: 'p_img10' },
    { label: 'Woman Blouse 2', value: 'p_img11' },
    { label: 'Woman Jacket', value: 'p_img12' },
    { label: 'Woman Jacket 1', value: 'p_img13' },
    { label: 'Woman Jeans 1', value: 'p_img14' },
    { label: 'Woman Jeans 2', value: 'p_img15' },
    { label: 'Woman Coat', value: 'p_img16' }
];