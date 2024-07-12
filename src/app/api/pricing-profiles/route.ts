import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

/**
 * @swagger
 * /api/pricing-profiles:
 *   get:
 *     description: Return the pricing-profiles
 *     responses:
 *       200:
 *         description: return array of pricing profiles
 */
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
