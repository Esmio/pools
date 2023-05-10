import { makeAutoObservable } from "mobx";

interface IPool {
  id: string;
  token1: { name: string; imgSrc: string };
  token2: { name: string; imgSrc: string };
  poolLiquidity: number;
  apr: number;
  myLiquidity: number;
  myBoundedAmount: number;
  longestDaysUnbonding: boolean;
}

export class Pools {
  poolsList: Array<IPool> = [];

  constructor() {
    makeAutoObservable(this);
  }

  addPool(pool: IPool) {
    this.poolsList = [pool, ...this.poolsList];
  }
}

export const pools = new Pools();
