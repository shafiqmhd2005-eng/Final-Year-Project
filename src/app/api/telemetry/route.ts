import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Save telemetry data
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { speed, temperature, pressure, vibration, load } = body;

    if (
      speed === undefined ||
      temperature === undefined ||
      pressure === undefined ||
      vibration === undefined ||
      load === undefined
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const telemetry = await prisma.telemetry.create({
      data: { speed, temperature, pressure, vibration, load },
    });

    return NextResponse.json(telemetry, { status: 201 });
  } catch (err: any) {
    console.error("Error creating telemetry:", err);
    return NextResponse.json({ error: "Failed to create telemetry" }, { status: 500 });
  }
}

// GET: Retrieve the latest telemetry data
export async function GET() {
  try {
    const latest = await prisma.telemetry.findMany({
      orderBy: { createdAt: "desc" },
      take: 10, // Get last 10 entries
    });

    return NextResponse.json(latest);
  } catch (err: any) {
    console.error("Error fetching telemetry:", err);
    return NextResponse.json({ error: "Failed to fetch telemetry" }, { status: 500 });
  }
}






