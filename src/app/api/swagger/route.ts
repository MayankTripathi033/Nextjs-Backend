// src/app/api/swagger/route.ts

import { NextRequest, NextResponse } from 'next/server';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from '../../../lib/swagger' // Path to your swagger options file

export async function GET(request: NextRequest) {
  const swaggerSpec = swaggerJsDoc(swaggerOptions);

  return NextResponse.json(swaggerSpec, { status: 200 });
}