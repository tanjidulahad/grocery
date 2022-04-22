import { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Button, Input } from '../inputs'
import { loginSuccess, authShowToggle, getLoginOtpStart } from '../../redux/user/user-action'
import Otp from './otp'

// Login Component
const Login = ({ showToggle, getLoginOtp, userloginSuccess, setPage, info }) => {
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState(null) // {}
    const [error, setError] = useState("") // ""
    const [status, setStatus] = useState('') // loading failed success
    // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID;

    const storeId = info.store_id;
    const onChangeHandler = (e) => {
        const { value } = e.target;
        if (error) setError(null);
        // if (!(/^\d*$/.test(value))) return;
        setPhone(value.trim())
    }
    const onSubmitHandler = () => {
        if (!phone) return setError("Enter valid phone number!.");
        getLoginOtp({ phone, setUser, setError, storeId })
        setError('')
        setStatus('loading')
    }
    useEffect(() => {
        return () => {
            setUser(null);
            setStatus('')
        }
    }, [])
    useEffect(() => {
        if (error) {
            setStatus('')
        }
        if (user) {
            setStatus('')
        }
    }, [error, user])
console.log(info,'line41')

    return (
        <>
            {
                !user ?
                <>
                    <div className="auth hidden md:block">
                        <div className="p-6 auth-form-container rounded " style={{border:"2px solid #F58634"}} >
                            <div className="flex justify-end items-center">
                                {/* <h2 className="text-2xl font-semibold">Login</h2> */}
                                <Button className='bg-transparent dark-blue ' onClick={showToggle} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>

                            <div className="w-full  shrink-0 flex  justify-center overflow-hidden rounded-md items-center">
                <img
                  className="w-20 h-20 object-contain"
                  src={
                    info.logo_img_url
                    ||
                    '/img/default.png'
                  }
                  alt="..."
                />
              </div>

                             <div className="mt-6 flex justify-center">
                             <div className=' flex-col ' style={{ maxWidth: 'fit-content' }} >
                                    {
                                        !!error &&
                                        <span className='text-base red-color'>{error}</span>

                                    }
                                </div>
                             </div>
                            <div className=" flex justify-center">

                                <Input name='otp' className={`auth-input ${error && 'input-danger'} w-3/4 rounded-lg`} type="text" placeholder="Phone Number or Email" onChange={onChangeHandler} value={phone} disabled={status == 'loading'} />
                            </div>
                            <div className="mt-6 flex justify-center">
                                {/* <div className=' flex-col ' style={{ maxWidth: 'fit-content' }} >
                                    {
                                        !!error &&
                                        <span className='text-base red-color'>{error}</span>

                                    } */}
                                {/* </div> */}
                                {/* <Input name='otp' className={`auth-input ${error && 'input-danger'} w-3/4 rounded-lg`} type="text" placeholder="Enter Password" onChange={onChangeHandler} value={phone} disabled={status == 'loading'}        /> */}
                            </div>
                            <div className="py-8 border-b-2 flex  justify-center ">
                                <Button className={`w-3/4 btn-color text-lg font-medium btn-bg py-4 rounded ${status == 'loading' ? 'loading-btn' : ""}`} type="button" onClick={onSubmitHandler} disabled={status == 'loading'}
                                    style={{
                                      backgroundColor:"#F58634",...(status == 'loading') && {
                                            opacity: 0.7,
                                            cursor: "not-allowed",

                                        },
                                    }}
                                >{status == 'loading' ? 'Loading...' : 'Get OTP'}</Button>
                            </div>
                            <div className="auth-redirect  black-color mt-8 text-lg " >
                                <span className="font-bold">New User? <Button className=" bg-transparent red-color px-1"  style={{color:"#F58634"}}onClick={() => setPage(false)}>Create Account</Button> </span>
                            </div>

                        </div>
                    </div>
                    <div className="mobauth md:hidden">
                        <div className="p-6 pt-60 auth-form-container rounded "  >
                            <div className="flex hidden justify-end items-center">
                                {/* <h2 className="text-2xl font-semibold">Login</h2> */}
                                <Button className='bg-transparent dark-blue ' onClick={showToggle} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>

                            <div className="w-full  shrink-0 flex  justify-center overflow-hidden rounded-md items-center">
                <img
                  className="w-20 h-20 object-contain"
                  src={
                    info.logo_img_url
                    ||
                    '/img/default.png'
                  }
                  alt="..."
                />
              </div>

                             <div className="mt-6 flex justify-center">
                             <div className=' flex-col ' style={{ maxWidth: 'fit-content' }} >
                                    {
                                        !!error &&
                                        <span className='text-base red-color'>{error}</span>

                                    }
                                </div>
                             </div>
                            <div className=" flex justify-center">

                                <Input name='otp' className={`auth-input ${error && 'input-danger'}  rounded-lg`} type="text" placeholder="Phone Number or Email" onChange={onChangeHandler} value={phone} disabled={status == 'loading'} />
                            </div>
                            <div className="mt-6 flex justify-center">
                                {/* <div className=' flex-col ' style={{ maxWidth: 'fit-content' }} >
                                    {
                                        !!error &&
                                        <span className='text-base red-color'>{error}</span>

                                    } */}
                                {/* </div> */}
                                {/* <Input name='otp' className={`auth-input ${error && 'input-danger'} w-3/4 rounded-lg`} type="text" placeholder="Enter Password" onChange={onChangeHandler} value={phone} disabled={status == 'loading'}        /> */}
                            </div>
                            <div className="py-8 border-b-2 flex  justify-center ">
                                <Button className={`w-full btn-color text-lg font-medium btn-bg py-4 rounded ${status == 'loading' ? 'loading-btn' : ""}`} type="button" onClick={onSubmitHandler} disabled={status == 'loading'}
                                    style={{
                                      backgroundColor:"#F58634",...(status == 'loading') && {
                                            opacity: 0.7,
                                            cursor: "not-allowed",

                                        },
                                    }}
                                >{status == 'loading' ? 'Loading...' : 'Get OTP'}</Button>
                            </div>
                            <div className="auth-redirect  black-color mt-8 text-lg " >
                                <span className="font-bold">New User? <Button className=" bg-transparent red-color px-1"  style={{color:"#F58634"}}onClick={() => setPage(false)}>Create Account</Button> </span>
                            </div>

                        </div>
                        <div className={`md:hidden fixed top-0     shadow-lg bg-[#48887B] h-[100px] w-full `} style={{zIndex:1200}}>

{/* <Tracker status={cartHeader.status}/> */}
<div className={`flex items-center absolute bottom-0  mb-4`}>
  {/* <BsArrowLeft className={`mx-4`} size={35} color={'white'}/> */}
   <p className={`text-2xl text-[white] mx-4`}>Login</p>
</div>




</div>
                    </div>


                 </>
                    : <Otp username={phone} onSuccess={() => { userloginSuccess(user) }} setPage={setPage} setUser={setUser} userId={user.customer_id} resend={onSubmitHandler} />
            }

        </>

    )

}

const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    getLoginOtp: (data) => dispatch(getLoginOtpStart(data)),
    userloginSuccess: (data) => dispatch(loginSuccess(data)),
})
const mapStateToProps = (state) => ({
    info: state.store.info
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
