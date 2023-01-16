import type { BaseEntity, Money } from "@/types";

export type Product = {
  name: string;
  code: string;
  description: string;
  pictureUrl: string;
  defaultPrice: Money;
  branchId: string;
  branchName: string;
  type: string;
} & BaseEntity;

export type ProductBriefDto = {
  name: string;
  pictureUrl: string;
  localSeller: boolean;
  branchCity: string;
  salesNumber: number;
  priceLabel: string;
} & BaseEntity;
