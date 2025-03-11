import { NextResponse } from 'next/server';
import { Activity } from '@/models/Activity';
import connect from '@/lib/data';

export async function GET() {
  await connect();

  const timeSpentData = await Activity.aggregate([
    {
      $match: { 
        eventType: 'page_leave'
      }
    },
    {
      $group: {
        _id: '$path',
        totalDuration: { $sum: '$data.duration' },
        visits: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 1,
        avgDuration: { $divide: ['$totalDuration', '$visits'] },
        totalVisits: '$visits'
      }
    },
    {
      $sort: { avgDuration: -1 }
    }
  ]);

  return NextResponse.json(timeSpentData);
}
