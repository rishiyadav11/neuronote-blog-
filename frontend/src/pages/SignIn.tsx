import Quote from "../components/Quote"
import Signincompo from "../components/Signincompo"

const SignIn = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <Signincompo/>
        <Quote/>
    </div>
  )
}

export default SignIn