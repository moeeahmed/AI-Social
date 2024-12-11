import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "react-hot-toast";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type InstagramData = {
  id: string;
  user_id: string;
  username: string;
  name: string;
  account_type: string;
  profile_picture_url: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
};

const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
];

const CaptionsGen = ({}) => {
  const [instagramData, setInstagramData] = useState<InstagramData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/instagram/overview");

        const response = await res.json();

        if (!res.ok) {
          throw new Error(response.data);
        }

        const { data } = response;

        setInstagramData(data);
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
      <div className="flex flex-col gap-2">
        {loading && (
          <Card className="p-2 w-fit">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          </Card>
        )}
        {!loading && instagramData && (
          <Card className="p-2 w-fit">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  className="h-16 rounded-full"
                  src={instagramData.profile_picture_url}
                />
                <AvatarFallback>
                  <Loader2 />
                </AvatarFallback>
              </Avatar>
              <div>
                <Link
                  className="font-bold text-lg"
                  href={`https://www.instagram.com/${instagramData.username}`}
                  target="_blank"
                >{`@${instagramData.username}`}</Link>
                <p className="capitalize">
                  {instagramData.account_type.toLowerCase().replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </Card>
        )}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-normal">
                Impressions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+223,350</div>
              <p className="text-xs text-muted-foreground">
                +420.9% from last month
              </p>
              <div className="mt-4 h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <Bar dataKey="subscription" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-normal">Followers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
              <div className="mt-4 h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <Bar dataKey="subscription" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-normal">Likes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+14,350</div>
              <p className="text-xs text-muted-foreground">
                +339.2% from last month
              </p>
              <div className="mt-4 h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <Bar dataKey="subscription" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CaptionsGen;
