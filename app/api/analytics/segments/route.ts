import { NextResponse } from 'next/server';
import { Activity } from '@/models/Activity';
import connect from '@/lib/data';

export async function GET() {
  await connect();

  const segments = await Activity.aggregate([
    {
      $group: {
        _id: '$userId',
        totalPageViews: {
          $sum: { $cond: [{ $eq: ['$eventType', 'pageview'] }, 1, 0] }
        },
        totalClicks: {
          $sum: { $cond: [{ $eq: ['$eventType', 'click'] }, 1, 0] }
        },
        avgScrollDepth: {
          $avg: {
            $cond: [
              { $eq: ['$eventType', 'scroll'] },
              '$data.scrollDepth',
              null
            ]
          }
        },
        lastActivity: { $max: '$timestamp' }
      }
    },
    {
      $project: {
        engagement: {
          $switch: {
            branches: [
              { case: { $gte: ['$totalPageViews', 10] }, then: 'High' },
              { case: { $gte: ['$totalPageViews', 5] }, then: 'Medium' },
              { case: { $gte: ['$totalPageViews', 1] }, then: 'Low' }
            ],
            default: 'Inactive'
          }
        }
      }
    },
    {
      $group: {
        _id: '$engagement',
        count: { $sum: 1 }
      }
    }
  ]);

  return NextResponse.json(segments);
}
