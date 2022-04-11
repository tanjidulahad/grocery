import { Button } from '@components/inputs'
import Rating from '@components/rating-stars/rating'
import React, { useState } from 'react'

function Review() {
  const [first, setfirst] = useState(0)
  const [text, settext] = useState("")

  const changevalue=(value)=>{
    setfirst(value)

  }
  const onchange=()=>{

  }
  return (
    <div className="w-full  border-2 rounded-lg  bg-white">
    <div className="my-4  w-full flex justify-between">



<div className="px-4  w-full flex ">
           <div className="  w-full  m-4  ">
             <p className="text-center font-bold text-xl  text-dark">Rating and Review</p>
             <div className="flex justify-center">
             <Rating place="order" count={5} value={0} changevalue={changevalue} />

             </div>
             <div className=" mt-6">
               {/* <FiHome className='text-red-500' size={20} /> */}
               <p className="text-left m-4 font-bold text-base  text-dark ">Review</p>

{
  text.length>500?               <textarea className={`rounded mx-4 mr-8 border-2 border-gray-200 focus:outline-none p-2   `} disabled  value={text} onChange={(e)=>{settext(e.target.value)}} name="w3review" rows="8" style={{minWidth:"90%"}}>

  </textarea>:
            <textarea className={`rounded mx-4 mr-8 border-2 border-gray-200 focus:outline-none p-2   `}   value={text} onChange={(e)=>{settext(e.target.value)}} name="w3review" rows="8" style={{minWidth:"90%"}}>

            </textarea>
}

<p className="  flex w-11/12 justify-end text-right  font-bold text-base  text-gray-400  " >{text.length}/500</p>

<div className="  flex w-11/12 justify-end">
<Button className="  p-4 py-2 justify-end text-right  bg-[#48887B] rounded text-base my-4  text-white  " >Submit</Button>

</div>











             </div>
           </div>
         </div>
         </div>




  </div>
  )
}

export default Review
