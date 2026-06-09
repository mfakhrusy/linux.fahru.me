import { Flex, Image } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DesktopMainViewModal } from "@/components/desktop/DekstopMainViewModal";
import { DesktopDragArea } from "@/components/desktop/DesktopDragArea";
import { DesktopInfoPopover } from "@/components/desktop/DesktopInfoPopover";
import type { App } from "@/lib/apps/apps";
import className from "@/lib/className";
import zIndex from "@/lib/zIndex";
import type { RootState } from "@/store";
import {
  SetActiveDesktopAppAction,
  SetFocusedDesktopAppAction,
  setFocusedDesktopApp as setFocusedDesktopAppAction,
  SetCurrentTime,
  setCurrentTime as setCurrentTimeAction,
} from "@/store/desktop";
import { TaskbarState, setTaskbarMenu } from "@/store/taskbar";

type ContextMenuPosition = {
  x: number;
  y: number;
};

export function DesktopMainView() {
  const dispatch = useDispatch();
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition>();

  const focusedApp = useSelector<RootState, App>(
    (state) => state.desktop.focusedDesktopApp
  );

  const taskbarMenu = useSelector<RootState, TaskbarState["taskbarMenu"]>(
    (state) => state.taskbar.taskbarMenu
  );

  const setFocusedDesktopApp = useCallback<
    (args: App) => SetFocusedDesktopAppAction
  >((payload) => dispatch(setFocusedDesktopAppAction(payload)), [dispatch]);

  const setCurrentTime = useCallback<(currentTime: string) => SetCurrentTime>(
    (payload) => dispatch(setCurrentTimeAction(payload)),
    [dispatch]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(interval);
  }, [setCurrentTime]);

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContextMenuPosition(undefined);
      }

      if (focusedApp !== "DesktopMainView") {
        // set active app upon pressing enter when there is a focused app
        if (event.key === "Enter") {
          dispatch({
            type: "desktop/setActiveDesktopApp",
            payload: focusedApp,
          } satisfies SetActiveDesktopAppAction);
        } else if (event.key === "Escape") {
          // release focused app
          setFocusedDesktopApp("DesktopMainView");
        }
      }
    };

    window.addEventListener("keydown", eventHandler);

    return () => window.removeEventListener("keydown", eventHandler);
  }, [dispatch, focusedApp, setFocusedDesktopApp]);

  const unfocusApp = useCallback(
    (e) => {
      const isFocusedOnAnyApp = focusedApp !== "DesktopMainView";

      if (isFocusedOnAnyApp) {
        const isTargetNotDesktopIcon =
          (e.target as HTMLDivElement)?.className
            .split(" ")
            .includes(className.desktopIcon) === false;

        if (isTargetNotDesktopIcon) {
          setFocusedDesktopApp("DesktopMainView");
        }
      }
    },
    [focusedApp, setFocusedDesktopApp]
  );

  const handleClick = useCallback(
    (e) => {
      setContextMenuPosition(undefined);
      unfocusApp(e);
      if (taskbarMenu !== undefined) {
        dispatch(setTaskbarMenu());
      }
    },
    [dispatch, taskbarMenu, unfocusApp]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const desktopRect = e.currentTarget.getBoundingClientRect();
      const menuWidth = 250;
      const menuHeight = 336;
      const x = Math.min(
        e.clientX - desktopRect.left,
        desktopRect.width - menuWidth - 8
      );
      const y = Math.min(
        e.clientY - desktopRect.top,
        desktopRect.height - menuHeight - 8
      );

      setFocusedDesktopApp("DesktopMainView");
      setContextMenuPosition({
        x: Math.max(8, x),
        y: Math.max(8, y),
      });

      if (taskbarMenu !== undefined) {
        dispatch(setTaskbarMenu());
      }
    },
    [dispatch, setFocusedDesktopApp, taskbarMenu]
  );

  return (
    <Flex
      flexGrow={1}
      backgroundImage="url(/images/desktop-bg/debian-uwu.png)"
      backgroundRepeat="repeat"
      pos="relative"
      backgroundPosition="center"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <DesktopDragArea />
      <Flex alignSelf="flex-end" m={4}>
        <DesktopInfoPopover />
      </Flex>
      {contextMenuPosition && (
        <Flex
          position="absolute"
          left={`${contextMenuPosition.x}px`}
          top={`${contextMenuPosition.y}px`}
          zIndex={zIndex.appMenu}
          w="250px"
          boxShadow="lg"
          userSelect="none"
          onClick={(e) => e.stopPropagation()}
        >
          <Image src="/rightclick.jpg" alt="Desktop context menu" w="100%" />
        </Flex>
      )}
      <DesktopMainViewModal />
    </Flex>
  );
}
