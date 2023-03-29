/* eslint-disable @typescript-eslint/naming-convention */
import useNftDetail from 'hooks/useNftDetail';
import { useLocation } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import ErrorMessage from 'components/ui/ErrorMessage';
import Button from 'components/ui/Button';
import { SiEthereum } from 'react-icons/si';
import { useState, MouseEvent, useCallback } from 'react';
import { FILTERITEM } from 'data/Products';
import { NftType } from 'utils/interfaces';
import { removeCollectionsPrefix } from 'utils/utils';

type onCopyFn = (text: string) => Promise<boolean>;

const NftDetail = () => {
  const { pathname } = useLocation();

  const id = removeCollectionsPrefix('/nfts/', pathname);

  const { isLoading, error, data } = useNftDetail(id);

  const { title, image, token_id } = data?.data?.[0] ?? {};
  // const { permalink, usd_price, eth_price } = data ?? {};

  const [clicked, setClicked] = useState(false);

  const handleClickStyleChange = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.defaultPrevented) return;
      setClicked((prev) => !prev);
    },
    [],
  );

  const [isCopy, setIsCopy] = useState<boolean>(false);

  const onCopy: onCopyFn = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);

      return true;
    } catch (error) {
      console.error(error);
      setIsCopy(false);

      return false;
    }
  };

  // Error Message
  if (error)
    return (
      <div className="mt-20">
        <ErrorMessage />
      </div>
    );

  return (
    <main className="mx-auto mb-32 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="flex h-[calc(100vh-65px)] flex-col items-center justify-center">
        {isLoading && (
          <div className="h-[519px] w-[260px] animate-pulse rounded-2xl bg-gray-50 sm:w-[320px]"></div>
        )}
        {data && (
          <div
            className="flip-card h-[519px] w-[310px] bg-transparent transition-transform hover:scale-105 sm:w-[320px]"
            onClick={(e) => handleClickStyleChange(e)}
          >
            <div
              className={`flip-card-inner h-full cursor-pointer ${
                clicked ? 'flip_active' : ''
              }`}
            >
              {/* front side */}
              <div className="flip-card-front rounded-2xl bg-white p-4 shadow-custom ">
                <div className="relative">
                  <LazyLoadImage
                    src={image}
                    alt="Image Alt"
                    className="rounded-2xl"
                    effect="blur"
                  />
                  <div
                    className={`absolute bottom-3 left-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 ${
                      clicked ? 'opacity-0' : 'opacity-100'
                    } transition duration-300`}
                  >
                    <ArrowPathIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="border-b border-gray-200 pb-4 text-lg font-bold text-gray-900">
                    {title}
                  </h3>
                  <div className="flex items-end justify-between pt-4">
                    <div className="relative rounded-lg border-2 border-violet-500 px-2 py-1">
                      <span className="absolute -top-3 bg-white px-2 text-xs text-violet-400">
                        Price
                      </span>
                      <p className=" flex items-center text-lg font-bold text-violet-500">
                        <SiEthereum className="mr-1" />
                        {/* {eth_price ? eth_price * 0.01 : 0} ETH */}
                        0.01 ETH
                      </p>
                    </div>
                    <div className="text-gray-500">
                      <div className="text-right text-xs">USD</div>
                      <p className="mt-1 flex items-center justify-end text-sm">
                        {/* ${(usd_price ? usd_price * 0.01 : 0).toFixed(2)} */}
                        {(data.usd * 0.01).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  text="View on OpenSea"
                  onClick={(e) => {
                    e.preventDefault();
                    // window.open(permalink, '_blank');
                    window.open(
                      `https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/${
                        token_id ?? ''
                      }`,
                      '_blank',
                    );
                  }}
                  className="mb-5 mt-8 h-full w-full border bg-violet-500 font-medium text-white shadow-sm transition-all hover:bg-violet-600"
                />
              </div>
              {/* back side */}
              <div className="flip-card-back rounded-2xl bg-white px-4 pb-4 shadow-custom ">
                <svg
                  viewBox="0 0 32 32"
                  className="z-10 m-auto h-[60px] w-[60px] rotate-45 fill-violet-500"
                >
                  <path d="M27.67,7.87a3.48,3.48,0,0,0-2.47-1h0a3.49,3.49,0,1,0-6.29,2l-10,10a3.51,3.51,0,0,0-2.1-.7,3.46,3.46,0,0,0-2.46,1,3.5,3.5,0,0,0,2.47,6h0a3.49,3.49,0,1,0,6.29-2l10-10a3.51,3.51,0,0,0,2.1.7,3.46,3.46,0,0,0,2.46-1A3.5,3.5,0,0,0,27.67,7.87Z" />
                </svg>
                {/* Attribute */}
                <div>
                  <h3 className="mb-3 border-b border-gray-200 pb-1 text-center text-lg font-medium">
                    Attributes
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {FILTERITEM.map((key) => {
                      const attribute =
                        data.data[0][
                          key.toLowerCase() as keyof NftType
                        ].toString();
                      return (
                        <div
                          className="rounded-md border border-violet-500 bg-violet-50 p-2 text-center font-medium"
                          key={key}
                        >
                          <p className="mb-[2px] text-[11px] text-violet-500">
                            {key}
                          </p>
                          <p className="text-sm">
                            {attribute.replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Details */}
                <div>
                  <h3 className="mb-3 mt-6 border-b border-gray-200  pb-1 text-center text-lg font-medium">
                    Details
                  </h3>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="shrink-0">Contract Address</span>
                      <span
                        className="max-w-[114px] truncate text-sm font-medium text-violet-500"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            'https://etherscan.io/address/0x495f947276749ce646f68ac8c248420045cb7b5e',
                            '_blank',
                          );
                        }}
                      >
                        0x495f...7674
                      </span>
                    </div>
                    <div className="relative flex items-center justify-between">
                      <span className="shrink-0">Token ID</span>
                      <span
                        className="peer max-w-[114px] truncate text-sm font-medium text-gray-600"
                        onClick={async (e) => {
                          e.preventDefault();
                          await onCopy(token_id ?? '');
                        }}
                        onMouseOver={() => setIsCopy(false)}
                      >
                        <DocumentDuplicateIcon className="mr-1 mb-1 inline-block h-4 w-4" />
                        {token_id}
                      </span>
                      <div className="pointer-events-none absolute bottom-full right-0 z-10 mb-2 ml-14 w-28 rounded-lg bg-gray-800 py-2 px-3 text-center text-xs text-white opacity-0 transition-opacity peer-hover:opacity-100">
                        {isCopy ? 'Copied!' : 'Copy'}
                        <svg
                          className="absolute left-0 top-full h-2 w-full text-gray-800"
                          viewBox="0 0 255 255"
                        >
                          <polygon
                            className="fill-current"
                            points="0,0 127.5,127.5 255,0"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="shrink-0">Token Standard</span>
                      <span className="max-w-[114px] truncate text-sm font-medium text-gray-600">
                        ERC-1155
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="shrink-0">Chain</span>
                      <span className="max-w-[114px] truncate text-sm font-medium text-gray-600">
                        Ethereum
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default NftDetail;
