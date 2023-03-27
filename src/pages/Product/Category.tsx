import Products from './Products';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CATEGORIES } from 'data/Products';
import { removeCollectionsPrefix } from 'utils/utils';

const Category = () => {
  const { pathname } = useLocation();
  const pageTitle = removeCollectionsPrefix('/collections/', pathname);

  const { type } = CATEGORIES[pageTitle] || { type: 'tags' };

  const [pageData, setPageData] = useState({
    key: type,
    value: pageTitle,
  });
  const [shouldDeduplicate, setShouldDeduplicate] = useState(false);

  useEffect(() => {
    setPageData({
      key: type,
      value: pageTitle,
    });
    setShouldDeduplicate(false);
  }, [pathname]);

  return (
    <>
      <Products
        pageData={pageData}
        shouldDeduplicate={shouldDeduplicate}
        setShouldDeduplicate={setShouldDeduplicate}
      />
    </>
  );
};

export default Category;
