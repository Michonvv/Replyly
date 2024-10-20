import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { auth, EnrichedSession } from 'auth';

export async function GET(request: Request) {
  const session = (await auth()) as EnrichedSession;

  console.log('Session inside the route ', session);

  if (!session) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  const oauth2Client = new OAuth2Client({
    clientId,
    clientSecret,
  });

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  // Use the provider token to authenticate with the YouTube Data API
  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  // Get the video ID from the query parameters
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return new Response('Video ID is required', {
      status: 400,
    });
  }

  try {
    // Use the YouTube Data API to fetch comments for the specified video
    const commentsResponse = await youtube.commentThreads.list({
      part: ['snippet'],
      videoId: videoId,
      maxResults: 100,
    });

    const comments = commentsResponse.data.items?.map(item => ({
      id: item.id,
      text: item.snippet?.topLevelComment?.snippet?.textDisplay,
      author: item.snippet?.topLevelComment?.snippet?.authorDisplayName,
      publishedAt: item.snippet?.topLevelComment?.snippet?.publishedAt,
      likeCount: item.snippet?.topLevelComment?.snippet?.likeCount,
    }));

    if (comments?.length) {
      console.log(`Fetched ${comments.length} comments for video ${videoId}`);
    } else {
      console.log('No comments found.');
    }

    return Response.json({ comments });
  } catch (error) {
    console.error('Error fetching YouTube comments:', error);
    return new Response('Error fetching comments', {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const session = (await auth()) as EnrichedSession;
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;
  
  const oauth2Client = new OAuth2Client({ clientId, clientSecret });
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  
  const { parentId, text } = await request.json();
  
  if (!parentId || !text) {
    return new Response('Parent comment ID and reply text are required', { status: 400 });
  }
  
  try {
    const response = await youtube.comments.insert({
      part: ['snippet'],
      requestBody: {
        snippet: {
          parentId: parentId,
          textOriginal: text,
        },
      },
    });
  
    // Format the reply to match the Comment interface
    const formattedReply = {
      id: response.data.id,
      text: response.data.snippet?.textOriginal,
      author: response.data.snippet?.authorDisplayName,
      publishedAt: response.data.snippet?.publishedAt,
      likeCount: response.data.snippet?.likeCount,
    };
  
    return Response.json({ reply: formattedReply });
  } catch (error) {
    console.error('Error posting reply:', error);
    return new Response('Error posting reply', { status: 500 });
  }
}
