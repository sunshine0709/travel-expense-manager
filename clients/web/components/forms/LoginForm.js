import { Link, Router } from "../../routes";
import React, { useState } from "react";

import Button from "../elements/Button";
import ErrorField from "./errors/ErrorField";
import ErrorMessage from "./errors/ErrorMessage";
import Input from "./elements/Input";
import { TOKEN_AUTH_MUTATION } from "../../graphql/mutations";
import classNames from "classnames";
import { redirectIfLoggedIn } from "../../lib/utils";
import { setCookie } from "nookies";
import { useMutation } from "@apollo/react-hooks";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const [tokenAuth, { loading, error }] = useMutation(TOKEN_AUTH_MUTATION, {
    variables: {
      ...user
    }
  });

  return (
    <div className="bg-white rounded-lg mx-auto my-48 xl:w-1/5 md:w-2/5 w-4/5 p-6 shadow">
      <h1 className="font-bold text-2xl mb-4">🚪 Login</h1>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const res = await tokenAuth();
          setCookie(null, "token", res.data.tokenAuth.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
          });
          redirectIfLoggedIn();
        }}
      >
        <ErrorMessage error={error} />
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
          <ErrorField error={error} field="email" />
        </div>
        <div className="mt-2">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          <ErrorField error={error} field="password" />
        </div>
        <div className="mt-5">
          <Button loading={loading} type="submit" fullWidth>
            Login
          </Button>
        </div>
        <div className="text-right mt-3">
          <Link route="/register">
            <a className="text-green-700 underline">I don't have an account</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
