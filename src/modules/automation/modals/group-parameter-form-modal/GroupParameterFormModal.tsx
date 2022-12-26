import Modal, { ModalProps } from "modules/shared/components/modal/Modal";

type GroupParameterFormModalProps = {} & ModalProps;

const GroupParameterFormModal: React.FC<GroupParameterFormModalProps> = ({
  ...props
}) => {
  return <Modal {...props}></Modal>;
};

export default GroupParameterFormModal;
