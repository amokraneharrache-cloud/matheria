export const storageKeys = {
  studentProfile: "sprintmaths_student_profile",
  sessionHistory: "sprintmaths_session_history",
  guidedExerciseHistory: "sprintmaths_guided_exercise_history",
  bacMockExamHistory: "sprintmaths_bac_mock_exam_history",
  lastSessionResult: "sprintmaths_last_session_result",
  utmContext: "sprintmaths_utm_context",
  trackingDebug: "sprintmaths_tracking_debug",
  trackingPreference: "sprintmaths_tracking_preference",
  cookieConsent: "sprintmaths_cookie_consent",
} as const;

export type StorageKeyName = keyof typeof storageKeys;

export const legacyStorageKeys: Record<StorageKeyName, string> = {
  studentProfile: "matheria_student_profile",
  sessionHistory: "matheria_session_history",
  guidedExerciseHistory: "matheria_guided_exercise_history",
  bacMockExamHistory: "matheria_bac_mock_exam_history",
  lastSessionResult: "matheria_last_session_result",
  utmContext: "matheria_utm_context",
  trackingDebug: "matheria_tracking_debug",
  trackingPreference: "matheria_tracking_preference",
  cookieConsent: "matheria_cookie_consent",
};

export const sessionStorageKeys = {
  diagnosticResultContext: "sprintmaths_diagnostic_result_context",
} as const;

export type SessionStorageKeyName = keyof typeof sessionStorageKeys;

export const legacySessionStorageKeys: Record<SessionStorageKeyName, string> = {
  diagnosticResultContext: "matheria_diagnostic_result_context",
};

export const storageEvents = {
  trackingPreferenceChanged: "sprintmaths_tracking_preference_changed",
  diagnosticResultContextChanged: "sprintmaths_diagnostic_result_context_changed",
} as const;

function getLocalStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getSessionStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function getStorageItem(keyName: StorageKeyName) {
  const storage = getLocalStorage();
  if (!storage) {
    return null;
  }

  try {
    const value = storage.getItem(storageKeys[keyName]);
    if (value !== null) {
      return value;
    }

    const legacyValue = storage.getItem(legacyStorageKeys[keyName]);
    if (legacyValue !== null) {
      storage.setItem(storageKeys[keyName], legacyValue);
      return legacyValue;
    }

    return null;
  } catch {
    return null;
  }
}

export function setStorageItem(keyName: StorageKeyName, value: string) {
  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(storageKeys[keyName], value);
  } catch {
    // Local browser storage is best-effort and must not block the product.
  }
}

export function removeStorageItem(keyName: StorageKeyName) {
  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(storageKeys[keyName]);
    storage.removeItem(legacyStorageKeys[keyName]);
  } catch {
    // Local browser storage is best-effort and must not block the product.
  }
}

export function getSessionStorageItem(keyName: SessionStorageKeyName) {
  const storage = getSessionStorage();
  if (!storage) {
    return null;
  }

  try {
    const value = storage.getItem(sessionStorageKeys[keyName]);
    if (value !== null) {
      return value;
    }

    const legacyValue = storage.getItem(legacySessionStorageKeys[keyName]);
    if (legacyValue !== null) {
      storage.setItem(sessionStorageKeys[keyName], legacyValue);
      return legacyValue;
    }

    return null;
  } catch {
    return null;
  }
}

export function setSessionStorageItem(
  keyName: SessionStorageKeyName,
  value: string,
) {
  const storage = getSessionStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(sessionStorageKeys[keyName], value);
  } catch {
    // Session storage is best-effort and must not block the funnel.
  }
}
