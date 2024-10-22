import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, User, Video } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function MainContent({ selectedVideo, comments }) {
  const [selectedComments, setSelectedComments] = useState([]);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [aiReply, setAiReply] = useState("");
  const [editedReply, setEditedReply] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);

  const handleCommentSelect = (commentId) => {
    setSelectedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleGenerateReply = async (commentIds) => {
    setIsGeneratingReply(true);
    setAiReply("");
    setEditedReply("");
    try {
      const commentTexts = commentIds.map(id => comments.find(c => c.id === id).text).join("\n\n");
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentText: commentTexts }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate AI reply');
      }
      const data = await response.json();
      setAiReply(data.aiReply);
      setEditedReply(data.aiReply);
    } catch (error) {
      console.error('Error generating AI reply:', error);
    } finally {
      setIsGeneratingReply(false);
    }
  };

  const handlePostReply = async () => {
    try {
      // Here you would typically send the reply to your backend
      // For now, we'll just log it to the console
      console.log(`Posting reply to comment(s) ${activeCommentId}: ${editedReply}`);
      // Reset states after posting
      setAiReply("");
      setEditedReply("");
      setActiveCommentId(null);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  if (!selectedVideo) {
    return (
      <main className="flex-1 p-8 overflow-auto">
        <div className="text-center">
          <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl font-semibold mb-2">No Video Selected</p>
          <p className="text-gray-500 dark:text-gray-400">Select a video from the sidebar to view and respond to comments.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">{selectedVideo.title}</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-2"
              onClick={() => setSelectedComments(comments.map(c => c.id))}
            >
              Select All
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handleGenerateReply(selectedComments)}
              disabled={selectedComments.length === 0}
            >
              Bulk Reply
            </Button>
          </div>
        </div>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4 pb-4 border-b last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Checkbox 
                  id={`comment-${comment.id}`}
                  checked={selectedComments.includes(comment.id)}
                  onCheckedChange={() => handleCommentSelect(comment.id)}
                  className="mr-2"
                />
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{comment.author}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span>{comment.likeCount}</span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2 ml-6">{comment.text}</p>
            <div className="ml-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setActiveCommentId(comment.id);
                      handleGenerateReply([comment.id]);
                    }}
                  >
                    Generate AI Reply
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>AI-Generated Reply</SheetTitle>
                    <SheetDescription>
                      Review and edit the AI-generated reply before posting.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4">
                    <ScrollArea className="h-[300px] rounded-md border p-4">
                      {isGeneratingReply ? (
                        <p>Generating reply...</p>
                      ) : (
                        <Textarea
                          value={editedReply}
                          onChange={(e) => setEditedReply(e.target.value)}
                          placeholder="AI-generated reply will appear here."
                          className="w-full h-full"
                        />
                      )}
                    </ScrollArea>
                  </div>
                  <div className="mt-4">
                    <Button 
                      className="mr-2" 
                      onClick={() => setEditedReply(aiReply)}
                      disabled={isGeneratingReply}
                    >
                      Reset to AI Reply
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handlePostReply}
                      disabled={isGeneratingReply || !editedReply.trim()}
                    >
                      Post Reply
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
