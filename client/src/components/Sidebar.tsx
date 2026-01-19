// src/components/Sidebar.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  BanknoteArrowDown,
  BellDot,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";

export function Sidebar({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  return (
    <div
      className={`bg-white border-r h-full transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {open && <span className="font-bold text-lg">InternalSys</span>}
        <Button size="sm" onClick={toggle}>
          {open ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
      </div>
      <ul className="mt-4 space-y-2 p-2">
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row gap-2 items-center bg-blue-100 text-blue-900 rounded-md">
          <LayoutDashboard />
          {open ? "Dashboard" : ""}
        </div>
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row gap-2 items-center bg-blue-100 text-blue-900 rounded-md">
          {" "}
          <BanknoteArrowDown />
          {open ? "Expenses" : ""}
        </div>
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row gap-2 items-center bg-blue-100 text-blue-900 rounded-md">
          <BellDot />
          {open ? "Requests" : ""}
        </div>

        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row gap-2 items-center bg-blue-100 text-blue-900 rounded-md">
          <LogOut />
          {open ? "Settings" : ""}
        </div>
      </ul>
    </div>
  );
}
