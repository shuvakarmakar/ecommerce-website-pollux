import { useState, useEffect } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5005/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="p-4 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                    <div className="relative aspect-w-16 aspect-h-9">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full rounded-t-lg"
                        />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
