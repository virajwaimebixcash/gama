import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({
        open: false,
        onConfirmButton: () => { },
        onCancelButton: () => { },
        showCancelButton: false,
        onClose: () => { },
        text: '',
        icon: '',
        confirmButtonText: '',
        cancelButtonText: '',
        allowOutsideClick: '',
        width: '40vw'
    });

    const showModal = ({ onConfirmButton = '', showCancelButton = false, onCancelButton = '', onClose = '', text,
        icon = 'success',
        confirmButtonText = '',
        cancelButtonText = '',
        allowOutsideClick = '',
        width = '40vw' }) => {
        setModal({
            open: true,
            showCancelButton,
            onConfirmButton,
            onCancelButton,
            onClose,
            text,
            icon,
            confirmButtonText,
            cancelButtonText,
            allowOutsideClick,
            width
        });
    };

    const onClose = () => {
        setModal({ ...modal, open: false, text: "" });
    };

    return (
        <ModalContext.Provider value={{ ...modal, showModal, onClose }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
