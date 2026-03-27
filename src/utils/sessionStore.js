export const SESSION_KEYS = {
  accessToken: "dbackup.access_token",
  prolificPid: "dbackup.prolific_pid",
  studyId: "dbackup.study_id",
  sessionId: "dbackup.session_id",
  clickworkerUser: "dbackup.clickworker_user",
  clickworkerUserId: "dbackup.clickworker_user_id",
  clickworkerTaskId: "dbackup.clickworker_task_id",
  clickworkerJobId: "dbackup.clickworker_job_id",
};

const hasSessionStorage = () =>
  typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

export const getSessionValue = (key) => {
  if (!hasSessionStorage()) {
    return "";
  }

  return window.sessionStorage.getItem(key) || "";
};

export const setSessionValue = (key, value) => {
  if (!hasSessionStorage()) {
    return;
  }

  if (!value) {
    window.sessionStorage.removeItem(key);
    return;
  }

  window.sessionStorage.setItem(key, value);
};

export const removeSessionValue = (key) => {
  if (!hasSessionStorage()) {
    return;
  }

  window.sessionStorage.removeItem(key);
};

export const clearSessionValues = (keys = Object.values(SESSION_KEYS)) => {
  keys.forEach(removeSessionValue);
};

export const getAccessToken = () => getSessionValue(SESSION_KEYS.accessToken);

export const setAccessToken = (token) =>
  setSessionValue(SESSION_KEYS.accessToken, token);

export const clearAccessToken = () => removeSessionValue(SESSION_KEYS.accessToken);
