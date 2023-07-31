import React from "react"
import { BsFacebook } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"

export class AuthProviders {
  static GOOGLE = {
    displayName: "Google",
    icon: <FcGoogle />
  }
  static FACEBOOK = {
    displayName: "Facebook",
    icon: <BsFacebook className={"!fill-blue-600"} />
  }
}

export let ActionTypes

;(function(ActionTypes) {
  ActionTypes["LOGIN"] = "Đăng nhập"
  ActionTypes["SIGNUP"] = "Đăng ký"
})(ActionTypes || (ActionTypes = {}))

const SocialLoginButton = ({
  provider,
  onClick,
  actionType,
  wrapperClasses = ""
}) => {
  return (
    <button
      className={`${wrapperClasses} group flex w-full items-center justify-center rounded-full border-2 border-gray-300 py-2 transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100`}
      type="button"
      onClick={onClick}
    >
      <div className="!mr-3 !scale-[1.2]">{provider.icon}</div>
      <span className="text-[0.9rem] font-medium text-gray-500 transition duration-300 group-hover:text-blue-500">{`${actionType} với ${provider.displayName}`}</span>
    </button>
  )
}

export default SocialLoginButton
