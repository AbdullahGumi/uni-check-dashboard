import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUserAPI } from "../api/authApi";

import Button from "../components/Button";
import ErrorDisplay from "../components/ErrorDisplay";
import Input from "../components/Input";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async () => {
    setLoading(true);
    signUpUserAPI({
      email,
      fullName,
      password,
      phoneNumber,
    })
      .then((res) => {
        console.log(res);
        setErrors([]);
        setLoading(false);
        navigate("/dashboard/attendance", {
          state: {
            fullName: res.fullName,
            email: res.email,
            phoneNumber: res.phoneNumber,
          },
        });
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        console.log(err);
        if (err.response?.status === 409) {
          setErrors(err.response.data as []);
        }
      });
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto  rounded-md  shadow-2xl  ring-2 ring-black lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black">
          Uni Check Dashboard
        </h1>
        <ErrorDisplay errorsArray={errors} />
        <div className="mt-6">
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
            <Button onClick={signup} disabled={loading} isLoading={loading}>
              Sign Up
            </Button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          <Link
            className="font-medium text-black hover:underline"
            to={"/login"}
          >
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
