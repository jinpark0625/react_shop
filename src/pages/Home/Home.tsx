import Main from 'components/Home/Main';
import Intro from 'components/Home/Intro';
import IntroRarity from 'components/Home/IntroRarity';
import SlideContainer from 'components/Home/SlideContainer';
import Faq from 'components/Home/Faq';

const Home = () => {
  return (
    <>
      <Main />
      <Intro />
      <IntroRarity />
      <SlideContainer />
      <Faq />
    </>
  );
};

export default Home;
