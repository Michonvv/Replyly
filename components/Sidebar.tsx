import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar({ videos, onVideoSelect }) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-4 flex flex-col">
      <Image
            src="/logo.png"
            alt="Home"
            className="h-auto w-32 m-3"
            width={0}
            height={0}
            sizes="100vw"
          />
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
      <Link href="/settings" passHref>
        <Button variant="outline" className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </Link>
    </aside>
  );
}
