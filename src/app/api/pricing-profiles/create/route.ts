import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

/**
 * @swagger
 * /api/create/pricing-profiles:
 *   post:
 *     description: Create a pricing profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               id:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *               adjustmentMode:
 *                 type: string
 *               adjustmentIncrementMode:
 *                 type: string
 *               adjustmentBasedOn:
 *                 type: string
 *               selectionType:
 *                 type: string
 *               adjustmentValue:
 *                 type: number
 *             example:
 *               name: "Sample Profile"
 *               id: "12345"
 *               products: ["Product A", "Product B"]
 *               adjustmentMode: "Incremental"
 *               adjustmentIncrementMode: "Percentage"
 *               adjustmentBasedOn: "Cost"
 *               selectionType: "All"
 *               adjustmentValue: 10
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       500:
 *         description: Internal server error
 */
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
