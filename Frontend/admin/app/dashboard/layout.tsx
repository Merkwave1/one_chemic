"use client";

import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default Layout;
