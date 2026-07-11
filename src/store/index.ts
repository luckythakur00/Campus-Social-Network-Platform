import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export type Role = "student" | "faculty" | "alumni" | "placement" | "admin";

interface UserState {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  headline: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "u_1",
    name: "Aarav Sharma",
    email: "aarav@campus.edu",
    avatar: "https://i.pravatar.cc/150?img=13",
    role: "student" as Role,
    headline: "CS Undergrad · Full-stack dev",
  } satisfies UserState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" as "light" | "dark" },
  reducers: {
    setTheme: (s, a: PayloadAction<"light" | "dark">) => {
      s.mode = a.payload;
    },
    toggleTheme: (s) => {
      s.mode = s.mode === "light" ? "dark" : "light";
    },
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: { sidebarOpen: true, mobileNavOpen: false },
  reducers: {
    toggleSidebar: (s) => {
      s.sidebarOpen = !s.sidebarOpen;
    },
    setMobileNav: (s, a: PayloadAction<boolean>) => {
      s.mobileNavOpen = a.payload;
    },
  },
});

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "message" | "connection" | "job" | "event" | "system";
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [
      { id: "n1", title: "New connection request", body: "Priya Menon wants to connect", time: "2m ago", read: false, type: "connection" },
      { id: "n2", title: "Job match", body: "Senior Frontend Engineer at Stripe", time: "1h ago", read: false, type: "job" },
      { id: "n3", title: "Event reminder", body: "Alumni Meet 2026 starts in 2 days", time: "3h ago", read: false, type: "event" },
      { id: "n4", title: "New message", body: "Rohan sent you a message", time: "5h ago", read: true, type: "message" },
      { id: "n5", title: "System", body: "Your profile was viewed 42 times this week", time: "1d ago", read: true, type: "system" },
    ] as Notification[],
  },
  reducers: {
    markAllRead: (s) => {
      s.items.forEach((n) => (n.read = true));
    },
    markRead: (s, a: PayloadAction<string>) => {
      const n = s.items.find((x) => x.id === a.payload);
      if (n) n.read = true;
    },
  },
});

export const { setRole, updateProfile } = userSlice.actions;
export const { setTheme, toggleTheme } = themeSlice.actions;
export const { toggleSidebar, setMobileNav } = uiSlice.actions;
export const { markAllRead, markRead } = notificationsSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer,
    ui: uiSlice.reducer,
    notifications: notificationsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
