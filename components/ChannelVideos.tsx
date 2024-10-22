'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import YouTubeComments from './YouTubeComments';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const ChannelVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (selectedVideo && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedVideo]);

  const fetchVideos = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/videos');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data.videos);
    } catch (err) {
      setError('Error fetching videos. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Channel Videos</h1>
      {loading && <p>Loading videos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="border rounded-lg p-2">
            <img src={video.thumbnail} alt={video.title} className="w-full h-auto" />
            <h3 className="mt-2 font-semibold">{video.title}</h3>
            <Button
              onClick={() => handleVideoSelect(video.id)}
              className="mt-2 w-full"
            >
              View Comments
            </Button>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div ref={commentsRef} className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comments for Selected Video</h2>
          <YouTubeComments videoId={selectedVideo} />
        </div>
      )}
    </div>
  );
};

export default ChannelVideos;