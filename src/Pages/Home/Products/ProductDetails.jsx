import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5005/products/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Product not found');
                }
            })
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 flex justify-center items-center">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                    <img src={product.image} alt={product.name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                        <p className="text-gray-600 text-lg">${product.price.toFixed(2)}</p>
                        <Link
                            to={`/cart/add/${product.id}`} // Change the path to the correct route
                            className="btn btn-primary mt-2"
                        >
                            Add to Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
