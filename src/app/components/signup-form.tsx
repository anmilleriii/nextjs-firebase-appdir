"use client";

import { default as useSwr } from "swr";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const USERS_API = "/api/users";

export interface SignupFormData {
  email: string;
  password: string;
}

const createUser = async (data: SignupFormData) => {
  const response = await fetch(USERS_API, {
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

export default function SignupForm() {
  const router = useRouter();
  const { data, error, mutate } = useSwr(USERS_API);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    console.log(data);
    try {
      const repsonse = await mutate(createUser(data));
      alert("Account created!");
      router.push("/dashboard");
    } catch (e) {
      alert("Error signing up");
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
