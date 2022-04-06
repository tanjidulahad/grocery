import { Button, Input } from '@components/inputs'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiFillCaretDown } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'
import { IoMdCart } from 'react-icons/io'
import Link from 'next/link'
import Slider from '@components/Products/slider'
import OfferCard from '@components/Cards/Home/OfferCard'
import SliderCard from '@components/Cards/Home/sliderCard'
import Gnavbar from '@components/navbar/gnavbar'

export default function name() {
  return (
    <>
      {/* // Navbar */}
<Gnavbar/>
      {/* navbar End */}

      <div className="flex flex-row wrapper w-full ">
        <div className="basis-1/12 "></div>
        <div className=" basis-10/12">
          <Slider />
        </div>
        <div className="basis-1/12 "></div>
      </div>

      <div className="flex flex-row wrapper w-full ">
        <div className="basis-2/12 "></div>
        <div className=" basis-8/12">
          {/* Best offer card */}
          <OfferCard />
          {/* Fresh Items */}
          <SliderCard color="#C0EDAB80" title="Fresh Item" />

          <SliderCard color="#F3ECDB" title="Personal Care" />

          {/* Personal Care */}

          {/* Recommended Card */}
        </div>
        <div className="basis-2/12 "></div>
      </div>
    </>
  )
}
