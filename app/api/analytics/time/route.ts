import { NextResponse } from 'next/server';
import { Activity } from '@/models/Activity';
import connect from '@/lib/data';

export async function GET() {
  await connect();
  
  const timeData = await Activity.aggregate([
    {
      $match: { 
        eventType: 'page_time'
      }
    },
    {
      $group: {
        _id: '$path',
        totalTime: { $sum: '$data.duration' },
        visits: { $count: {} }
      }
    },
    {
      $project: {
        path: '$_id',
        averageTime: { $divide: ['$totalTime', '$visits'] },
        totalVisits: '$visits'
      }
    }
  ]);

  return NextResponse.json({ timeData });
}
