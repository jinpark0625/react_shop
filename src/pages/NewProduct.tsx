// import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';
import { useState, ChangeEvent, FormEvent } from 'react';
import { ProductType } from '../utils/interfaces';
import useProducts from '../hooks/useProducts';

const NewProduct = () => {
  const [product, setProduct] = useState<ProductType>({
    title: '',
    price: 0,
    category: '',
    description: '',
    options: '',
  });
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [sucess, setSucess] = useState<string | null>();

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
              setSucess('성공적으로 제품이 추가되었습니다.');
              setTimeout(() => {
                setSucess(null);
              }, 4000);
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
      <h2 className="my-4 text-2xl font-bold">새로운 제품 등록</h2>
      {sucess && <p className="my-2">{sucess}</p>}
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
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ''}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ''}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ''}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ''}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? '업로드중...' : '제품 등록하기'}
          disabled={isUploading}
        />
      </form>
    </section>
  );
};

export default NewProduct;
