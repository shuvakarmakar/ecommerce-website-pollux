import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddProducts = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            // Send a POST request to your backend API with the data object
            const response = await fetch('http://localhost:5005/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Display a success alert using Swal
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added',
                    text: 'The product has been successfully added.',
                });

                // Reset the form
                reset();
            } else {
                console.error('Product creation failed:', response);
                // Display an error alert using Swal or handle the error as needed
            }
        } catch (error) {
            console.error('Error adding product:', error);
            // Display an error alert using Swal or handle the error as needed
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        className={`mt-1 p-2 w-full rounded-md focus:ring focus:ring-indigo-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Product Price:</label>
                    <input
                        type="number"
                        id="productPrice"
                        className={`mt-1 p-2 w-full rounded-md focus:ring focus:ring-indigo-200 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('price', { required: true, min: 0 })}
                    />
                    {errors.price && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Product Description:</label>
                    <textarea
                        id="productDescription"
                        className={`mt-1 p-2 w-full rounded-md focus:ring focus:ring-indigo-200 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('description', { required: true })}
                    />
                    {errors.description && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image URL:</label>
                    <input
                        type="text"
                        id="productImage"
                        className={`mt-1 p-2 w-full rounded-md focus:ring focus:ring-indigo-200 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('image', { required: true })}
                    />
                    {errors.image && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md hover:shadow-md transition duration-300"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProducts;
