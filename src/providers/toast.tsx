import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
}

export default ToastProvider;