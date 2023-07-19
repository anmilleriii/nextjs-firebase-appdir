import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { getFirebaseApp } from "../firebase";

getFirebaseApp();

/**
 * POST /users/login
 *
 * Login with email and password.
 */
export async function POST(request: NextRequest) {
  const auth = getAuth();
  const data = await request.json();
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return NextResponse.json(result);
  } catch (e) {
    if (e.code == "auth/email-already-in-use") {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
