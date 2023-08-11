import { useState } from "react"

const  StepOrder = ({createTime, endTime}) => {

    const [steps, setStep] = useState({
        stepsItems: ["Thuê tủ",  "Thanh toán"],
        timeStepsItems: [createTime, endTime == 'Invalid date' ? '.': endTime],
        currentStep: endTime !== 'Invalid date' ? 3 : 2
    })
    
    return (
        <div className="mx-auto px-0">
            <ul aria-label="Steps" className="items-center text-gray-600 font-medium flex">
                {steps.stepsItems.map((item, idx) => (
                    <li key={idx} aria-current={steps.currentStep == idx + 1 ? "step" : false} className="flex  flex-col flex-1 gap-x-0">

                         

                        <div className="flex  items-center flex-row flex-1">
                            <hr className={`w-full border block ${idx == 0 ? "border-none" : "" || steps.currentStep >= idx + 1 ? "border-indigo-600" : ""}`} />
                            <div className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1 ? "bg-indigo-600 border-indigo-600" : "" || steps.currentStep == idx + 1 ? "border-indigo-600" : ""}`}>
                                <span className={`w-2.5 h-2.5 rounded-full bg-indigo-600 ${steps.currentStep != idx + 1 ? "hidden" : ""}`}></span>
                                {
                                    steps.currentStep > idx + 1 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    ) : ""
                                }
                            </div>
                            <hr className={`border w-full h-auto ${idx + 1 == steps.stepsItems.length ? "border-none" : "" || steps.currentStep > idx + 1 ? "border-indigo-600" : ""}`} />
                        </div>
                        <div className="flex justify-center items-center mt-3 h-auto">
                            <h3 className={`text-sm ${steps.currentStep == idx + 1 ? "text-indigo-600" : ""}`}>
                                {item}
                            </h3>
                        </div>
                        <div className="flex justify-center items-center mt-3 h-auto">
                            <h3 className={`text-[12px] font-thin text-[#b8b5b0] ${steps.currentStep == idx + 1 ? "text-indigo-600" : ""}`}>
                                {steps.timeStepsItems[idx]}
                            </h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default StepOrder;