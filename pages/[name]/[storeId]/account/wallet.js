
import Wallet from '@components/Cards/Order/wallet/wallet'
import Transaction from '@components/Cards/Order/wallet/transaction'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import withAuth from '@components/auth/withAuth'
import accountLayout from '@components/layout/account-layout'
import {BsArrowLeft} from 'react-icons/bs'
import { useRouter } from 'next/router';

const profileWallet= ()=> {
  const router=useRouter()

    return(

    <div className="md: grid md:grid-cols-1 h-[90vh] bg-[transparent] md:gap-6 ">
        <div className="w-full h-max ">
            <Wallet />
        </div>

        <div className="w-full mb-[220px] md:mb-[0px] ">
            <Transaction />
        </div>
        <div className={`md:hidden fixed top-0     shadow-lg bg-[#48887B] h-[121px] w-full `} style={{zIndex:1200}}>

{/* <Tracker status={cartHeader.status}/> */}
<div className={`flex items-center absolute bottom-0  mb-4`} onClick={router.back}>
  <BsArrowLeft className={`mx-4`} size={35} color={'white'}/>
   <p className={`text-2xl text-[white] mx-4`}>Wallet</p>
</div>




</div>
    </div>)

}
export default PageWrapper(withAuth(accountLayout(profileWallet)))
