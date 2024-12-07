"use client";
import Header from "./_components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaptionsGen from "./_components/CaptionsGen";
import PicturesGen from "./_components/PicturesGen";
import IdeasGen from "./_components/IdeasGen";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-balance flex-col gap-8 px-4 py-10">
        <Header />
        <Tabs defaultValue="captions" className="w-full max-w-screen-xl py-5 ">
          <TabsList className="grid lg:w-1/3 md:w-1/2 grid-cols-3">
            <TabsTrigger value="captions">Captions Gen</TabsTrigger>
            <TabsTrigger value="pictures">Posts Gen</TabsTrigger>
            <TabsTrigger value="ideas">Ideas Gen</TabsTrigger>
          </TabsList>
          <TabsContent value="captions">
            <CaptionsGen />
          </TabsContent>
          <TabsContent value="pictures">
            <PicturesGen />
          </TabsContent>
          <TabsContent value="ideas">
            <IdeasGen />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
