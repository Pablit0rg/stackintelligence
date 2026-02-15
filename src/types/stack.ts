import React from "react";

export interface TechItem {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly category: 'language' | 'framework' | 'tool' | 'infra';
}

export interface StackCategory {
  readonly id: string;
  readonly label: string;
  readonly icon: React.ElementType;
  readonly leadText: string;
  readonly items: TechItem[];
}