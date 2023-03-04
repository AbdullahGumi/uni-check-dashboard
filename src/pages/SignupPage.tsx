import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex-1 bg-white flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto  rounded-md  shadow-2xl  ring-2 ring-black lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black">
          Uni Check Dashboard
        </h1>
        <form className="mt-6">
          <Input
            label="Full Name"
            type="text"
            value={fullName}
            setValue={setFullName}
          />
          <Input label="Email" type="email" value={email} setValue={setEmail} />
          <Input
            label="Phone Number"
            type="text"
            value={phoneNumber}
            setValue={setPhoneNumber}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <div className="mt-6">
            <Button>Sign Up</Button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          <Link to={"/login"}>
            <a className="font-medium text-black hover:underline">login</a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
