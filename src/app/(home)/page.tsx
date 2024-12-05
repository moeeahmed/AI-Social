"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import PromptForm from "./_components/promptForm";
import { Card, CardContent } from "@/components/ui/card";
import { SocialOptions } from "./_components/socialsOptions";
import Header from "./_components/header";
import PromptsList from "./_components/promptsList";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Results from "./_components/results";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type SocialMediaOption = "twitter" | "instagram" | "tiktok" | null;

const toneOfVoice: string[] = [
  "Polite",
  "Witty",
  "Enthusiastic",
  "Friendly",
  "Informational",
  "Funny",
];

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState<SocialMediaOption>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [currentTone, setTone] = useState<string>("Polite");
  const [value, setValue] = useState([83]);
  const [includeEmojis, setIncludeEmojis] = useState(false);
  const [generateHashtags, setGenerateHashtags] = useState(false);
  const [promptContent, setPromptContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const getData = async (text: string) => {
    setLoading(true);

    setResponse("");
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();

      const { content } = data.output;

      setResponse(content);
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const onGenerate = () => {
    if (!promptContent || !currentTone || !value) {
      setResponse("Please complete all fields.");
      return;
    }

    const includeText = [];
    if (includeEmojis) includeText.push("emojis");
    if (generateHashtags) includeText.push("hashtags");

    const additionalInstructions = includeText.length
      ? `Include ${includeText.join(" and ")} in the captions.`
      : "";

    const prompt = `${promptContent}. Make the tone ${currentTone}. Each idea should be around ${value} words long. ${additionalInstructions}`;

    getData(prompt);
  };

  const handleSelectPrompt = (prompt: string | null) => {
    setSelectedPrompt(prompt);
  };

  const resetSelectedOption = () => {
    setSelectedOption(null);
  };

  return (
    <>
      <Toaster />
      <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-balance flex-col gap-8 px-4 py-10">
        <Header />
        <Card className="w-full max-w-screen-xl py-5 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto divide-gray divide-x">
            <CardContent className={` ${selectedOption ? "p-0" : ""}`}>
              {!selectedOption && (
                <SocialOptions
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              )}
              {selectedOption && (
                <PromptsList
                  selectedPlatform={selectedOption}
                  onSelectPrompt={handleSelectPrompt}
                  onResetOption={resetSelectedOption}
                />
              )}
            </CardContent>
            <CardContent className="flex flex-col gap-4">
              <PromptForm
                text={selectedPrompt}
                onContentChange={(text) => setPromptContent(text)}
              />

              <div className="flex gap-2 w-full flex-wrap">
                {toneOfVoice.map((tone) => (
                  <Button
                    variant={tone === currentTone ? "default" : "outline"}
                    onClick={() => setTone(tone)}
                    key={tone}
                  >
                    {tone}
                  </Button>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="characters">Approximate Words</Label>
                <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                  {value}
                </span>
              </div>
              <Slider
                id="characters"
                max={150}
                defaultValue={value}
                step={1}
                onValueChange={(val) => setValue(val)}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                aria-label="Characters"
              />

              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="include-emojis"
                    checked={includeEmojis}
                    onCheckedChange={setIncludeEmojis}
                  />
                  <Label htmlFor="include-emojis">Include emojis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="generate-hashtags"
                    checked={generateHashtags}
                    onCheckedChange={setGenerateHashtags}
                  />
                  <Label htmlFor="generate-hashtags">Generates hashtags</Label>
                </div>
              </div>

              {!loading && (
                <Button className="text-center" onClick={onGenerate}>
                  Generate
                </Button>
              )}
              {loading && (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              )}
            </CardContent>
            <CardContent>
              <Results results={response} />
            </CardContent>
          </div>
        </Card>
      </section>
    </>
  );
}