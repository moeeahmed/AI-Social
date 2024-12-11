"use client";
import Header from "./_components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaptionsGen from "./_components/CaptionsGen";
import AnaylseGen from "./_components/AnalyseGen";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-balance flex-col gap-8 px-4 py-10">
        <Header />
        <Tabs defaultValue="captions" className="w-full max-w-screen-xl py-5 ">
          <TabsList className="grid lg:w-1/3 md:w-1/2 grid-cols-2">
            <TabsTrigger value="captions">Captions Gen</TabsTrigger>
            <TabsTrigger value="anaylse">Anaylse Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="captions">
            <CaptionsGen />
          </TabsContent>
          <TabsContent value="anaylse">
            <AnaylseGen />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
