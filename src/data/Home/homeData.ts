import {
  CircleStackIcon,
  CubeTransparentIcon,
  CurrencyDollarIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

// Main
export const MAIN_DATA = [
  {
    name: 'Happy Jolly #61',
    price: 0.01,
    time: '16: 21: 01',
    image: '/images/banner_image_2.webp',
    rotation: '-rotate-[12deg]',
    scale: 'scale-[.8]',
    direction: 'left-0 right-[unset] lg:left-[unset] lg:right-[120px]',
  },
  {
    name: 'Happy Jolly #42',
    price: 0.02,
    time: '12: 21: 01',
    image: '/images/banner_image_1.webp',
    zIndex: 'z-10',
    direction: 'right-[unset] lg:right-[60px]',
  },
  {
    name: 'Happy Jolly #14',
    price: 0.01,
    time: '08: 21: 01',
    image: '/images/banner_image_3.webp',
    rotation: 'rotate-[12deg]',
    scale: 'scale-[.8]',
    direction: 'right-0',
  },
];
export const FAQ_DATA = [
  {
    name: 'What is NFT?',
    description: `An NFT, or Non-Fungible Token, is a digital asset that represents ownership or proof of authenticity of something unique, such as a piece of art or a video clip. It's like a certificate of ownership for a specific item, except that it's stored on a secure digital ledger called a blockchain, which makes it hard to fake or duplicate.`,
    icon: CircleStackIcon,
    color: 'bg-violet-500',
  },
  {
    name: 'What chain is Happy Jolly on?',
    description:
      'Ethereum Mainnet and Happy Jolly tokens are based on the ERC-1155 standard',
    icon: CubeTransparentIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'How much do Happy Jolly cost?',
    description: `The prices vary depending on the rarity and edition of each NFT, but they start at around 0.01 ETH. That's a great deal for such unique and beautiful digital art that will make a great addition to your collection. Don't miss out on this opportunity to own a piece of Happy Jolly's world! Come and check out my listings on OpenSea now.`,
    icon: CurrencyDollarIcon,
    color: 'bg-green-500',
  },
  {
    name: 'How do I get a Happy Jolly?',
    description: `1. Select Happy Jolly you want to buy.
        2. Click buy button to go to the OpenSea website and sign up for an account.
        3. Once you're signed in, you can click the "Buy Now" button to purchase the Happy Jolly NFT at the listed price.
        4. Once the transaction is confirmed and your payment is processed, the NFT will be transferred to your digital wallet on OpenSea. You can access your wallet by clicking on your profile icon and selecting "My Profile."
        5. That's it! You now own the NFT and can keep it in your digital wallet or transfer it to another wallet or marketplace if you wish.
        `,
    icon: WalletIcon,
    color: 'bg-orange-500',
  },
];
