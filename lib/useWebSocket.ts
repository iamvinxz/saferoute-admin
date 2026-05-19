import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { api } from "@/Redux/Services/APIService";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const connect = () => {
      if (!isMounted.current) return;

      console.log("Connecting to WebSocket...");
      const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
      ws.current = socket;

      socket.onopen = () => {
        console.log("✅ WebSocket connected");
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("📨 WS message received:", message); // remove after debugging

          if (
            message.type === "sos_alert" ||
            message.type === "sos_status_update"
          ) {
            dispatch(api.util.invalidateTags(["SosAlerts"]));
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
        }
      };

      socket.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
      };

      socket.onclose = (event) => {
        console.warn(
          `⚠️ WebSocket closed (code: ${event.code}). Reconnecting in 3s...`,
        );
        // Auto-reconnect after 3 seconds if component is still mounted
        if (isMounted.current) {
          reconnectTimeout.current = setTimeout(connect, 3000);
        }
      };
    };

    connect();

    return () => {
      isMounted.current = false;
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      ws.current?.close();
    };
  }, [dispatch]);
};
