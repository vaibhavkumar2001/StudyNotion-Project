import React from 'react'
import { HiOutlineVideoCamera} from "react-icons/hi"

export default function CourseSubSectionAccordion  ({subSec})  {
  return (
    <div>
        <div className={`flex jusitfy-between py-2`}>
            <div className={`flex items-center gap-2`}>
                <span>
                    <HiOutlineVideoCamera/>
                </span>
                <p>{subSec?.title}</p>
            </div>
        </div>
    </div>
  )
}
