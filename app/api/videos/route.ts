import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { auth } from 'auth';
import { supabase } from '@/lib/supabase';

async function getAuthenticatedYoutubeClient(session: any) {
  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  const oauth2Client = new OAuth2Client({ clientId, clientSecret });
  oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

  return google.youtube({ version: 'v3', auth: oauth2Client });
}

export async function GET(request: Request) {
  console.log('Fetching videos...');
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    console.log('No valid session or user email found. Unauthorized.');
    return new Response('Unauthorized', { status: 401 });
  }

  const userEmail = session.user.email;
  console.log('User Email:', userEmail);

  const youtube = await getAuthenticatedYoutubeClient(session);

  // First, get the user's channel ID
  try {
    const channelResponse = await youtube.channels.list({
      part: ['id'],
      mine: true
    });

    const channelId = channelResponse.data.items?.[0].id;

    if (!channelId) {
      return new Response('Channel ID not found', { status: 404 });
    }

    console.log('Channel ID:', channelId);

    // Check Supabase for cached videos
    console.log('Checking Supabase for cached videos...');
    const { data: cachedVideos, error } = await supabase
      .from('youtube_videos')
      .select('*')
      .eq('user_email', userEmail)
      .eq('channel_id', channelId)
      .single();

    if (cachedVideos) {
      console.log('Cached videos found in Supabase. Returning cached data.');
      return Response.json({ videos: cachedVideos.videos, source: 'cache' });
    }

    console.log('No cached videos found. Fetching from YouTube API...');

    // Fetch videos for the channel
    const videosResponse = await youtube.search.list({
      part: ['snippet'],
      channelId: channelId,
      type: ['video'],
      maxResults: 50,
    });

    const videos = videosResponse.data.items?.map(item => ({
      id: item.id?.videoId,
      title: item.snippet?.title,
      thumbnail: item.snippet?.thumbnails?.medium?.url,
    }));

    console.log(`Fetched ${videos?.length} videos from YouTube API.`);

    // Store in Supabase
    console.log('Storing videos in Supabase...');
    const { data: insertData, error: insertError } = await supabase.from('youtube_videos').upsert({
      user_email: userEmail,
      channel_id: channelId,
      videos: videos,
      updated_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error('Error storing videos in Supabase:', insertError);
      return new Response('Error storing videos', { status: 500 });
    }

    console.log('Videos stored in Supabase. Returning fresh data.');
    return Response.json({ videos, source: 'api' });
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return new Response('Error fetching videos', { status: 500 });
  }
}
