import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const DeletePhotoModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-center shadow-xl transition-all">
              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 00-2-2H9a2 2 0 00-2 2m12 0H5"
                  />
                </svg>
              </div>

              {/* Title */}
              <Dialog.Title className="text-xl font-semibold text-gray-800 mb-2">
                Are you sure you want to delete this photo?
              </Dialog.Title>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The photo will be permanently removed.
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={onDelete}
                  className="bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeletePhotoModal;
