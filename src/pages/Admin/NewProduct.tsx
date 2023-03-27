// import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../../api/uploader';
import Button from '../../components/ui/Button';
import { useState, ChangeEvent, FormEvent } from 'react';
import { ProductType } from '../../utils/interfaces';
import useProducts from '../../hooks/useProducts';
import { toast } from 'react-toast';

const NewProduct = () => {
  const [product, setProduct] = useState<ProductType>({
    id: 0,
    title: '',
    price: 0,
    category: '',
    subCategory: '',
    tags: '',
    color: '',
    description: '',
    options: '',
    sizes: [''],
    image: [''],
  });
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // const [sucess, setSucess] = useState<string | null>();

  const { addProduct } = useProducts();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files?.[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              toast.success('The product has been added successfully.', {
                backgroundColor: '#008000',
              });
            },
            onError: () => {
              toast.error(
                'Oops! The product has not been added successfully.',
                {
                  backgroundColor: '#e60022',
                },
              );
            },
          },
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className="w-full text-center">
      <h2 className="py-8 text-2xl font-bold">Add new product</h2>
      {file && (
        <img
          className="mx-auto mb-2 w-96"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col px-12">
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ''}
          placeholder="Title"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ''}
          placeholder="Price"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ''}
          placeholder="Category"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ''}
          placeholder="Description"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ''}
          placeholder="Options(Separate with a comma (,))"
          required
          onChange={handleChange}
          className="mb-8"
        />
        <Button
          text={isUploading ? 'Uploading...' : 'Add product'}
          disabled={isUploading}
          className="bg-violet-500"
        />
      </form>
    </section>
  );
};

export default NewProduct;
