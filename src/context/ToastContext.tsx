import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, Platform, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToastType = "success" | "error" | "info";
type Toast = { message: string; type: ToastType };

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const TOAST_STYLES: Record<
  ToastType,
  { bg: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  success: { bg: "bg-green-600", icon: "checkmark-circle" },
  error: { bg: "bg-red-500", icon: "alert-circle" },
  info: { bg: "bg-navy", icon: "information-circle" },
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<Toast | null>(null);
  const progress = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const useNative = Platform.OS !== "web";

  const hide = useCallback(() => {
    Animated.timing(progress, {
      toValue: 0,
      duration: 200,
      useNativeDriver: useNative,
    }).start(({ finished }) => {
      if (finished) setToast(null);
    });
  }, [progress, useNative]);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      if (timer.current) clearTimeout(timer.current);
      setToast({ message, type });
      Animated.timing(progress, {
        toValue: 1,
        duration: 250,
        useNativeDriver: useNative,
      }).start();
      timer.current = setTimeout(hide, 3000);
    },
    [hide, progress, useNative]
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const style = toast ? TOAST_STYLES[toast.type] : null;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && style ? (
        <Animated.View
          style={{
            position: "absolute",
            top: insets.top + 8,
            left: 16,
            right: 16,
            zIndex: 50,
            opacity: progress,
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={hide}
            className={`flex-row items-center rounded-2xl px-4 py-3 shadow-lg ${style.bg}`}
          >
            <Ionicons name={style.icon} size={22} color="#FFFFFF" />
            <Text className="ml-3 flex-1 text-sm font-semibold text-white">
              {toast.message}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}