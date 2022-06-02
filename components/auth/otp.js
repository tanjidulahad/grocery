import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Button, Input } from '../inputs';
import CreateNewPassword from './create-pass'
import OtpInput from 'react-otp-input';
import { otpVerificationStart, authShowToggle, forgotPasswordOtpVerifyStart } from '@redux/user/user-action';
import { set } from 'nprogress';

const Otp = ({ showToggle, username, resend, setPage, otpVerify, onSuccess, userId, info, forgotPass, forgotPasswordOtpVerify }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("") // ""
    const [status, setStatus] = useState("")
    const [counter, setCounter] = useState(60)
    const [isSuccess, setIsSuccess] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
    const storeId = info.store_id;
    const onChangeHandler = (value) => {
        // const { value } = e.target;
        if (error) setError(null);
        if (!(/^\d*$/.test(value))) return;
        // const val = [...otp]
        // val[index] = value
        console.log(value);
        setOtp(value)
    }
    const onSubmitHandler = () => {
        alert(otp)
        if (!otp) return setError("Enter valid OTP.");
        if (forgotPass) {
            forgotPasswordOtpVerify({ state: { otpCode: otp, customerId: userId }, setError, setIsLoading, setIsSuccess, setUser })
        } else {
            otpVerify({
                otp: otp,
                userId,
                storeId,
                setError,
                setStatus,
                setUser,
                mode: username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'email' : 'phone',
            })
        }

        setError('')
        setIsLoading(true)
    }
    useEffect(() => {
        if (status) {
            if (onSuccess) {
                onSuccess()
            }
        }
    }, [status])
    useEffect(() => {
        if (error || status) {
            setIsLoading(false)
        }
    }, [status, error])


    // Componentdidmount
    useEffect(() => {
        return () => {
            setOtp('');
            setStatus("")
            setError('')
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (isSuccess) {
            clearInterval(timer)
        }
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            {
                isSuccess ?
                    <CreateNewPassword setPage={setPage} user={user} forgotPass={forgotPass} />
                    :
                    <>
                        <div className="auth">
                            <div className={`sm:hidden flex sticky top-0 justify-between items-center shadow-lg nav-bg h-[100px] w-full `} style={{ zIndex: 1200 }}>
                                <div className={`flex items-center  mb-4`}>
                                    <p className={`text-2xl text-[white] mx-4`}>Register</p>
                                </div>
                                <Button className='bg-transparent dark-blue sm:hidden block mx-6' onClick={showToggle} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="p-6 absolute bottom-0 sm:bottom-auto top-[100px] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full bg-white sm:w-[512px] rounded " style={{ border: "2px solid #F58634" }} >
                                <div className="flex justify-end items-center">
                                    <Button className='bg-transparent dark-blue hidden sm:block' onClick={() => { setPage(true); showToggle() }} >
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
                                <div className='mt-3 mx-4 sm:mx-10 w-full flex  justify-center' style={{ maxWidth: 'fit-content' }} >
                                    {error ? <></> :
                                        <span className=' justify-center text-lg font-bold black-color inline-block'>
                                            An OTP sent to{' '}
                                            <span className=' justify-center text-lg font-bold black-color inline-block'>
                                                {
                                                    username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ?
                                                        ` ${username}`
                                                        : `+${username}`
                                                }
                                            </span>

                                        </span>
                                    }
                                </div>
                                <div className="mt-10">
                                    <div className='mx-4 sm:mx-10' style={{ maxWidth: 'fit-content' }} >
                                        {
                                            error ?
                                                <span className='text-base red-color'>{error}</span>
                                                : null
                                        }
                                    </div>
                                    <div className="flex mx-4 sm:mx-10">
                                        <div className={`flex w-full auth-input ${error && 'input-danger'} `}>
                                            <OtpInput
                                                value={otp}
                                                onChange={onChangeHandler}
                                                numInputs={5}
                                                isInputNum={true}
                                                containerStyle={'w-full justify-between '}
                                                inputStyle={'h-10 w-[40px!important] sm:h-14 sm:w-[56px!important] mx-2 p-2 sm:p-4 outline-none border-2  rounded-lg custom-input text-center'}
                                                focusStyle={` btn-border `}
                                            />
                                        </div>
                                        {/* <Input name='otp' className={`auth-input ${error && 'input-danger'}`} type="text" placeholder="Enter OTP" value={otp} onChange={onChangeHandler} disabled={isLoading} /> */}
                                    </div>
                                </div>
                                <div className="auth-redirect text-lg my-8 flex flex-col sm:flex-row justify-start text-left sm:justify-between items-center black-color-75  w-full sm:w-10/12 mx-auto" >
                                    <div className=' text-left'>
                                        {!!counter &&
                                            <span className='font-semibold'>0{parseInt(counter / 60)}:{counter % 60 < 10 ? '0' + counter % 60 : counter % 60}</span>
                                        }
                                    </div>
                                    <span >Didn't receive OTP?
                                        {
                                            counter ?
                                                <Button className="btn-color-revers px-2" type="button" style={{ cursor: 'not-allowed', opacity: '0.7' }}>Resend</Button>
                                                :
                                                <Button className="btn-color-revers px-2" type="button" onClick={() => { resend(); setCounter(120) }} >Resend</Button>
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-around w-full">
                                    <Button className={`w-full sm:w-10/12 btn-bg btn-color py-4 rounded `} type="button" onClick={onSubmitHandler} disabled={isLoading}
                                        style={{
                                            ...isLoading && {
                                                opacity: 0.7,
                                                cursor: "not-allowed"
                                            },
                                        }}>{isLoading ? 'Loading...' : 'Verify OTP'} </Button>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

const mapStateToProps = state => ({
    show: state.user.show,
    info: state.store.info
})
const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    otpVerify: (data) => dispatch(otpVerificationStart(data)),
    forgotPasswordOtpVerify: (data) => dispatch(forgotPasswordOtpVerifyStart(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Otp)
