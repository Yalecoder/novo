import { create } from "zustand";

type Store = {
  user: {};
  setUser: (item: any) => void;
  userId: string;
  farmerId: string;
  activeTab: string;
  setTab: (tab: string) => void;
  activeCampaignTab: string;
  setCampaignTab: (tab: string) => void;
  setFarmerId: (tab: string) => void;
  marketId: string;
  setMarket: (item: string) => void;
};

export const useStore = create<Store>((set) => {
  return {
    user: null,
    activeTab: "mercados",
  };
});

export const useDefaultStore = create<Store>((set) => {
  return {
    user: null,
    setUser: (user) =>
      set((state) => {
        console.log("99999999999999999", { user });
        return { user: user };
      }),

    activeTab: "farmars",
    setTab: (tab) =>
      set((state) => {
        return { activeTab: tab };
      }),
  };
});

export const marketStore = create<Store>((set) => {
  return {
    market: null,
    setMarket: (market) =>
      set((state) => {
        console.log("marketId", { market });
        return { market: market };
      }),
  };
});

export const setFamerId = create<Store>((set) => {
  return {
    market: null,
    setFarmerId: (farmerId) =>
      set((state) => {
        console.log("farmerId", { farmerId });
        return { farmerId: farmerId };
      }),
  };
});

export const setCampaingTab = create<Store>((set) => {
  return {
    activeDefaultTab: "default",
    setCampaignTab: (campaignTab) =>
      set((state) => {
        console.log("campaignTab", { campaignTab });
        return { activeCampaignTab: campaignTab };
      }),
  };
});
