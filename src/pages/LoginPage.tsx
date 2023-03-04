import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-white flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto  rounded-md  shadow-2xl  ring-2 ring-black lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black">
          Uni Check Dashboard
        </h1>
        <form className="mt-6">
          <Input label="Email" type="email" value={email} setValue={setEmail} />
          <Input
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <div className="mt-6">
            <Button onClick={() => navigate("/dashboard/attendance")}>
              Login
            </Button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <a className="font-medium text-black hover:underline">Sign up</a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
