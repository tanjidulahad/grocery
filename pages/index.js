import React, { useEffect, useState } from 'react';
import PageWrapper from '@components/page-wrapper/page-wrapper';
import Slider from "react-slick";
import { connect } from 'react-redux'
import RecommendedCard from "@components/Cards/Home/RecommendedCard";
import { getShopProductsStart } from '@redux/shop/shop-action';
import ProductItem from '@components/product-item/product-item';
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
const Index = ({ banner,getShopProducts ,products,info}) => {
  const storeId = info.store_id;
  const [status, setStatus] = useState('loading')
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
    dots: true,
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

  useEffect(()=>{
    getShopProducts({ storeId, setStatus })
  },[])
  console.log(products)

  return (
    <div >
      {/* slider div */}
      <div className='mt-10 mr-6 ml-6 lg:mr-24 lg:ml-24 mb-8'>
        <div>
          <Slider {...bannersettings}>
            {banner.map((item, idx) => <div key={idx}>
              <img className='lg:w-full lg:h-[500px] lg:max-h-[500px]' src={item.banner_img_url} alt="" />
            </div>)}
          </Slider>
        </div>
      </div>
      {/* fresh items */}
      <div className='mr-6 ml-6 lg:mr-40 lg:ml-40'>
        <h2 className='mt-8 mb-2 text-lg md:text-xl lg:text-2xl font-bold '>Fresh Items</h2>
        <div className='bg-[#C0EDAB]'>
          <Slider {...settings}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, idx) => <div key={idx}>
              <img className='w-[80px] h-[80px] max-h-[80px] lg:w-[200px] lg:h-[200px] lg:max-h-[200px] ml-4 mt-2' src="/img/fresh1.png" alt="" />
            </div>)}
          </Slider>
        </div>
      </div>
      {/* Recommended */}
      <div className='mr-6 ml-6 lg:mr-40 lg:ml-40'>
        <h2 className='mt-8 mb-2 text-lg md:text-xl lg:text-2xl font-bold'>Recomended</h2>
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-8'>
          {products.map((item, idx) =>
          <ProductItem key={idx} data={item} />
          )
          }
        </div>
      </div>

    </div >
  );
};

const mapStateToProps = state => ({
  banner: state.store.banners,
  products: state.store.products,
  info: state.store.info,

})

const mapDispatchToProps = dispatch => ({
  getShopProducts: (storeId) => dispatch(getShopProductsStart(storeId))

})

export default connect(mapStateToProps,mapDispatchToProps)(PageWrapper(Index));