import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' })

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const result = await sql`SELECT data FROM user_data WHERE user_id = ${userId}`
    return NextResponse.json(result[0]?.data || {})
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await request.json()
    await sql`
      INSERT INTO user_data (user_id, data)
      VALUES (${userId}, ${sql.json(data)})
      ON CONFLICT (user_id)
      DO UPDATE SET data = ${sql.json(data)}, updated_at = NOW()
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
