import {create} from 'zustand';

export const useUIStore = create((set) => ({
    loginModalOpen: false,
    showSignupByDefault: true,
    setLoginModalOpen: (isOpen) => set({ loginModalOpen: isOpen }),
  }));
