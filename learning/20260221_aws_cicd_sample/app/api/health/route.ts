import { NextResponse } from 'next/server'
import { createHealth } from '@/lib/health'

export async function GET() {
  return NextResponse.json(createHealth())
}
