import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const query = "SELECT * FROM PricingProfiles WHERE id = $1";

  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0], { status: 200 });
    } else {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    name,
    products,
    adjustmentmode,
    adjustmentincrementmode,
    adjustmentbasedon,
    selectionType,
    adjustmentValue,
  } = await req.json();

  // Build the fields and values for the query
  const fields: string[] = [];
  const values: (string | string[] | number | null)[] = [];

  if (name !== undefined) {
    fields.push("name");
    values.push(name);
  }
  if (products !== undefined) {
    fields.push("products");
    values.push(products);
  }
  if (adjustmentmode !== undefined) {
    fields.push("adjustmentmode");
    values.push(adjustmentmode);
  }
  if (adjustmentincrementmode !== undefined) {
    fields.push("adjustmentincrementmode");
    values.push(adjustmentincrementmode);
  }
  if (adjustmentbasedon !== undefined) {
    fields.push("adjustmentbasedon");
    values.push(adjustmentbasedon);
  }
  if (selectionType !== undefined) {
    fields.push("selectionType");
    values.push(selectionType);
  }
  if (adjustmentValue !== undefined) {
    fields.push("adjustmentValue");
    values.push(adjustmentValue);
  }

  if (fields.length === 0) {
    return NextResponse.json(
      { error: "No fields provided for update" },
      { status: 400 }
    );
  }

  // Construct the query string
  const setQuery = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");
  const query = `UPDATE PricingProfiles SET ${setQuery} WHERE id = $${
    fields.length + 1
  }`;
  values.push(id);

  try {
    const result = await pool.query(query, values);
    if (result && result.rowCount !== null && result.rowCount > 0) {
      return NextResponse.json(
        { message: "Profile updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const query = "DELETE FROM PricingProfiles WHERE id = $1";

  try {
    const result = await pool.query(query, [id]);
    if (result && result.rowCount !== null && result.rowCount > 0) {
      return NextResponse.json(
        { message: "Profile deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
