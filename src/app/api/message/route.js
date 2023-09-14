import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export const GET = async (request) => {
  readDB();
  try {
    // const payload = jwt.verify(token, process.env.JWT_SECRET);
    roomId = payload.roomId;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }
};

export const POST = async (request) => {
  const body = await request.json();
  const { studentId, courseNo } = body;
  readDB();
  // const roomId = DB.messages.find((x) => x.roomId === roomId);
  // if (roomId)
  return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );

  const messageId = nanoid();
  // DB.meaasages.push({
  //   roomId,
  //   messageId,
  // });

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const body = await request.json();
  const { studentId, courseNo } = body;

  const payload = checkToken();
  if (!payload)
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();
  const foundEnroll = DB.messages.find(
    (x) => x.messageId === messageId && x.roomId === roomId
  );
  if (!foundEnroll)
    return NextResponse.json(
      {
        ok: false,
        message: "Message is not found",
      },
      { status: 404 }
    );
  DB.messages = DB.messages.filter(
    (x) => x.messageId !== messageId && x.roomId !== roomId
  );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
