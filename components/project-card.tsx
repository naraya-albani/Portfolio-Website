import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "./ui/dialog";

export function ProjectCard() {
  return (
    <DialogContent className="sm:max-w-lg flex flex-col max-h-[85vh]">
      <DialogHeader className="text-left shrink-0">
        <DialogTitle>Tes</DialogTitle>
      </DialogHeader>
    </DialogContent>
  );
}
