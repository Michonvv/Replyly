'use client'
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleVideoSelect = async (video) => {
    setSelectedVideo(video);
    try {
      const response = await fetch(`/api/comments?videoId=${video.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar videos={videos} onVideoSelect={handleVideoSelect} />
      <MainContent selectedVideo={selectedVideo} comments={comments} />
    </div>
  );
}
