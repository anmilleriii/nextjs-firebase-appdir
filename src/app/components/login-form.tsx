"use client";

import { default as useSwr } from "swr";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const LOGIN_API_ROUTE = "/api/users/login";

export interface LoginFormData {
  email: string;
  password: string;
}

const loginUser = async (data: LoginFormData) => {
  const response = await fetch(LOGIN_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // @ts-expect-error
    error.info = await response.json();
    // @ts-expect-error
    error.status = response.status;
    throw error;
  }
};

export default function LoginForm() {
  const router = useRouter();
  const { data, error, mutate } = useSwr(LOGIN_API_ROUTE);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await mutate(loginUser(data));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <input
        autoFocus
        type="email"
        placeholder="Email"
        style={{ height: "25px" }}
        {...register("email", { required: true })}
      />
      <input
        type="password"
        placeholder="Password"
        style={{ height: "25px" }}
        {...register("password", { required: true })}
      />
      <input type="submit" style={{ height: "25px" }} />
      {Object.values(errors).length > 0 && (
        <span style={{ color: "red" }}>Missing required field(s).</span>
      )}
    </form>
  );
}
