import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import CreateForm from "./create-form";

interface IProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: Record<string, unknown>) => void;
}

const CreateModal: React.FC<IProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateForm onSubmit={onConfirm} closeModal={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;
