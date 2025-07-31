import type { TFunction } from "i18next";
import type {
  Language,
  Link
} from "../misc/types";

export const DashLinks = (t: TFunction): Link[] => [
  {
    id: 1,
    name: t("global.customers"),
    path: "/dash-customers"
  },
  {
    id: 2,
    name: t("global.packages"),
    path: "/dash-packages"
  },
  {
    id: 3,
    name: t("global.requests"),
    path: "/dash-requests"
  },
  {
    id: 4,
    name: t("global.services"),
    path: "/dash-services"
  },
];

export const LandLinks = (t: TFunction): Link[] => [
  {
    id: 1,
    name: t("global.home"),
    path: "#hero"
  },
  {
    id: 2,
    name: t("global.services"),
    path: "#services"
  },
  {
    id: 3,
    name: t("global.customers"),
    path: "#customers"
  },
  {
    id: 4,
    name: t("global.packages"),
    path: "#packages"
  },

]

export const languages = (t: TFunction): Language[] => [
  {
    id: 0,
    lang: "ar",
    name: t("languages.arabic")
  },
  {
    id: 1,
    lang: "en",
    name: t("languages.english")
  },
  {
    id: 2,
    lang: "he",
    name: t("languages.hebrew")
  },
];

export const SERVICE_ICONS = [
  'bi bi-calendar', 'bi bi-clock', 'bi bi-people', 'bi bi-person-circle',
  'bi bi-chat-dots', 'bi bi-envelope', 'bi bi-geo-alt', 'bi bi-search',
  'bi bi-star', 'bi bi-bell', 'bi bi-file-earmark', 'bi bi-gear',
  'bi bi-heart', 'bi bi-map', 'bi bi-question-circle', 'bi bi-list',
  'bi bi-check2', 'bi bi-plus', 'bi bi-pencil', 'bi bi-house',
  'bi bi-box', 'bi bi-tag', 'bi bi-ticket', 'bi bi-upload',
  'bi bi-download', 'bi bi-briefcase', 'bi bi-telephone', 'bi bi-person-badge',
  'bi bi-journal-text', 'bi bi-layout-text-window', 'bi bi-lightning', 'bi bi-link',
  'bi bi-pie-chart', 'bi bi-bar-chart', 'bi bi-calendar-check', 'bi bi-calendar-event',
  'bi bi-camera-video', 'bi bi-camera', 'bi bi-collection-play', 'bi bi-credit-card',
  'bi bi-currency-dollar', 'bi bi-door-open', 'bi bi-folder', 'bi bi-globe',
  'bi bi-grid', 'bi bi-image', 'bi bi-info-circle', 'bi bi-layers',
  'bi bi-lock', 'bi bi-mic', 'bi bi-moon', 'bi bi-music-note',
  'bi bi-person-plus', 'bi bi-phone', 'bi bi-printer', 'bi bi-receipt',
  'bi bi-reply', 'bi bi-send', 'bi bi-share', 'bi bi-shield-lock',
  'bi bi-sliders', 'bi bi-stopwatch', 'bi bi-table', 'bi bi-thermometer',
  'bi bi-toggles', 'bi bi-trophy', 'bi bi-journal-bookmark', 'bi bi-journal-bookmark-fill',
  'bi bi-journal-medical', 'bi bi-journal-richtext', 'bi bi-journal', 'bi bi-book',
  'bi bi-book-half', 'bi bi-bookmark', 'bi bi-bookmark-check', 'bi bi-bookmark-star',
  'bi bi-bookmark-plus', 'bi bi-bookmark-heart', 'bi bi-collection', 'bi bi-collection-fill',
  'bi bi-cloud', 'bi bi-cloud-upload', 'bi bi-cloud-download', 'bi bi-file-earmark-text',
  'bi bi-file-earmark-richtext', 'bi bi-file-earmark-medical', 'bi bi-file-text', 'bi bi-file-check',
  'bi bi-file-plus', 'bi bi-file-lock', 'bi bi-clipboard', 'bi bi-clipboard-check',
  'bi bi-clipboard-plus', 'bi bi-clipboard-data', 'bi bi-clipboard-heart', 'bi bi-clipboard-pulse',
  'bi bi-alarm', 'bi bi-archive', 'bi bi-award', 'bi bi-award-fill',
  'bi bi-badge-ad', 'bi bi-badge-hd', 'bi bi-badge-vr', 'bi bi-bookmark-dash',
  'bi bi-box-arrow-up-right', 'bi bi-browser-chrome', 'bi bi-browser-edge', 'bi bi-browser-firefox',
  'bi bi-bricks', 'bi bi-bug', 'bi bi-building', 'bi bi-bullseye',
  'bi bi-bus-front', 'bi bi-calculator', 'bi bi-calendar2', 'bi bi-calendar2-check',
  'bi bi-calendar2-week', 'bi bi-capslock', 'bi bi-card-heading', 'bi bi-card-image',
  'bi bi-card-text', 'bi bi-caret-up', 'bi bi-cash', 'bi bi-cast',
  'bi bi-check-circle', 'bi bi-chevron-bar-down', 'bi bi-chevron-double-right', 'bi bi-circle-half',
  'bi bi-clipboard-x', 'bi bi-code-slash', 'bi bi-command', 'bi bi-compass',
  'bi bi-cone-striped', 'bi bi-cpu', 'bi bi-diagram-2', 'bi bi-disc',
  'bi bi-discord', 'bi bi-display', 'bi bi-droplet', 'bi bi-ear',
  'bi bi-easel', 'bi bi-emoji-laughing', 'bi bi-eye', 'bi bi-eye-slash',
  'bi bi-eyedropper', 'bi bi-fast-forward'
];

export const SESSION_TOKEN_NAME = "bookyin_session_token"