import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Input } from "@components/inputs";
import { addAddressStart, getAddressStart, removeAddressStart, updateAddressStart } from "@redux/user/user-action";

const AddressForm = ({ user, address, getAddress, addAddress, removeAddress, updateAddress, edit = null, close }) => {
    const addressStructure = {
        address_fields: "",
        address_id: "",
        address_line_1: "",
        address_line_2: "",
        address_status: "",
        address_tag: "",
        city: "",
        country: "India",
        country_code: "",
        create_date: "",
        customer_id: "",
        delivery_schema_id: "",
        full_name: "",
        is_default: "",
        last_modified_date: "",
        latitude: "",
        longitude: "",
        phone: "",
        state: "",
        state_code: "",
        zip_code: "",
    }

    const [newAddress, setNewAddress] = useState(addressStructure)
    const [isAddressActive, setIsAddressActive] = useState(false);
    const [error, setError] = useState("");
    const onChangeAddress = (e) => {
        const { value, name } = e.target;
        setError("")
        if (name == 'phone' || name == 'zip_code') {
            if (!(/^\d*$/.test(value))) return;
        }
        setNewAddress({ ...newAddress, [name]: value });
    }
    const onSave = () => {
        if (!newAddress.full_name || !newAddress.phone || !newAddress.address_line_1 || !newAddress.city || !newAddress.state || !newAddress.country || !newAddress.zip_code) {
            setError("Please fill all Required(*) field")
            return;
        }
        if (newAddress?.address_id) {
            updateAddress({
                userId: user.customer_id, addressId: newAddress.address_id,
                address: newAddress
            })
        } else {
            addAddress({ userId: user.customer_id, address: newAddress });
        }
    }
    useEffect(() => {
        if (edit) {
            setNewAddress(edit)
        }
    }, [edit])

    console.log(edit, newAddress);
    return (
        <div className="">
            <div className="heading border-gray-300 pb-4 border-b-2">
                {
                    newAddress?.address_id ?
                        <h2 className=" font-semibold text-2xl dark-blue titile">Update Address</h2>
                        :
                        <h2 className=" font-semibold text-2xl dark-blue titile">Add a New Address</h2>
                }
            </div>
            <div className="add-body-container">
                <div className="add-c">
                    <div className="row text-base font-normal">
                        <div className="mt-4 col-12">
                            <div className="text-base font-semibold mb-1">Full Name*</div>
                            <Input onChange={onChangeAddress} className=' rounded w-full border-static border py-3 xl:w-1/2' type="text" name='full_name' placeholder="Enter Your Full Name" value={newAddress.full_name} />
                        </div>
                        <div className="mt-4 col-12">
                            <div className="text-base font-semibold mb-1">Mobile Number* <span className=" text-sm font-normal">( Commonly Used to Assist Delivery ) </span></div>
                            <Input onChange={onChangeAddress} className=' rounded w-full border-static border py-3 xl:w-1/2' type="text" name='phone' placeholder="Enter Your 10 digit Mobile Number" value={newAddress.phone} />
                        </div>
                        <div className="mt-4 col-12">
                            <div className="text-base font-semibold mb-1">Address Line 1*</div>
                            <Input onChange={onChangeAddress} className=' rounded w-full border-static border py-3 xl:w-1/2' type="text" name='address_line_1' placeholder="Address" value={newAddress.address_line_1} />
                        </div>
                        <div className="mt-4 col-12">
                            <div className="text-base font-semibold mb-1">Address Line 2</div>
                            <Input onChange={onChangeAddress} className=' rounded w-full border-static border py-3 xl:w-1/2' type="text" name='address_line_2' placeholder="Address" value={newAddress.address_line_2} />
                        </div>
                        <div className="mt-4 col-xl-6">
                            <div className="text-base font-semibold mb-1">Country*</div>
                            <Input onChange={onChangeAddress} className=' rounded w-full border-static border py-3' type="text" name='state' disabled={true} placeholder="State" value={'India'} />
                        </div>
                        <div className="mt-4 col-xl-6">
                            <div className="text-base font-semibold mb-1">State*</div>
                            <Input onChange={onChangeAddress} className=' rounded w-full border-static border py-3' type="text" name='state' placeholder="State" value={newAddress.state} />
                        </div>
                        <div className="mt-4 col-xl-6">
                            <div className="text-base font-semibold mb-1">City*</div>
                            <Input onChange={onChangeAddress} className=' rounded w-full border-static border py-3' type="text" name='city' placeholder="Enter City Name" value={newAddress.city} />
                        </div>
                        <div className="mt-4 col-xl-6">
                            <div className="text-base font-semibold mb-1">Zin code*</div>
                            <Input onChange={onChangeAddress} className=' rounded w-full border-static border py-3' type="text" name='zip_code' placeholder="Enter Your Area PIN " value={newAddress.zip_code} />
                        </div>
                        <div className="mt-6 col-xl-12">
                            <div className="text-base font-semibold mb-1">Address Type</div>
                            <div className=" mt-2">
                                <div className="flex items-center">
                                    <input type="radio" name="address_tag" id="add-t-1" value='Home' onChange={onChangeAddress} checked={newAddress.address_tag == 'Home'} />
                                    <label className={`text-base ml-4 font-medium  ${newAddress.address_tag == 'Home' ? "selected" : ""}`} htmlFor='add-t-1'>
                                        <span className=" font-semibold">
                                            Home Address
                                        </span>
                                        <span className="text-sm font-normal">{' '}
                                            ( product will be delivered between 7 am to 9 pm)
                                        </span>
                                    </label></div>
                                <div className="mt-4 flex items-center">
                                    <input type="radio" name="address_tag" value='Work' id="add-t-2" onChange={onChangeAddress} checked={newAddress.address_tag == 'Work'} />
                                    <label className={`text-base ml-4 font-medium ${newAddress.address_tag == 'Work' ? "selected" : ""}`} htmlFor='add-t-2' >
                                        <span className=" font-semibold">Office/ Work Address </span>
                                        <span className="text-sm font-normal">{' '}
                                            ( product will be delivered between 10 am - 6 pm)
                                        </span>
                                    </label></div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="text-base font-medium mb-1 error-danger">{error ? error : ""}</div>
                        </div>
                        <div className="flex justify-start items-center space-x-4">
                            <div className=" primary-color ">
                                <Button className="btn-color-revers text-center w-40 py-3 px-4 btn-border border text-sm md:text-base" onClick={onSave} >{
                                    Object(newAddress).hasOwnProperty('address_id') ? 'Update' : 'Save Address'
                                }</Button>
                            </div>
                            <div className="">
                                <Button className="btn-color-revers text-sm md:text-base" onClick={() => { setNewAddress(addressStructure); }}>Don’t {Object(newAddress).hasOwnProperty('address_id') ? 'update' : 'Save'}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    address: state.user.address,
    user: state.user.currentUser
})
const mapDispatchToProps = dispatch => ({
    addAddress: (data) => dispatch(addAddressStart(data)),
    getAddress: (userId) => dispatch(getAddressStart(userId)),
    removeAddress: (data) => dispatch(removeAddressStart(data)),
    updateAddress: (data) => dispatch(updateAddressStart(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
