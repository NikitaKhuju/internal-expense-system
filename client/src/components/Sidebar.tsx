// src/components/Sidebar.tsx
import { Button } from "@/components/ui/button";
import {
  BanknoteArrowDown,
  BellDot,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Sidebar({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  const [selectedItemId, setSelectedItemId] = useState<number>(1);
  const selectedItemStyle: string =
    "bg-blue-100 text-blue-900 hover:bg-blue-100";
  const unSelectedItemStyle: string = "text-zinc-500 hover:bg-gray-100";
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
        <Link
          onClick={() => setSelectedItemId(1)}
          to="/"
          className={`px-4 py-2 cursor-pointer flex flex-row gap-2 items-cente rounded-md ${
            selectedItemId == 1 ? selectedItemStyle : unSelectedItemStyle
          }`}
        >
          <LayoutDashboard />
          {open ? "Dashboard" : ""}
        </Link>

        <Link
          onClick={() => setSelectedItemId(2)}
          to="/expenses"
          className={`px-4 py-2  cursor-pointer flex flex-row gap-2 items-cente rounded-md ${
            selectedItemId == 2 ? selectedItemStyle : unSelectedItemStyle
          }`}
        >
          {" "}
          <BanknoteArrowDown />
          {open ? "Expenses" : ""}
        </Link>

        <Link
          onClick={() => setSelectedItemId(3)}
          to="/requests"
          className={`px-4 py-2  cursor-pointer flex flex-row gap-2 items-cente rounded-md ${
            selectedItemId == 3 ? selectedItemStyle : unSelectedItemStyle
          }`}
        >
          <BellDot />
          {open ? "Requests" : ""}
        </Link>

        <Link
          onClick={() => setSelectedItemId(4)}
          to="/staffs"
          className={`px-4 py-2  cursor-pointer flex flex-row gap-2 items-cente rounded-md ${
            selectedItemId == 4 ? selectedItemStyle : unSelectedItemStyle
          }`}
        >
          <Users />
          {open ? "Staffs" : ""}
        </Link>
      </ul>
    </div>
  );
}
