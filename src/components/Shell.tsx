"use client";

import Nav from "@/components/Nav";
import Modal from "@/components/Modal";

type Content = number | null;

type ShellProps = {
  onToggleContent: (mode: Content) => void;
  activeIndex: Content;
  onClose: () => void;
};

export default function Shell({ onToggleContent, activeIndex, onClose }: ShellProps) {
  return (
    <>
      <Nav onToggleContent={onToggleContent} activeIndex={activeIndex} />
      {activeIndex !== null && <Modal onClose={onClose} n={activeIndex} />}
    </>
  );
}
