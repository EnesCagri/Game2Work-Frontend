import BaseModal from "./BaseModal";
import Image from "next/image";

interface ReadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any>;
}

export default function ReadModal({
  isOpen,
  onClose,
  title,
  data,
}: ReadModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="grid grid-cols-3 gap-4">
            <div className="col-span-1 font-semibold text-gray-300">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
            <div className="col-span-2">
              {typeof value === "string" && value.startsWith("http") ? (
                <div className="relative w-full h-48">
                  <Image
                    src={value}
                    alt={key}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-gray-200">{value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </BaseModal>
  );
}
