import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { getFirebaseApp } from "../../firebase";

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
    const result = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return NextResponse.json(result);
  } catch (e) {
    if (e.code == "auth/user-not-found") {
      return NextResponse.json(
        { error: "Account not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
