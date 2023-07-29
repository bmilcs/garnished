import React from "react";

export type TChildren = {
  children?: React.ReactNode;
};

export type TClassName = {
  className?: string;
};

export type TChildrenAndClassName = TChildren & TClassName;
