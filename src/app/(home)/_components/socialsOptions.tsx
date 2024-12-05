import { Label } from "@/components/ui/label";
import { Icons } from "@/app/(home)/_components/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SocialMediaOptionsProps {
  selectedOption: "twitter" | "instagram" | "tiktok" | null;
  setSelectedOption: (value: "twitter" | "instagram" | "tiktok") => void;
}

export const SocialOptions: React.FC<SocialMediaOptionsProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <RadioGroup
      value={selectedOption}
      onValueChange={(value) =>
        setSelectedOption(value as "twitter" | "instagram" | "tiktok")
      }
      className="grid grid-cols-3 gap-4"
    >
      {[
        { id: "twitter", label: "Twitter", icon: Icons.twitter },
        { id: "instagram", label: "Instagram", icon: Icons.instagram },
        { id: "tiktok", label: "TikTok", icon: Icons.tiktok },
      ].map(({ id, label, icon: Icon }) => (
        <div key={id}>
          <RadioGroupItem
            value={id}
            id={id}
            className="peer sr-only"
            aria-label={label}
          />
          <Label
            htmlFor={id}
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <Icon className="mb-3 h-6 w-6" />
            {label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
