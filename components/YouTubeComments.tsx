'use client';
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface Comment {
  id: string;
  text: string;
  author: string;
  publishedAt: string;
  likeCount: number;
  replies?: Comment[];
}

interface YouTubeCommentsProps {
  videoId: string;
}

const YouTubeComments: React.FC<YouTubeCommentsProps> = ({ videoId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [aiReplyLoading, setAiReplyLoading] = useState(false);

  useEffect(() => {
    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  const fetchComments = async () => {
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
        body: JSON.stringify({ parentId, text: replyText, videoId }),
      });

      if (!response.ok) {
        throw new Error('Failed to post reply');
      }

      const data = await response.json();
      console.log('Reply posted:', data.reply);

      // Update the local state instead of fetching all comments again
      setComments(prevComments => {
        const updatedComments = prevComments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), data.reply],
            };
          }
          return comment;
        });
        return updatedComments;
      });

      setReplyText('');
      setReplyingTo(null);
    } catch (err) {
      setError('Error posting reply. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAIReply = async (comment: Comment) => {
    setAiReplyLoading(true);
    setError('');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentText: comment.text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI reply');
      }

      const data = await response.json();
      setReplyText(data.aiReply);
      setReplyingTo(comment.id);
    } catch (err) {
      setError('Error generating AI reply. Please try again.');
      console.error(err);
    } finally {
      setAiReplyLoading(false);
    }
  };

  if (loading && comments.length === 0) return <p>Loading comments...</p>;
  if (error && comments.length === 0) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        {comments.length === 0 ? (
          <p>No comments found for this video.</p>
        ) : (
          comments.map((comment) => (
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
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                  <div className="mt-2">
                    <Button
                      onClick={() => handleReply(comment.id)}
                      disabled={loading}
                      className="bg-green-500 text-white mr-2"
                    >
                      {loading ? 'Posting...' : 'Post Reply'}
                    </Button>
                    <Button
                      onClick={() => setReplyingTo(null)}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <Button
                    onClick={() => setReplyingTo(comment.id)}
                    variant="link"
                    className="mr-2"
                  >
                    Reply
                  </Button>
                  <Button
                    onClick={() => handleAIReply(comment)}
                    variant="outline"
                    disabled={aiReplyLoading}
                  >
                    {aiReplyLoading ? 'Generating AI Reply...' : 'Generate AI Reply'}
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default YouTubeComments;
