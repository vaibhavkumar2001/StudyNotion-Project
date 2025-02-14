import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { apiConnector } from "../../services/apiConnector"
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

    <div className='flex flex-col gap-14'>
            <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname'>First Name</label>
                    <input  
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className='drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] w-full rounded-[0.5rem] mt-1 bg-richblack-800 p-[12px] pr-10 text-richblack-5'
                        {...register("firstname", {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span className='mt-1'>
                                Please Enter Your name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col '>
                    <label htmlFor='lastname'>Last Name</label>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        className='drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] w-full rounded-[0.5rem] bg-richblack-800 p-[12px] mt-1 pr-10 text-richblack-5'
                        placeholder='Enter Last name'
                        {...register("lastname")}
                    />
                    
                </div>

            </div>


            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    className='drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] mt-1 w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
                    placeholder='Enter email Address'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span className='mt-1'>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phoneNo */}
            <div className='flex flex-col '>

                <label className='mb-1' htmlFor='phonenumber'>Phone Number</label>

                <div className='flex flex-row gap-5'>
                    {/* dropdown */}
                   
                        <select
                            name='dropdown'
                            id="dropdown"
                            className='bg-[#161D29] text-[#999DAA] drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] rounded-[0.5rem] p-[12px]  w-[80px]'
                            {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                        
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 w-[calc(100%-90px)]'
                            {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                        />
                  
                </div>
                {
                    errors.phoneNo && (
                        <span className='mt-1'>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>

            {/* message */}
            <div className='flex flex-col drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                <label className='mb-1' htmlFor='message'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span className='mt-1'>
                            Please enter your message.
                        </span>
                    )
                }
            </div>
                
            <button type='submit'
            className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-semibold text-black p-4 '>
                    Send Message
            </button>
    </div>

    </form>
  )
}

export default ContactUsForm
