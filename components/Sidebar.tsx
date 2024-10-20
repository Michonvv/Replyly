import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function Sidebar({ videos, onVideoSelect }) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">YT Assistant</h1>
      <Tabs defaultValue="videos" className="flex-1">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="Shorts">Shorts</TabsTrigger>
        </TabsList>
        <TabsContent value="videos" className="flex-1">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {videos.map((video) => (
              <div
                key={video.id}
                className="mb-4 cursor-pointer"
                onClick={() => onVideoSelect(video)}
              >
                <img src={video.thumbnail} alt={video.title} className="w-full rounded-md mb-2" />
                <p className="text-sm font-medium line-clamp-2">{video.title}</p>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="Shorts">
          <p className="text-sm text-gray-500">Shorts features coming soon...</p>
        </TabsContent>
      </Tabs>
      <Separator className="my-4" />
      <Button variant="outline" className="w-full">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </Button>
    </aside>
  );
}
