import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../api/authApi";

import Button from "../components/Button";
import ErrorDisplay from "../components/ErrorDisplay";
import Input from "../components/Input";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    loginUserAPI({
      email,
      password,
    })
      .then((res) => {
        setError("");
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
        if (err.response?.status === 401) {
          setError(err.response.data as string);
        }
      });
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto  rounded-md  shadow-2xl  ring-2 ring-black lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black">
          Uni Check Dashboard
        </h1>
        <ErrorDisplay error={error} />
        <div className="mt-6">
          <Input label="Email" type="email" value={email} setValue={setEmail} />
          <Input
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <div className="mt-6">
            <Button onClick={login} disabled={loading} isLoading={loading}>
              Login
            </Button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            className="font-medium text-black hover:underline"
            to={"/signup"}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
