import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type UserRole = "employee" | "mentor" | "manager" | "hr" | "admin";
export type TaskStatus =
  | "active"
  | "completed"
  | "pending"
  | "overdue"
  | "rejected";
export type CandidateStatus =
  | "new"
  | "screening"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export interface CurrentUser {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  loginTime: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: TaskStatus;
  dueDate: string;
  coins: number;
  category: string;
  progress: number;
  mentor: string;
  requiresApproval: boolean;
  employeeId: string;
  employeeName: string;
  submittedAt?: string;
  submissionNotes?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionFeedback?: string;
}

export interface AppUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  position: string;
  status: "active" | "inactive";
  lastLogin: string | null;
  createdAt: string;
  skillCoins: number;
  password: string;
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  experience: string;
  skills: string[];
  aiScore: number;
  status: CandidateStatus;
  appliedDate: string;
  source: string;
}

export interface AppNotification {
  id: string;
  message: string;
  icon: string;
  color: string;
  createdAt: string;
  read: boolean;
  forUserId: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  type: string;
  targetAudience: string;
  questions: string[];
  frequency: string;
  createdAt: string;
  createdBy: string;
  completedBy: string[];
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Изучить корпоративные ценности",
    description: "Ознакомиться с основными принципами и ценностями компании",
    priority: "high",
    status: "active",
    dueDate: "2024-01-15",
    coins: 25,
    category: "Адаптация",
    progress: 0,
    mentor: "Михаил Иванов",
    requiresApproval: true,
    employeeId: "user_employee",
    employeeName: "Эдуард Алтунбаев",
  },
  {
    id: 2,
    title: "Встреча с наставником",
    description: "Первая встреча с назначенным наставником для знакомства",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-16",
    coins: 50,
    category: "Адаптация",
    progress: 100,
    mentor: "Михаил Иванов",
    requiresApproval: true,
    employeeId: "user_employee",
    employeeName: "Эдуард Алтунбаев",
    submittedAt: "2024-01-14T10:30:00",
    submissionNotes: "Встреча прошла успешно, обсудили план адаптации",
  },
  {
    id: 3,
    title: "Заполнить профиль сотрудника",
    description: "Внести личную информацию и контактные данные",
    priority: "medium",
    status: "completed",
    dueDate: "2024-01-12",
    coins: 30,
    category: "Документы",
    progress: 100,
    mentor: "HR-отдел",
    requiresApproval: false,
    employeeId: "user_employee",
    employeeName: "Эдуард Алтунбаев",
    approvedAt: "2024-01-12T14:20:00",
  },
  {
    id: 4,
    title: "Пройти курс по безопасности",
    description: "Обязательное обучение по технике безопасности",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-18",
    coins: 40,
    category: "Обучение",
    progress: 100,
    mentor: "Михаил Иванов",
    requiresApproval: true,
    employeeId: "user_employee",
    employeeName: "Эдуард Алтунбаев",
    submittedAt: "2024-01-13T16:45:00",
    submissionNotes: "Курс пройден, получен сертификат",
  },
  {
    id: 5,
    title: "Настроить рабочее место",
    description: "Организовать рабочее пространство и необходимое оборудование",
    priority: "medium",
    status: "active",
    dueDate: "2024-01-17",
    coins: 30,
    category: "Адаптация",
    progress: 20,
    mentor: "Михаил Иванов",
    requiresApproval: true,
    employeeId: "user_employee",
    employeeName: "Эдуард Алтунбаев",
  },
];

const INITIAL_USERS: AppUser[] = [
  {
    id: "user_employee",
    username: "employee",
    name: "Эдуард Алтунбаев",
    email: "eduard@company.com",
    role: "employee",
    department: "IT отдел",
    position: "Junior разработчик",
    status: "active",
    lastLogin: "2024-01-14T10:30:00",
    createdAt: "2024-01-01T09:00:00",
    skillCoins: 1250,
    password: "123",
  },
  {
    id: "user_mentor",
    username: "mentor",
    name: "Михаил Иванов",
    email: "mikhail@company.com",
    role: "mentor",
    department: "IT отдел",
    position: "Ведущий разработчик",
    status: "active",
    lastLogin: "2024-01-14T08:15:00",
    createdAt: "2023-12-15T09:00:00",
    skillCoins: 2850,
    password: "123",
  },
  {
    id: "user_manager",
    username: "manager",
    name: "Елена Смирнова",
    email: "elena@company.com",
    role: "manager",
    department: "Управление персоналом",
    position: "HR-менеджер",
    status: "active",
    lastLogin: "2024-01-14T09:45:00",
    createdAt: "2023-11-01T09:00:00",
    skillCoins: 0,
    password: "123",
  },
  {
    id: "user_hr",
    username: "hr",
    name: "Ольга Кузнецова",
    email: "olga@company.com",
    role: "hr",
    department: "HR отдел",
    position: "HR-специалист",
    status: "active",
    lastLogin: "2024-01-14T11:00:00",
    createdAt: "2023-10-01T09:00:00",
    skillCoins: 0,
    password: "123",
  },
  {
    id: "user_admin",
    username: "admin",
    name: "Администратор",
    email: "admin@company.com",
    role: "admin",
    department: "IT отдел",
    position: "Системный администратор",
    status: "active",
    lastLogin: "2024-01-14T11:00:00",
    createdAt: "2023-01-01T09:00:00",
    skillCoins: 0,
    password: "123",
  },
];

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "1",
    name: "Александр Волков",
    position: "Frontend-разработчик",
    email: "a.volkov@email.com",
    phone: "+7 (999) 123-45-67",
    experience: "5 лет",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    aiScore: 94,
    status: "interview",
    appliedDate: "2024-01-15",
    source: "HeadHunter",
  },
  {
    id: "2",
    name: "Мария Соколова",
    position: "UX/UI Дизайнер",
    email: "m.sokolova@email.com",
    phone: "+7 (999) 234-56-78",
    experience: "3 года",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    aiScore: 89,
    status: "screening",
    appliedDate: "2024-01-18",
    source: "LinkedIn",
  },
  {
    id: "3",
    name: "Дмитрий Козлов",
    position: "Backend-разработчик",
    email: "d.kozlov@email.com",
    phone: "+7 (999) 345-67-89",
    experience: "7 лет",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    aiScore: 91,
    status: "new",
    appliedDate: "2024-01-20",
    source: "Рекомендация",
  },
  {
    id: "4",
    name: "Анна Петрова",
    position: "Product Manager",
    email: "a.petrova@email.com",
    phone: "+7 (999) 456-78-90",
    experience: "4 года",
    skills: ["Agile", "Scrum", "Jira", "Analytics"],
    aiScore: 86,
    status: "offer",
    appliedDate: "2024-01-10",
    source: "HeadHunter",
  },
  {
    id: "5",
    name: "Игорь Новиков",
    position: "DevOps Engineer",
    email: "i.novikov@email.com",
    phone: "+7 (999) 567-89-01",
    experience: "6 лет",
    skills: ["Kubernetes", "AWS", "CI/CD", "Terraform"],
    aiScore: 92,
    status: "interview",
    appliedDate: "2024-01-12",
    source: "LinkedIn",
  },
];

// ─── Storage Helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = "hrAutopilot_v1";

interface StoredState {
  tasks: Task[];
  users: AppUser[];
  candidates: Candidate[];
  surveys: Survey[];
  notifications: AppNotification[];
  hasUnreadTaskFeedback: boolean;
}

const INITIAL_STATE: StoredState = {
  tasks: INITIAL_TASKS,
  users: INITIAL_USERS,
  candidates: INITIAL_CANDIDATES,
  surveys: [],
  notifications: [],
  hasUnreadTaskFeedback: false,
};

function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredState;
      return { ...INITIAL_STATE, ...parsed };
    }
  } catch {
    // ignore
  }
  return INITIAL_STATE;
}

function saveState(state: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextType {
  currentUser: CurrentUser | null;
  tasks: Task[];
  users: AppUser[];
  candidates: Candidate[];
  surveys: Survey[];
  notifications: AppNotification[];
  hasUnreadTaskFeedback: boolean;

  // Auth
  login: (username: string, password: string) => CurrentUser | null;
  logout: () => void;

  // Tasks
  submitTask: (taskId: number, progress: number, notes: string) => void;
  cancelTask: (taskId: number) => void;
  approveTask: (taskId: number, feedback: string) => void;
  rejectTask: (taskId: number, feedback: string) => void;
  clearTaskFeedback: () => void;

  // SkillCoins
  awardSkillCoins: (userId: string, amount: number) => void;

  // Users (admin)
  createUser: (
    user: Omit<
      AppUser,
      "id" | "status" | "lastLogin" | "createdAt" | "skillCoins"
    >,
  ) => void;
  updateUser: (id: string, updates: Partial<AppUser>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;

  // Candidates (HR)
  updateCandidateStatus: (id: string, status: CandidateStatus) => void;
  addCandidate: (candidate: Omit<Candidate, "id">) => void;

  // Surveys (HR creates, employee completes)
  createSurvey: (
    survey: Omit<Survey, "id" | "createdAt" | "completedBy">,
  ) => void;
  completeSurvey: (surveyId: string) => void;

  // Notifications
  getUnreadNotificationsCount: () => number;
  markAllNotificationsRead: () => void;

  // Helpers
  getCurrentUserData: () => AppUser | undefined;
  getPendingTasksCount: () => number;
  getUnansweredSurveysCount: () => number;

  // Reset
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const stored = loadState();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(stored.tasks);
  const [users, setUsers] = useState<AppUser[]>(stored.users);
  const [candidates, setCandidates] = useState<Candidate[]>(stored.candidates);
  const [surveys, setSurveys] = useState<Survey[]>(stored.surveys);
  const [notifications, setNotifications] = useState<AppNotification[]>(
    stored.notifications,
  );
  const [hasUnreadTaskFeedback, setHasUnreadTaskFeedback] = useState(
    stored.hasUnreadTaskFeedback,
  );

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveState({
      tasks,
      users,
      candidates,
      surveys,
      notifications,
      hasUnreadTaskFeedback,
    });
  }, [tasks, users, candidates, surveys, notifications, hasUnreadTaskFeedback]);

  // ── Auth ──────────────────────────────────────────────────────────────────

  const login = (username: string, password: string): CurrentUser | null => {
    const found = users.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.status === "active",
    );
    if (!found) return null;

    const cu: CurrentUser = {
      id: found.id,
      username: found.username,
      name: found.name,
      role: found.role,
      loginTime: new Date().toISOString(),
    };
    setCurrentUser(cu);
    localStorage.setItem("currentUser", JSON.stringify(cu));

    // Update lastLogin
    setUsers((prev) =>
      prev.map((u) =>
        u.id === found.id ? { ...u, lastLogin: new Date().toISOString() } : u,
      ),
    );

    return cu;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // ── Notifications (internal helper) ──────────────────────────────────────

  const addNotification = (
    forUserId: string,
    message: string,
    icon: string,
    color: string,
  ) => {
    const notif: AppNotification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      message,
      icon,
      color,
      createdAt: new Date().toISOString(),
      read: false,
      forUserId,
    };
    setNotifications((prev) => [notif, ...prev].slice(0, 50)); // keep last 50
  };

  // ── SkillCoins (internal, defined first so tasks can reference it) ──────────

  const awardSkillCoinsInternal = (userId: string, amount: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, skillCoins: u.skillCoins + amount } : u,
      ),
    );
  };

  // ── Tasks ─────────────────────────────────────────────────────────────────

  const submitTask = (taskId: number, progress: number, notes: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        if (t.requiresApproval && progress === 100) {
          return {
            ...t,
            status: "pending",
            progress,
            submittedAt: new Date().toISOString(),
            submissionNotes: notes,
          };
        } else if (!t.requiresApproval && progress === 100) {
          // Auto-complete: award coins
          awardSkillCoinsInternal(t.employeeId, t.coins);
          return {
            ...t,
            status: "completed",
            progress,
            approvedAt: new Date().toISOString(),
          };
        } else {
          return { ...t, progress };
        }
      }),
    );
  };

  const approveTask = (taskId: number, feedback: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        awardSkillCoinsInternal(t.employeeId, t.coins);
        addNotification(
          t.employeeId,
          `Задача «${t.title}» одобрена! +${t.coins} SC`,
          "ri-check-double-line",
          "text-green-600",
        );
        return {
          ...t,
          status: "completed",
          approvedAt: new Date().toISOString(),
          rejectionFeedback: feedback || undefined,
        };
      }),
    );
    setHasUnreadTaskFeedback(true);
  };

  const rejectTask = (taskId: number, feedback: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        addNotification(
          t.employeeId,
          `Задача «${t.title}» отклонена. ${feedback ? feedback.slice(0, 60) : ""}`,
          "ri-close-circle-line",
          "text-red-600",
        );
        return {
          ...t,
          status: "rejected",
          rejectedAt: new Date().toISOString(),
          rejectionFeedback: feedback,
          progress: 0,
        };
      }),
    );
    setHasUnreadTaskFeedback(true);
  };

  const cancelTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId && t.status === "pending"
          ? {
              ...t,
              status: "active",
              progress: 0,
              submittedAt: undefined,
              submissionNotes: undefined,
            }
          : t,
      ),
    );
  };

  const clearTaskFeedback = () => setHasUnreadTaskFeedback(false);

  // ── SkillCoins (public) ───────────────────────────────────────────────────

  const awardSkillCoins = (userId: string, amount: number) => {
    awardSkillCoinsInternal(userId, amount);
    const recipient = users.find((u) => u.id === userId);
    if (recipient) {
      addNotification(
        userId,
        `Вам начислено ${amount} SkillCoins от руководителя!`,
        "ri-coin-line",
        "text-yellow-600",
      );
    }
  };

  // ── Users (Admin) ─────────────────────────────────────────────────────────

  const createUser = (
    user: Omit<
      AppUser,
      "id" | "status" | "lastLogin" | "createdAt" | "skillCoins"
    >,
  ) => {
    const newUser: AppUser = {
      ...user,
      id: `user_${Date.now()}`,
      status: "active",
      lastLogin: null,
      createdAt: new Date().toISOString(),
      skillCoins: 0,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (id: string, updates: Partial<AppUser>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    );
    // If updating the current user's role, refresh their session
    if (currentUser && currentUser.id === id && updates.role) {
      const updated: CurrentUser = { ...currentUser, role: updates.role };
      setCurrentUser(updated);
      localStorage.setItem("currentUser", JSON.stringify(updated));
    }
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
  };

  // ── Candidates (HR) ───────────────────────────────────────────────────────

  const updateCandidateStatus = (id: string, status: CandidateStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
  };

  const addCandidate = (candidate: Omit<Candidate, "id">) => {
    const newCandidate: Candidate = { ...candidate, id: `cand_${Date.now()}` };
    setCandidates((prev) => [...prev, newCandidate]);
  };

  // ── Surveys (HR → Employee) ───────────────────────────────────────────────

  const createSurvey = (
    survey: Omit<Survey, "id" | "createdAt" | "completedBy">,
  ) => {
    const newSurvey: Survey = {
      ...survey,
      id: `survey_${Date.now()}`,
      createdAt: new Date().toISOString(),
      completedBy: [],
    };
    setSurveys((prev) => [...prev, newSurvey]);
  };

  const completeSurvey = (surveyId: string) => {
    if (!currentUser) return;
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === surveyId && !s.completedBy.includes(currentUser.id)
          ? { ...s, completedBy: [...s.completedBy, currentUser.id] }
          : s,
      ),
    );
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  const getCurrentUserData = () => {
    if (!currentUser) return undefined;
    return users.find((u) => u.id === currentUser.id);
  };

  const getPendingTasksCount = () =>
    tasks.filter((t) => t.status === "pending").length;

  const getUnansweredSurveysCount = () => {
    if (!currentUser) return 0;
    return surveys.filter((s) => !s.completedBy.includes(currentUser.id))
      .length;
  };

  const getUnreadNotificationsCount = () => {
    if (!currentUser) return 0;
    return notifications.filter(
      (n) => n.forUserId === currentUser.id && !n.read,
    ).length;
  };

  const markAllNotificationsRead = () => {
    if (!currentUser) return;
    setNotifications((prev) =>
      prev.map((n) =>
        n.forUserId === currentUser.id ? { ...n, read: true } : n,
      ),
    );
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("currentUser");
    window.location.href = window.location.pathname;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        tasks,
        users,
        candidates,
        surveys,
        notifications,
        hasUnreadTaskFeedback,
        login,
        logout,
        submitTask,
        cancelTask,
        approveTask,
        rejectTask,
        clearTaskFeedback,
        awardSkillCoins,
        createUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
        updateCandidateStatus,
        addCandidate,
        createSurvey,
        completeSurvey,
        getUnreadNotificationsCount,
        markAllNotificationsRead,
        getCurrentUserData,
        getPendingTasksCount,
        getUnansweredSurveysCount,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext must be used within AppContextProvider");
  return ctx;
}
