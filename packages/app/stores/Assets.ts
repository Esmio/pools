import { Asset as RegistryAsset } from "@chain-registry/types";
import { makeAutoObservable } from "mobx";
import { asset_list } from "@chain-registry/osmosis";

interface Asset extends RegistryAsset {
  displayName?: string;
  customImageUrl?: string;
}

export class AssetsStore {
  assetsObj: Record<string, Asset> = {};

  constructor() {
    makeAutoObservable(this);
  }

  addAsset(asset: Asset) {
    this.assetsObj = {
      ...this.assetsObj,
      [asset.symbol]: asset,
    };
  }

  updateAsset(
    symbol: string,
    {
      displayName,
      customImageUrl,
    }: { displayName: string; customImageUrl: string }
  ) {
    this.assetsObj[symbol] = {
      ...this.assetsObj[symbol],
      displayName,
      customImageUrl,
    };
  }

  removeAsset(symbol: string) {
    if (!this.assetsObj[symbol]) return;
    this.assetsObj = {
      ...this.assetsObj,
      [symbol]: undefined,
    };
  }
}

export const assetsStore = new AssetsStore();

asset_list.assets.slice(0, 7).forEach((asset) => {
  assetsStore.addAsset(asset);
});
