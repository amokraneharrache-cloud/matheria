"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  legacyStorageKeys,
  storageKeys,
  type StorageKeyName,
} from "@/lib/storageKeys";

function readStorageItemSnapshot(keyName: StorageKeyName) {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const storage = window.localStorage;
    return (
      storage.getItem(storageKeys[keyName]) ??
      storage.getItem(legacyStorageKeys[keyName])
    );
  } catch {
    return null;
  }
}

function subscribeToStorageItem(
  keyName: StorageKeyName,
  onStoreChange: () => void,
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const currentKey = storageKeys[keyName];
  const legacyKey = legacyStorageKeys[keyName];
  const handleStorage = (event: StorageEvent) => {
    if (
      event.storageArea === window.localStorage &&
      (event.key === null || event.key === currentKey || event.key === legacyKey)
    ) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}

export function useStorageItemValue(keyName: StorageKeyName) {
  const subscribe = useCallback(
    (onStoreChange: () => void) =>
      subscribeToStorageItem(keyName, onStoreChange),
    [keyName],
  );
  const getSnapshot = useCallback(
    () => readStorageItemSnapshot(keyName),
    [keyName],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}

export function parseStoredJson<T>(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
