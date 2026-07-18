import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "u_1",
    name: "Aarav Sharma",
    email: "aarav@campus.edu",
    avatar: "https://i.pravatar.cc/150?img=13",
    role: "student",
    headline: "CS Undergrad · Full-stack dev",
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    updateProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" },
  reducers: {
    setTheme: (s, a) => {
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
    setMobileNav: (s, a) => {
      s.mobileNavOpen = a.payload;
    },
  },
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [
      {
        id: "n1",
        title: "New connection request",
        body: "Priya Menon wants to connect",
        time: "2m ago",
        read: false,
        type: "connection",
      },
      {
        id: "n2",
        title: "Job match",
        body: "Senior Frontend Engineer at Stripe",
        time: "1h ago",
        read: false,
        type: "job",
      },
      {
        id: "n3",
        title: "Event reminder",
        body: "Alumni Meet 2026 starts in 2 days",
        time: "3h ago",
        read: false,
        type: "event",
      },
      {
        id: "n4",
        title: "New message",
        body: "Rohan sent you a message",
        time: "5h ago",
        read: true,
        type: "message",
      },
      {
        id: "n5",
        title: "System",
        body: "Your profile was viewed 42 times this week",
        time: "1d ago",
        read: true,
        type: "system",
      },
    ],
  },
  reducers: {
    markAllRead: (s) => {
      s.items.forEach((n) => (n.read = true));
    },
    markRead: (s, a) => {
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

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
