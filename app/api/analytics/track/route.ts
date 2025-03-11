import { NextResponse } from 'next/server';
import { Activity } from '@/models/Activity';
import connect from '@/lib/data';

export async function POST(req: Request) {
  try {
    await connect();
    const { activities } = await req.json();
    console.log('Received activities:', activities); // Add this log
    await Activity.insertMany(activities);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: 'Failed to track activities' }, { status: 500 });
  }
}

