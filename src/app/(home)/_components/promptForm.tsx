import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type promptFormProps = {
  text?: string | undefined;
  onContentChange: (content: string) => void;
};

const promptForm: React.FC<promptFormProps> = ({ text, onContentChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };

  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Your prompt:</Label>
          <Textarea
            id="name"
            onChange={handleChange}
            placeholder={
              text ||
              "What you want to post about? If you don't have ideas, select a prompt template from the left or use a random prompt."
            }
          />
        </div>
      </div>
    </form>
  );
};

export default promptForm;

// import React, { useState, useEffect } from "react";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// type PromptFormProps = {
//   text?: string | undefined; // Initial text
//   onContentChange?: (content: string) => void; // Callback to pass content to the parent
// };

// const PromptForm: React.FC<PromptFormProps> = ({ text = "", onContentChange }) => {
//   const [content, setContent] = useState<string>(text);

//   // Notify parent whenever content changes
//   useEffect(() => {
//     if (onContentChange) {
//       onContentChange(content);
//     }
//   }, [content, onContentChange]);

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setContent(e.target.value); // Update local state
//   };

//   return (
//     <form>
//       <div className="grid w-full items-center gap-4">
//         <div className="flex flex-col space-y-1.5">
//           <Label htmlFor="prompt">Your prompt:</Label>
//           <Textarea
//             value={content}
//             id="prompt"
//             placeholder="What you want to post about? If you don't have ideas, select a prompt template from the left or use a random prompt."
//             onChange={handleChange}
//           />
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PromptForm;
