import { NextResponse } from 'next/server';
import { Activity } from '@/models/Activity';
import connect from '@/lib/data';

export async function GET() {
  await connect();
  const last24Hours = Date.now() - 24 * 60 * 60 * 1000;

  const analytics = await Promise.all([
    // Most visited pages
    Activity.aggregate([
      { $match: { eventType: 'pageview' } },
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]),

    // User engagement (scroll depth average)
    Activity.aggregate([
      { $match: { eventType: 'scroll' } },
      { $group: { _id: '$path', avgDepth: { $avg: '$data.scrollDepth' } } }
    ]),

    // Recent activity count
    Activity.countDocuments({ timestamp: { $gte: last24Hours } }),

    // Time spent per page - fixed aggregation
    Activity.aggregate([
      {
        $match: {
          eventType: 'page_leave',
          duration: { $exists: true, $gt: 0 }
        }
      },
      {
        $group: {
          _id: '$path',
          totalDuration: { $sum: '$duration' },
          visits: { $sum: 1 },
          avgDuration: { $avg: '$duration' }
        }
      },
      {
        $project: {
          path: '$_id',
          avgDuration: 1,
          totalVisits: '$visits'
        }
      },
      { $sort: { avgDuration: -1 } }
    ])
  ]);

  return NextResponse.json({
    topPages: analytics[0],
    scrollDepth: analytics[1],
    recentActivityCount: analytics[2],
    timeSpent: analytics[3]
  });
}