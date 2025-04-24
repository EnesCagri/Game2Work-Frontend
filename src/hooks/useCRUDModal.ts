import { useState } from "react";
import { Job, Company, Game, Developer, User } from "@/types";

type DataType = Job | Company | Game | Developer | User;
type ModalType = "create" | "update" | "read" | "delete";
export type DataCategory =
  | "jobs"
  | "companies"
  | "games"
  | "developers"
  | "users";

interface UseCRUDModalProps {
  onSubmit: (data: DataType) => void;
  category: DataCategory;
}

export function useCRUDModal({ onSubmit, category }: UseCRUDModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("create");
  const [selectedData, setSelectedData] = useState<DataType | undefined>();
  const [title, setTitle] = useState("");

  const openModal = (type: ModalType, data?: DataType) => {
    setModalType(type);
    setSelectedData(data);
    setTitle(
      type === "create"
        ? `Create New ${category.slice(0, -1)}`
        : type === "update"
        ? `Update ${category.slice(0, -1)}`
        : type === "read"
        ? `View ${category.slice(0, -1)}`
        : `Delete ${category.slice(0, -1)}`
    );
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedData(undefined);
  };

  const handleSubmit = (data: DataType) => {
    onSubmit(data);
    closeModal();
  };

  return {
    isOpen,
    modalType,
    selectedData,
    title,
    openModal,
    closeModal,
    handleSubmit,
  };
}
