import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const {
    name,
    id,
    products,
    adjustmentMode,
    adjustmentIncrementMode,
    adjustmentBasedOn,
    selectionType,
    adjustmentValue,
  } = await req.json();
  const query =
    "INSERT INTO PricingProfiles (id, name, products, adjustmentMode, adjustmentIncrementMode, adjustmentBasedOn, selectionType, adjustmentValue) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
  const values = [
    id,
    name,
    products,
    adjustmentMode,
    adjustmentIncrementMode,
    adjustmentBasedOn,
    selectionType,
    adjustmentValue,
  ];

  try {
    await pool.query(query, values);
    return NextResponse.json(
      { message: "Profile created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
