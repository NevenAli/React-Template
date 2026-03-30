import * as React from "react";
import {
  Alert,
  Badge,
  Button,
  IconButton,
  Snackbar,
  SnackbarContent,
  type CloseReason,
  type SnackbarCloseReason,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type NotificationSeverity = "info" | "warning" | "error" | "success";

export interface ShowNotificationOptions {
  key?: string;
  severity?: NotificationSeverity;
  autoHideDuration?: number;
  actionText?: React.ReactNode;
  onAction?: () => void;
}

export interface ShowNotification {
  (message: React.ReactNode, options?: ShowNotificationOptions): string;
}

export interface CloseNotification {
  (key: string): void;
}

interface UseNotifications {
  show: ShowNotification;
  close: CloseNotification;
  showSuccess: (
    message: React.ReactNode,
    options?: ShowNotificationOptions,
  ) => string;
  showError: (
    message: React.ReactNode,
    options?: ShowNotificationOptions,
  ) => string;
  showWarning: (
    message: React.ReactNode,
    options?: ShowNotificationOptions,
  ) => string;
  showInfo: (
    message: React.ReactNode,
    options?: ShowNotificationOptions,
  ) => string;
}

interface NotificationQueueEntry {
  notificationKey: string;
  dedupeKey: string | null;
  message: React.ReactNode;
  options: ShowNotificationOptions;
  open: boolean;
}

interface NotificationsState {
  queue: NotificationQueueEntry[];
}

type NotificationsAction =
  | { type: "ENQUEUE"; payload: NotificationQueueEntry }
  | { type: "SET_OPEN"; payload: { key: string; open: boolean } }
  | { type: "REMOVE"; payload: { key: string } };

const NotificationsContext = React.createContext<UseNotifications | null>(null);

function isPrimitiveMessage(
  message: React.ReactNode,
): message is string | number | boolean {
  return (
    typeof message === "string" ||
    typeof message === "number" ||
    typeof message === "boolean"
  );
}

function getDedupeKey(
  message: React.ReactNode,
  options: ShowNotificationOptions,
): string | null {
  if (options.key) return `key:${options.key}`;
  if (!isPrimitiveMessage(message)) return null;

  const severity = options.severity ?? "default";
  const normalizedActionText =
    typeof options.actionText === "string" ||
    typeof options.actionText === "number"
      ? String(options.actionText)
      : "";

  return `msg:${severity}:${String(message)}:${normalizedActionText}`;
}

function notificationsReducer(
  state: NotificationsState,
  action: NotificationsAction,
): NotificationsState {
  switch (action.type) {
    case "ENQUEUE": {
      const nextEntry = action.payload;
      const isDuplicate = state.queue.some((entry) => {
        if (!nextEntry.dedupeKey || !entry.dedupeKey) return false;
        return entry.dedupeKey === nextEntry.dedupeKey;
      });
      if (isDuplicate) return state;

      return { ...state, queue: [...state.queue, nextEntry] };
    }

    case "SET_OPEN":
      return {
        ...state,
        queue: state.queue.map((entry) =>
          entry.notificationKey === action.payload.key
            ? { ...entry, open: action.payload.open }
            : entry,
        ),
      };

    case "REMOVE":
      return {
        ...state,
        queue: state.queue.filter(
          (entry) => entry.notificationKey !== action.payload.key,
        ),
      };

    default:
      return state;
  }
}

interface NotificationProps {
  notificationKey: string;
  badge: string | null;
  open: boolean;
  message: React.ReactNode;
  options: ShowNotificationOptions;
  onClose: (key: string, reason?: CloseReason | SnackbarCloseReason) => void;
  onExited: (key: string) => void;
}

function Notification({
  notificationKey,
  badge,
  open,
  message,
  options,
  onClose,
  onExited,
}: NotificationProps) {
  const { severity, actionText, onAction, autoHideDuration } = options;

  const handleClose = React.useCallback(
    (_: unknown, reason?: CloseReason | SnackbarCloseReason) => {
      if (reason === "clickaway") return;
      onClose(notificationKey, reason);
    },
    [notificationKey, onClose],
  );

  const handleExited = React.useCallback(
    () => onExited(notificationKey),
    [notificationKey, onExited],
  );

  const action = (
    <React.Fragment>
      {onAction ? (
        <Button color="inherit" size="small" onClick={onAction}>
          {actionText ?? "Action"}
        </Button>
      ) : null}
      <IconButton
        size="small"
        aria-label="Close"
        title="Close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      key={notificationKey}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      slotProps={{ transition: { onExited: handleExited } }}
      action={action}
    >
      <Badge
        badgeContent={badge}
        color="primary"
        sx={{ width: "100%", minWidth: 275 }}
      >
        {severity ? (
          <Alert severity={severity} sx={{ width: "100%" }} action={action}>
            {message}
          </Alert>
        ) : (
          <SnackbarContent message={message} action={action} />
        )}
      </Badge>
    </Snackbar>
  );
}

interface NotificationsProps {
  state: NotificationsState;
  onClose: (key: string, reason?: CloseReason | SnackbarCloseReason) => void;
  onExited: (key: string) => void;
}

function Notifications({ state, onClose, onExited }: NotificationsProps) {
  const currentNotification = state.queue[0] ?? null;

  return currentNotification ? (
    <Notification
      {...currentNotification}
      badge={state.queue.length > 1 ? String(state.queue.length) : null}
      onClose={onClose}
      onExited={onExited}
    />
  ) : null;
}

export interface NotificationsProviderProps {
  children?: React.ReactNode;
}

let nextId = 0;
const generateId = () => {
  const id = nextId;
  nextId += 1;
  return id;
};

export function NotificationsProvider({
  children,
}: NotificationsProviderProps) {
  const [state, dispatch] = React.useReducer(notificationsReducer, {
    queue: [],
  });

  const show = React.useCallback<ShowNotification>((message, options = {}) => {
    const notificationKey =
      options.key ?? `::toolpad-internal::notification::${generateId()}`;
    const dedupeKey = getDedupeKey(message, options);

    dispatch({
      type: "ENQUEUE",
      payload: {
        notificationKey,
        dedupeKey,
        message,
        options,
        open: true,
      },
    });

    return notificationKey;
  }, []);

  const close = React.useCallback<CloseNotification>((key) => {
    dispatch({ type: "SET_OPEN", payload: { key, open: false } });
  }, []);

  const handleExited = React.useCallback((key: string) => {
    dispatch({ type: "REMOVE", payload: { key } });
  }, []);

  const showBySeverity = React.useCallback(
    (
      severity: NotificationSeverity,
      message: React.ReactNode,
      options?: ShowNotificationOptions,
    ) => show(message, { ...options, severity }),
    [show],
  );

  const showSuccess = React.useCallback(
    (message: React.ReactNode, options?: ShowNotificationOptions) =>
      showBySeverity("success", message, options),
    [showBySeverity],
  );
  const showError = React.useCallback(
    (message: React.ReactNode, options?: ShowNotificationOptions) =>
      showBySeverity("error", message, options),
    [showBySeverity],
  );
  const showWarning = React.useCallback(
    (message: React.ReactNode, options?: ShowNotificationOptions) =>
      showBySeverity("warning", message, options),
    [showBySeverity],
  );
  const showInfo = React.useCallback(
    (message: React.ReactNode, options?: ShowNotificationOptions) =>
      showBySeverity("info", message, options),
    [showBySeverity],
  );

  const contextValue = React.useMemo<UseNotifications>(
    () => ({
      show,
      close,
      showSuccess,
      showError,
      showWarning,
      showInfo,
    }),
    [show, close, showSuccess, showError, showWarning, showInfo],
  );

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
      <Notifications state={state} onClose={close} onExited={handleExited} />
    </NotificationsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotifications(): UseNotifications {
  const notificationsContext = React.useContext(NotificationsContext);
  if (!notificationsContext) {
    throw new Error("Notifications context was used without a provider.");
  }
  return notificationsContext;
}
