import Main from 'components/Home/Main';
import Intro from 'components/Home/Intro';
import IntroRarity from 'components/Home/IntroRarity';
import ProductSlide from 'components/Home/ProductSlide';
import NftSlide from 'components/Home/NftSlide';
import Faq from 'components/Home/Faq';

const Home = () => {
  return (
    <>
      <Main />
      <Intro />
      <IntroRarity />
      <NftSlide />
      <ProductSlide />
      <Faq />
    </>
  );
};

export default Home;
