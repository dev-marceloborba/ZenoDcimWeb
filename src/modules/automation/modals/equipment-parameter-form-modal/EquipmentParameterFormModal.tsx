import Modal, { ModalProps } from "modules/shared/components/modal/Modal";

type Props = {} & ModalProps;

const EquipmentParameterFormModal: React.FC<Props> = ({ ...props }) => {
  return <Modal {...props}></Modal>;
};

export default EquipmentParameterFormModal;
