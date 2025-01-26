import React, { ReactNode } from 'react';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import { RxCross1 } from "react-icons/rx";

// Define types for the modal props
interface ModalProps {
    isOpen: boolean;          // Controls whether the modal is open or closed
    onClose: () => void;      // Callback function to close the modal
    title?: string;           // Optional title for the modal
    children: ReactNode;      // Content of the modal (can be any React node)
    showCloseBtn?: boolean; //
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, showCloseBtn = false }) => {
    if (!isOpen) return null; // Don't render anything if the modal is closed

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 px-2">
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg max-w-[600px] w-full relative">
                {/* Modal Header */}
                {title && (
                    <Heading text={title} className='text-center' />
                )}

                {/* Modal Content */}
                <div className="mb-4">
                    {children}
                </div>

                {/* Modal Footer (Close Button) */}
                {
                    showCloseBtn &&
                <div className="flex justify-end">
                    <Button text='Close' onClick={onClose} className='bg-gray-200 hover:bg-gray-100 w-28' />
                </div>
                }
                <RxCross1 className='absolute top-2 right-2 text-2xl font-extrabold cursor-pointer hover:animate-spin' onClick={onClose} />
            </div>
        </div>
    );
}

export default Modal;
