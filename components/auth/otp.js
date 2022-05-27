import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Button, Input } from '../inputs';
import CreateNewPassword from './create-pass'
import { otpVerificationStart, authShowToggle, forgotPasswordOtpVerifyStart } from '@redux/user/user-action';
import { set } from 'nprogress';

const Otp = ({ showToggle, username, resend, setPage, otpVerify, onSuccess, userId, info, forgotPass, forgotPasswordOtpVerify }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState("") // ""
    const [status, setStatus] = useState("")
    const [timer, settimer] = useState(60)
    const [trigger, setTrigger] = useState(0)
    const [isSuccess, setIsSuccess] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
    const storeId = info.store_id;
    const onChangeHandler = (e) => {

        const { value } = e.target;

        if (error) setError(null);
        if (!(/^\d*$/.test(value))) return;
        setOtp(otp.toString() + value.toString())
    }
    const onSubmitHandler = () => {
        alert(otp)
        if (!otp) return setError("Enter valid OTP.");
        if (forgotPass) {
            forgotPasswordOtpVerify({ state: { otpCode: otp, customerId: userId }, setError, setIsLoading, setIsSuccess, setUser })
        } else {


            otpVerify({
                otp,
                userId,
                storeId,
                setError,
                setStatus,
                setUser,
                mode: username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'email' : 'phone',
            })
        }

        setTrigger(1)
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
    const star = (number) => {
        return `${number[0]}*******${number[number.length - 2]}${number[number.length - 1]} `
    }
    function clickEvent(first, last) {

        if (first.value.length) {
            document.getElementById(last).focus();
        }
    }
    function countdown() {

        var timeleft = timer;
        var downloadTimer = setInterval(function () {
            timeleft--;
            settimer(timeleft);
            if (timeleft <= 0)
                clearInterval(downloadTimer);
        }, 1000);

    }
    useEffect(() => { countdown() }, [trigger])

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
                                        <span className='flex justify-center text-lg font-bold black-color'>An OTP sent to
                                            {
                                                username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ?
                                                    ` email ${username}`
                                                    : `mobile number +${username}`
                                            }
                                        </span>
                                    }
                                </div>
                                <div className="mt-10">
                                    <div className='' style={{ maxWidth: 'fit-content' }} >
                                        {
                                            error ?
                                                <span className='text-base red-color'>{error}</span>
                                                : null
                                        }
                                    </div>
                                    <div className="flex mx-4 sm:mx-10">
                                        <div className={`  flex auth-input ${error && 'input-danger'} `}>
                                            <input className="h-10 w-10 sm:h-14 sm:w-14 mx-2 p-2 sm:p-4 outline-none border-2  rounded-lg custom-input text-center" onChange={onChangeHandler} type="text" id="ist" maxLength={1} onKeyUp={(e) => { clickEvent(e.target, 'sec') }} />
                                            <input className="h-10 w-10 sm:h-14 sm:w-14 mx-2 p-2 sm:p-4 outline-none border-2  rounded-lg custom-input text-center" onChange={onChangeHandler} type="text" id="sec" maxLength={1} onKeyUp={(e) => { clickEvent(e.target, 'third') }} onke />
                                            <input className="h-10 w-10 sm:h-14 sm:w-14 mx-2 p-2 sm:p-4 outline-none border-2 rounded-lg  custom-input text-center" onChange={onChangeHandler} type="text" id="third" maxLength={1} onKeyUp={(e) => { clickEvent(e.target, 'fourth') }} />
                                            <input className="h-10 w-10 sm:h-14 sm:w-14 mx-2 p-2 sm:p-4 outline-none border-2  rounded-lg custom-input text-center" onChange={onChangeHandler} type="text" id="fourth" maxLength={1} onKeyUp={(e) => { clickEvent(e.target, 'fifth') }} />
                                            <input className="h-10 w-10 sm:h-14 sm:w-14 mx-2 p-2 sm:p-4 outline-none border-2  rounded-lg custom-input text-center" onChange={onChangeHandler} type="text" id="fifth" maxlength={1} />

                                        </div>


                                        {/* <Input name='otp' className={`auth-input ${error && 'input-danger'}`} type="text" placeholder="Enter OTP" value={otp} onChange={onChangeHandler} disabled={isLoading} /> */}
                                    </div>
                                </div>
                                <div className="auth-redirect text-lg my-8 mx-4 sm:mx-10 flex justify-between items-center black-color-75" >
                                    <span className='font-semibold shrink-0 mx-2 block text-base sm:text-lg w-16' id="timerCont">{timer} sec</span>
                                    <span className='text-sm sm:text-base lg:text-lg block' >Didn't receive OTP? <Button className="red-color px-2" onClick={resend} >Resend</Button> </span>
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
