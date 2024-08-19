import { create } from 'zustand';

interface LoginStore {
  isLogin: boolean;
  setIsLogin: (login: boolean) => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  isLogin: false,
  setIsLogin: (login) =>
    set(() => ({
      isLogin: login,
    })),
}));

export default useLoginStore;
