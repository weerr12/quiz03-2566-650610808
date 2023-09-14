import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Werasak Mayer",
    studentId: "650610808",
  });
};
