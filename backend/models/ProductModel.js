export class Product {
    constructor({ _id, name, description, price, image, category, subCategory, sizes, bestseller }) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.subCategory = subCategory;
        this.sizes = sizes;
        this.bestseller = bestseller;
    }
}