'use client';
import React, { useState } from 'react';

interface Comment {
    id: string;
    text: string;
    author: string;
    publishedAt: string;
    likeCount: number;
  }
  
  const YouTubeComments: React.FC = () => {
    const [videoId, setVideoId] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const fetchComments = async () => {
    if (!videoId) {
      setError('Please enter a video ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/comments?videoId=${videoId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (err) {
      setError('Error fetching comments. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleReply = async (parentId: string) => {
    if (!replyText) {
      setError('Please enter a reply');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parentId, text: replyText }),
      });

      if (!response.ok) {
        throw new Error('Failed to post reply');
      }

      const data = await response.json();
      console.log('Reply posted:', data.reply);

      // Refresh comments after posting reply
      await fetchComments();
      setReplyText('');
      setReplyingTo(null);
    } catch (err) {
      setError('Error posting reply. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Comments Fetcher</h1>
      <div className="mb-4">
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="Enter YouTube Video ID"
          className="border p-2 mr-2"
        />
        <button
          onClick={fetchComments}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? 'Loading...' : 'Fetch Comments'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="border-b py-2">
            <p className="font-bold">{comment.author}</p>
            <p>{comment.text}</p>
            <p className="text-sm text-gray-500">
              Published: {new Date(comment.publishedAt).toLocaleString()} | Likes: {comment.likeCount}
            </p>
            {replyingTo === comment.id ? (
              <div className="mt-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Enter your reply"
                  className="border p-2 w-full"
                  rows={3}
                />
                <div className="mt-2">
                  <button
                    onClick={() => handleReply(comment.id)}
                    disabled={loading}
                    className="bg-green-500 text-white p-2 rounded mr-2"
                  >
                    {loading ? 'Posting...' : 'Post Reply'}
                  </button>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="bg-gray-300 p-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="text-blue-500 mt-2"
              >
                Reply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeComments;