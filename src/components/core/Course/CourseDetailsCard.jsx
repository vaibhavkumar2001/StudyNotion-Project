import React from 'react'
import { IoTerminalOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { FaShareSquare } from "react-icons/fa";
import { addToCart } from '../../../slices/cartSlice'


function CourseDetailsCard({course,setConfirmationModal, handleBuyCourse}) {
    
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
    } = course;

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link Copied Successfully")
    }

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor")
            return
        }
        if(!token) {
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in! ",
            text2: "Please login to add this course to cart.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }


    return (
        <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
            <img
            src={ThumbnailImage}
            alt='Thumbnail Image'
            className='max-h-[300px] min-h-[180px] w-[400px] rounded-2xl
            overflow-hidden object-cover md:max-w-full '
            />
            <div className='space-x-3 pb-4 text-3xl font-semibold'>
                Rs. {CurrentPrice}
            </div>
            <div className='flex flex-col gap-4'>
                <button
                className='yellowButton  border-richblack-5 rounded-md bg-yellow-50 font-semibold text-black py-3 drop-shadow-[0_2px_rgba(255,255,255,0.4)]
'
                onClick={
                    user && course?.studentsEnrolled.includes(user._id)
                    ? () => navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
                >
                    {
                       user && course?.studentsEnrolled.includes(user._id)
                       ? "Go to Course"
                       : "Buy Now"
                    }
                </button>
                {
                    (!course?.studentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart} className='blackButton bg-richblack-800 py-3 rounded-md drop-shadow-[0_2px_rgba(255,255,255,0.4)]
'>
                            Add To Cart
                        </button>
                    )
                }
            </div>
            <div>
                <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                    30-Day Money-Back Guarantee
                </p>
                <p className={`my-2 text-xl font-semibold `}>
                    This Course Includes
                </p>
                <div>
                    {
                        course?.instructions?.map((item, index) => (
                            <p key={index} className='flex gap-2'>
                                <span>
                                    {IoTerminalOutline}
                                </span>
                            </p>
                        ))
                    }
                </div>
            </div>
            <div className='text-center'>
                <button 
                className='flex mx-auto items-center gap-2 py-6 text-yellow-100 '
                onClick={handleShare}
                >
                   <FaShareSquare size={15} /> Share
                </button>
            </div>
        </div>
    )
}

export default CourseDetailsCard