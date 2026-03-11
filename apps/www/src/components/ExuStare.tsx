"use client";

import { useHotkeySequence } from "@tanstack/react-hotkeys";

/**
 * The epitome of Arknights VNS IT Zone.
 */
export default function ExuStare() {
  useHotkeySequence(
    [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "B",
      "A",
    ],
    () => {
      // oxlint-disable-next-line no-console
      console.log("someone really tries the Konami code on the website :exu_stare:");
    },
  );

  useHotkeySequence(["W", "W", "S", "S", "A", "D", "A", "D", "B", "A"], () => {
    // oxlint-disable-next-line no-console
    console.log("someone really tries the 'low budget' Konami code on the website :exu_stare:");
  });

  return <span />;
}
