export type PostType = "achievement" | "activity" | "announcement";

export type PostAudience =
  | { kind: "family"; childName: string }
  | { kind: "all"; label: string };

export interface BadgeStyle {
  background: string;
  dot: string;
  text: string;
}

export interface AuthorStyle {
  background: string;
  foreground: string;
}

export interface PhotoPlaceholder {
  label: string;
}

export interface FeedPost {
  id: string;
  authorInitial: string;
  authorStyle: AuthorStyle;
  authorIsIcon?: boolean;
  authorName: string;
  timeLabel: string;
  publishedBySelfHint: string;
  type: PostType;
  audience: PostAudience;
  body: string;
  photo?: PhotoPlaceholder;
  hearts: number;
  comments: number;
}

export interface PostTypeBadge extends BadgeStyle {
  label: string;
}

export const POST_TYPE_BADGES: Record<PostType, PostTypeBadge> = {
  achievement: {
    background: "#CFEBD8",
    dot: "#3E9B6C",
    text: "#3E9B6C",
    label: "LOGRO",
  },
  activity: {
    background: "#C7E7F1",
    dot: "#2E89A6",
    text: "#2E89A6",
    label: "ACTIVIDAD",
  },
  announcement: {
    background: "#CCD8F4",
    dot: "#4E72C8",
    text: "#4E72C8",
    label: "ANUNCIO",
  },
};

export const FEED_POSTS: readonly FeedPost[] = [
  {
    id: "post-mateo-orinal",
    authorInitial: "M",
    authorStyle: { background: "#A9D9E8", foreground: "#1F7A93" },
    authorName: "Mateo",
    timeLabel: "14:20",
    publishedBySelfHint: "publicado por vos",
    type: "achievement",
    audience: { kind: "family", childName: "Mateo" },
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    hearts: 3,
    comments: 1,
  },
  {
    id: "post-mateo-temperas",
    authorInitial: "M",
    authorStyle: { background: "#A9D9E8", foreground: "#1F7A93" },
    authorName: "Mateo",
    timeLabel: "09:40",
    publishedBySelfHint: "publicado por vos",
    type: "activity",
    audience: { kind: "family", childName: "Mateo" },
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: { label: "Foto · pintando con témperas" },
    hearts: 5,
    comments: 2,
  },
  {
    id: "post-anuncio-parque",
    authorInitial: "A",
    authorStyle: { background: "#CCD8F4", foreground: "#4E72C8" },
    authorIsIcon: true,
    authorName: "Anuncio general",
    timeLabel: "07:50",
    publishedBySelfHint: "publicado por vos",
    type: "announcement",
    audience: { kind: "all", label: "toda la sala" },
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    hearts: 8,
    comments: 0,
  },
];