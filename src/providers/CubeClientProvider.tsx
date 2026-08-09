"use client";

import { CubeProvider } from "@cubejs-client/react";
import cubeApi from "@/lib/cube";

export default function CubeClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CubeProvider cubeApi={cubeApi}>
      {children}
    </CubeProvider>
  );
}