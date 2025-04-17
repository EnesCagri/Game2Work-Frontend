import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface JobDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export function JobDescriptionModal({
  isOpen,
  onClose,
  title,
  description,
}: JobDescriptionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gray-900/95 border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="prose prose-invert max-w-none">
            {description.split("\n").map((paragraph, index) => (
              <p key={index} className="text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
