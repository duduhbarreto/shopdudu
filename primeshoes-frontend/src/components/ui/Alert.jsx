// src/components/ui/Alert.jsx
import { Alert as FlowbiteAlert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

const Alert = ({ type = 'info', message, onDismiss }) => {
  const alertProps = {
    color: type,
    icon: HiInformationCircle,
    onDismiss: onDismiss,
  };
  
  return (
    <FlowbiteAlert {...alertProps} className="mb-4">
      <span className="font-medium">{message}</span>
    </FlowbiteAlert>
  );
};

export default Alert;