import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const query = "SELECT * FROM PricingProfiles";

  try {
    const result = await pool.query(query);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
