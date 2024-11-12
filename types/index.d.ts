import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

export interface ITransactions {
  min: {
    type:
      | "airtime"
      | "data"
      | "funding"
      | "cable-tv"
      | "electricity"
      | "transfer";
    transaction: string;
    dateTime: string;
    amount: number;
    id: string;
  };
  full: {
    id: string;
    type:
      | "airtime"
      | "data"
      | "funding"
      | "cable-tv"
      | "electricity"
      | "transfer";
    transaction: string;
    dateTime: string;
    amount: number;
  };
}

export type IconName = ComponentProps<typeof Ionicons>["name"];
