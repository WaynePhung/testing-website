import { toast, Toast } from 'react-hot-toast';
import CustomToast from "./custom-toast-message";

interface CustomToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
  }
  
//   const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => (
//     <div className={`custom-toast ${type}`}>{message}</div>
//   );

const useCustomToast = () => {
  const showCustomToast = (message: string, type: 'success' | 'error' | 'info') => {
    toast.custom((t: Toast) => (
      <CustomToast message={message} type={type} />
    ), {
      duration: 3000,
    });
  };

  return { showCustomToast };
};

export default useCustomToast;
