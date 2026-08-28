import { useEffect } from "react";
import { IoIosClose as CloseIcon } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

const ModalHistoryPekerjaan = ({ isOpen, onClose, task }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const getStatusText = (status) => {
        switch (status) {
            case 2:
                return "Selesai";
            case 1:
                return "Proses";
            default:
                return "Belum Mulai";
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-200 ease-in-out ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-black bg-opacity-20 transition-opacity" 
                    onClick={onClose}
                    aria-hidden="true"
                ></div>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                <div
                    className={`relative inline-block w-full max-w-md transform rounded-xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle duration-200 ease-in-out ${
                        isOpen
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-4 scale-95 opacity-0 sm:translate-y-0 sm:scale-95"
                    }`}
                >
                    <div className="px-6 pb-6 pt-5 text-sm">
                        <div className="mb-4 flex items-center justify-between sticky z-10 bg-white top-0 py-4 border-b">
                            <h3 className="text-black text-base font-semibold">
                                Riwayat Pekerjaan
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <CloseIcon size={25} />
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-800">{task?.name}</p>
                            <p className="text-xs text-gray-500 mt-1">PIC: {task?.pic?.name || "-"}</p>
                        </div>

                        {/* STEPPER UI */}
                        <div className="relative space-y-6">
                            {/* Vertical Line */}
                            <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gray-200 z-0" />
                            
                            {[0, 1, 2].map((statusValue, index) => {
                                // Find history for this specific status
                                const history = task?.histories?.find(h => h.status === statusValue);
                                const isCompleted = !!history;
                                const isCurrent = task?.status === statusValue;
                                
                                return (
                                    <div key={statusValue} className={`relative flex items-start group ${!isCompleted ? 'opacity-50' : ''}`}>
                                        <div className="flex-shrink-0 relative flex items-center justify-center z-10">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white ${
                                                isCompleted
                                                    ? 'bg-blue-600 border-blue-600 text-white' 
                                                    : 'border-gray-300 text-gray-400'
                                            } shadow-sm transition-colors duration-200`}>
                                                {isCompleted ? <FaCheck size={12} /> : <span className="text-xs font-medium">{index + 1}</span>}
                                            </div>
                                        </div>
                                        
                                        <div className="ml-4 w-full">
                                            <div className="flex flex-col pt-1">
                                                <span className={`text-base font-medium ${isCurrent ? 'text-blue-700' : isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {getStatusText(statusValue)}
                                                </span>
                                                
                                                {isCompleted ? (
                                                    <>
                                                        <span className="text-xs text-gray-500 mt-0.5">
                                                            {new Date(history.created_at).toLocaleString('id-ID', {
                                                                day: '2-digit', month: '2-digit', year: 'numeric',
                                                                hour: '2-digit', minute: '2-digit'
                                                            })}
                                                        </span>
                                                        <span className="text-xs text-gray-400 mt-0.5">
                                                            Oleh: {history.creator?.name || '-'}
                                                        </span>
                                                        
                                                        {history.notes && (
                                                            <div className={`mt-2 p-3 rounded-lg text-sm ${isCurrent ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-700'}`}>
                                                                {history.notes}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-xs text-gray-400 mt-0.5 italic">
                                                        Tanggal belum tersedia
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalHistoryPekerjaan;
