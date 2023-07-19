import Link from "next/link";
import { default as SignupForm } from "../../components/signup-form";

export default function SignupPage() {
  return (
    <>
      <h3>Signup</h3>
      <SignupForm />
      <p style={{ fontSize: "14px" }}>
        <Link href="/auth/login">Already have an account? Login</Link>
      </p>
    </>
  );
}
