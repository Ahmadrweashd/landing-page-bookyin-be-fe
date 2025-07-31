import React, { useEffect, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { BiBell } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getMessages, markAsRead } from "../api-client";
import type { Message } from "../misc/types";
import { useTranslation } from "react-i18next";
import { cn } from "../misc/helpers";

const NotificationDropdown = (): React.ReactNode => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const navigateTo = useNavigate();

  const [langauge, i18next] = useTranslation("global")

  const currentLanguage = i18next.language

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { contacts } = await getMessages({ page: 1, limit: 5 });
        setMessages(contacts);
      } catch {
        console.error("Error fetching messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleToggle = async (isOpen: boolean) => {
    setShowDropdown(isOpen);
    if (isOpen) {
      const unreadIds = messages.filter(m => !m.isRead).map(m => m.id);
      if (unreadIds.length > 0) {
        try {
          await markAsRead(unreadIds);
          setMessages(prev =>
            prev.map(msg => (unreadIds.includes(msg.id) ? { ...msg, isRead: "true" } : msg))
          );
        } catch {
          console.error("Error marking messages as read");
        }
      }
    }
  };

  const hasUnread = messages.some(msg => !msg.isRead || msg.isRead === "false");
  return (
    <Dropdown id="notifications" show={showDropdown} onToggle={handleToggle} align={currentLanguage === "en" ? "end" : "start"}>
      <Dropdown.Toggle as="span" className="position-relative pointer">
        <BiBell size={25} className="icon transition-03" />

        {hasUnread && (
          <span className={cn(
            currentLanguage === "en",
            "end-0",
            "start-0",
            "red-flag bg-danger rounded-circle position-absolute top-0"
          )}
          />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-2">
        <h6 className="px-2 mb-2">{langauge("notifications.title")}</h6>
        {loading ? (
          <div className="text-center p-2">
            <Spinner animation="border" size="sm" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-muted px-2">{langauge("notifications.empty")}</div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className="border-bottom px-2 py-1">
                <p className="mb-0 small">{msg.message.slice(0, 50)}...</p>
              </div>
            ))}
            <div className="text-end mt-2">
              <span
                className="w-100 d-block text-main text-center pointer"
                onClick={() => navigateTo("/notifications")}
              >
                {langauge("notifications.view-all")}
              </span>
            </div>
          </>
        )}
      </Dropdown.Menu>

    </Dropdown>
  );
};

export default NotificationDropdown;
