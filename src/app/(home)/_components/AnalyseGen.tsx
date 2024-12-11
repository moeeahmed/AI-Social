import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Insights from "./insights";

type InstagramPost = {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  timestamp: string;
  permalink: string;
};

const AnalyseGen = ({}) => {
  const [instagramFeed, setInstagramFeed] = useState<InstagramPost[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/instagram/posts");

        const response = await res.json();

        if (!res.ok) {
          throw new Error(response.data);
        }

        const { data } = response;

        setInstagramFeed(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Toaster />
      <Card className="w-full max-w-screen-xl py-5">
        {loading && <h1>loading</h1>}
        <CardHeader>
          <h1 className="font-bold uppercase">
            Select the post you want to anaylse:
          </h1>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto divide-gray divide-x">
            {instagramFeed &&
              instagramFeed.map((post: InstagramPost) => (
                <Popover key={post.id}>
                  <PopoverTrigger className="relative group h-[300px] cursor-pointer ">
                    {post.media_type === "VIDEO" ? (
                      <video
                        src={post.media_url}
                        controls={false}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Image
                        src={post.media_url}
                        alt={post.caption ?? ""}
                        className="w-full h-full object-cover rounded-lg"
                        width={300}
                        height={300}
                      />
                    )}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex items-center justify-center p-4 w-full h-[300px] rounded-lg">
                      <p className="text-white text-center text-xs">
                        {post.caption}
                      </p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Insights mediaId={post.id} />
                  </PopoverContent>
                </Popover>
              ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AnalyseGen;
