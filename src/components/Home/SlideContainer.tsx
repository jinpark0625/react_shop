import NftSlide from './NftSlide';
import ProductSlide from './ProductSlide';
import useSlide from 'hooks/useSlide';

const SlideContainer = () => {
  const {
    nftsQuerySlide: { isLoading: nftLoading, data: nftData },
    productSlideQuery: { isLoading, error, data: productData },
  } = useSlide();

  return (
    <>
      <NftSlide isLoading={nftLoading} products={nftData} />
      <ProductSlide
        isLoading={isLoading}
        error={error}
        products={productData}
      />
    </>
  );
};

export default SlideContainer;
