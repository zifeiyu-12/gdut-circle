import React, { FC, useRef } from "react";
import "./index.css";

export interface PullDownProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}
export const PullDown: FC<PullDownProps> = ({ children, header }) => {
  const pulldowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div id="pulldown-box" ref={pulldowRef}>
      <div id="refresh-indicator">{header}</div>
      <div
        ref={contentRef}
        id="content"
        // onTouchEnd={() => {
        //   const top = contentRef.current?.getBoundingClientRect().top ?? 0;

        //   if (top > 80) {
        //     if (pulldowRef.current) {
        //       pulldowRef.current.style.transform = `translateY(0)`;
        //     }
        //     // 刷新完成后恢复初始状态
        //   } else {
        //     if (pulldowRef.current) {
        //       pulldowRef.current.style.transform = "translateY(-160px)";
        //     }
        //   }
        // }}
      >
        {children}
      </div>
    </div>
  );
};
