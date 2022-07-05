import React, { useEffect, useState, memo } from 'react';
import PageWrapper from '@components/page-wrapper/page-wrapper';
import Slider from "react-slick";
import { connect } from 'react-redux';
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RecommendedCard from "@components/Cards/Home/RecommendedCard";
import { getBestSellerProducts, getNewArrivalProducts, getShopProductsStart } from '@redux/shop/shop-action';
import ProductItem from '@components/product-item/product-item';
import { useRouter } from 'next/router';
import fetcher from '@redux/utility';
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className='hidden md:block lg:block'>
      <div
        className={className}
        style={{ ...style, display: "block", marginRight: "50px" }}
        onClick={onClick}
      >
      </div>
    </div>

  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className='hidden md:block lg:block'>
      <div
        className={className}
        style={{ ...style, display: "block", marginLeft: "50px", zIndex: '1' }}
        onClick={onClick}
      />
    </div>
  );
}
const Index = ({ banner, getBestSellerProducts, products, info, getNewArrivalProducts, seo, store }) => {
  const router = useRouter()
  const storeId = info.store_id;
  const [status, setStatus] = useState('loading')
  const [bestSellerProducts, setBestSellerProducts] = useState([])
  const [newArrivalProducts, setNewArrivalProducts] = useState([])
  var bannersettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          dots: false,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    getBestSellerProducts({ storeId, setBestSellerProducts });
    getNewArrivalProducts({ storeId, setNewArrivalProducts })
  }, [])
  console.log(products)
  useEffect(() => {
    const { storeId } = router.query
    router.push(router.asPath)
  }, [router.isReady])
  return (
    <>
      <Head>
        <title>{store ? store.store_name : 'GoPlinto'}</title>
        <link rel="shortcut icon" href={store ? store.logo_img_url : 'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'} type="image/x-icon" />
        <meta name="description" content={store ? store.store_desc : 'GoPlinto'} />

        <meta property="og:title" content={seo ? seo.seo_title : store ? store?.store_name : 'GoPlinto'}></meta>
        <meta property="og:description" content={seo ? seo?.seo_desc : store ? store.store_desc : 'GoPlinto'}></meta>
        <meta property="og:image" content={store ? store.logo_img_url : 'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'}></meta>
        <meta property="og:image:secure_url" content={store ? store.logo_img_url : 'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'}></meta>

        <meta name="keywords" content={seo? seo?.seo_tags :`Goplinto, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />
      </Head>
      <div >
        {/* <ToastContainer /> */}
        {/* slider div */}
        <div className='my-2 lg:my-4 lg:mx-14 sm:px-4'>
          <div>
            <Slider {...bannersettings}>
              {banner.map((item, idx) => <div className='max-h-[180px] lg:w-full lg:h-[500px] lg:max-h-[500px]' key={idx}>
                <a target="_blank" href={item.target_url}>
                  <img className={`w-full h-auto min-h-[180px] lg:min-h-[500px] ${item.target_url ? "cursor-pointer" : ""}`} src={item.banner_img_url} alt="" />
                </a>
              </div>)}
            </Slider>
          </div>
        </div>
        {/* fresh items */}
        {newArrivalProducts.length != 0 && <div className='wrapper'>
          <h2 className='mt-8 mb-2 text-lg md:text-xl lg:text-2xl font-bold ml-3 sm:ml-0'>New Arrivals</h2>
          <div className='bg-[#C0EDAB]'>
            <Slider {...settings}>
              {newArrivalProducts.map((item, idx) => <div key={idx}>
                <img onClick={() => router.push(`/product/${item.item_id}`)} className='cursor-pointer w-[80px] h-[80px] max-h-[80px] lg:w-[200px] lg:h-[200px] lg:max-h-[200px] ml-4 mt-2' src={`${item.primary_img || '/img/default.png'}`} alt="" />
              </div>)}
            </Slider>
          </div>
        </div>}
        {/* Recommended */}
        {bestSellerProducts.length != 0 && <div className='wrapper'>
          <h2 className='mt-8 mb-2 text-lg md:text-xl lg:text-2xl font-bold ml-3 sm:ml-0'>Recommended</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-8 gap-y-14 px-3 md:px-0'>
            {bestSellerProducts.map((item, idx) =>
              <ProductItem key={idx} data={item} />
            )
            }
          </div>
        </div>}

      </div >
    </>
  );
};

const mapStateToProps = state => ({
  banner: state.store.banners,
  products: state.store.products,
  info: state.store.info,

})

const mapDispatchToProps = dispatch => ({
  getBestSellerProducts: (storeId) => dispatch(getBestSellerProducts(storeId)),
  getNewArrivalProducts: (storeId) => dispatch(getNewArrivalProducts(storeId)),

})

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID;
  const seoRes = await fetcher('GET', `?r=stores/get-seo-details&storeId=${storeId}`)
  const seo = seoRes.data
  const storeSettingsRes = await fetcher('GET', `?r=stores/get-details&storeId=${storeId}`)
  const store = storeSettingsRes.data
  // console.log("from getstatic props",store)
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      seo,
      store
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(PageWrapper(Index)));