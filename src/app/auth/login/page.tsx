import LoginForm from "@/app/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h3>Login</h3>
      <LoginForm />
      <p style={{ fontSize: "14px" }}>
        <Link href="/auth/signup">Don't have an account? Signup</Link>
      </p>
    </>
  );
}
