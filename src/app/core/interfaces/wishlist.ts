export type Wishlist = {
    sold: number;
    images: Array<string>;
    subcategory: Array<{
        _id: string;
        name: string;
        slug: string;
        category: string;
    }>;
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: {
        _id: string;
        name: string;
        slug: string;
        image: string;
    };
    brand: {
        _id: string;
        name: string;
        slug: string;
        image: string;
    };
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
};
