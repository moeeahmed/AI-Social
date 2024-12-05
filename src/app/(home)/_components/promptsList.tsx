import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React, { FC } from "react";
import {
  instagramPrompts,
  tiktokPrompts,
  twitterPrompts,
} from "@/data/prompts";

interface PromptsListProps {
  selectedPlatform: "twitter" | "instagram" | "tiktok";
  onSelectPrompt: (prompt: string | null) => void;
  onResetOption: () => void;
}

type Prompt = string;

const PromptsList: FC<PromptsListProps> = ({
  selectedPlatform,
  onSelectPrompt,
  onResetOption,
}) => {
  let prompts: Prompt[];
  switch (selectedPlatform) {
    case "instagram":
      prompts = instagramPrompts;
      break;
    case "tiktok":
      prompts = tiktokPrompts;
      break;
    case "twitter":
      prompts = twitterPrompts;
      break;
    default:
      prompts = [];
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-4 h-full">
      <div className="flex justify-start w-full items-center">
        <Button
          variant="outline"
          size="icon"
          className="justify-center mr-4 h-5 w-5 "
          onClick={() => onResetOption()}
        >
          <ChevronLeft />
        </Button>
        <h2 className="text-xl font-semibold">
          {`Example prompts for ${
            selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
          }`}
        </h2>
      </div>

      <div className="flex flex-col w-full max-w-screen gap-1 max-h-[350px]  overflow-auto">
        {prompts.map((prompt, index) => (
          <Button
            variant="ghost"
            className="text-left h-full text-wrap"
            key={index}
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PromptsList;
