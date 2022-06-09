import React, { useEffect, useState, memo } from 'react';
import PageWrapper from '@components/page-wrapper/page-wrapper';
import Slider from "react-slick";
import { connect } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RecommendedCard from "@components/Cards/Home/RecommendedCard";
import { getBestSellerProducts, getNewArrivalProducts, getShopProductsStart } from '@redux/shop/shop-action';
import ProductItem from '@components/product-item/product-item';
import { useRouter } from 'next/router';
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
const Index = ({ banner, getBestSellerProducts, products, info, getNewArrivalProducts }) => {
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
    autoplaySpeed: 2000,
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
    <div >
      {/* <ToastContainer /> */}
      {/* slider div */}
      <div className='my-2 lg:my-4 lg:mx-14 sm:px-4'>
        <div>
          <Slider {...bannersettings}>
            {banner.map((item, idx) => <div className='max-h-[180px] lg:w-full lg:h-[500px] lg:max-h-[500px]' key={idx}>
              <img className='w-full h-auto' src={item.banner_img_url} alt="" />
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
              <img onClick={() => router.push(`/product/${item.item_id}`)} className='w-[80px] h-[80px] max-h-[80px] lg:w-[200px] lg:h-[200px] lg:max-h-[200px] ml-4 mt-2' src={`${item.primary_img || '/img/default.png'}`} alt="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(PageWrapper(Index)));