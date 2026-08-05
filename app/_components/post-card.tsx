import { POST_TYPE_BADGES, type FeedPost } from "@/lib/feed-posts";

const AnnouncementAvatarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
);

const PhotoPlaceholderIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="#E0654A"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const CommentIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
  </svg>
);

function Avatar({ post }: { post: FeedPost }) {
  return (
    <div
      className="flex h-11 w-11 flex-none items-center justify-center rounded-full"
      style={{
        background: post.authorStyle.background,
        color: post.authorStyle.foreground,
      }}
    >
      {post.authorIsIcon ? (
        <AnnouncementAvatarIcon />
      ) : (
        <span className="font-[family-name:var(--font-fredoka)] text-[17px] font-semibold">
          {post.authorInitial}
        </span>
      )}
    </div>
  );
}

function TypeBadge({ post }: { post: FeedPost }) {
  const badge = POST_TYPE_BADGES[post.type];
  return (
    <div
      className="flex items-center gap-[7px] rounded-full px-3 py-1.5"
      style={{ background: badge.background }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: badge.dot }}
      />
      <span
        className="text-xs font-extrabold tracking-[0.5px]"
        style={{ color: badge.text }}
      >
        {badge.label}
      </span>
    </div>
  );
}

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="mt-3.5 flex h-[200px] flex-col items-center justify-center gap-2 rounded-[16px] border border-dashed border-dashed-photo bg-photo-fill text-photo-muted"
      style={{ borderWidth: "1.5px" }}
    >
      <PhotoPlaceholderIcon />
      <span className="text-[13.5px]">{label}</span>
    </a>
  );
}

function AudienceLine({ post }: { post: FeedPost }) {
  const audienceLabel =
    post.audience.kind === "family"
      ? `familia de ${post.audience.childName}`
      : post.audience.label;
  return (
    <div className="mb-2.5 text-[12.5px] text-text-quiet">
      Para: {audienceLabel}
    </div>
  );
}

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <article className="rounded-[20px] border border-card-border bg-card p-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,.5)] sm:p-[20px_22px]">
      <header className="mb-3.5 flex items-center gap-3">
        <Avatar post={post} />
        <div className="flex-1">
          <div className="font-[family-name:var(--font-fredoka)] text-[16.5px] font-semibold text-text-strong">
            {post.authorName}
          </div>
          <div className="text-[12.5px] text-text-quiet">
            {post.timeLabel} · {post.publishedBySelfHint}
          </div>
        </div>
        <TypeBadge post={post} />
      </header>

      <AudienceLine post={post} />

      <p className="m-0 text-[15.5px] leading-[1.55] text-text-body">
        {post.body}
      </p>

      {post.photo && <PhotoPlaceholder label={post.photo.label} />}

      <footer className="mt-4 flex items-center gap-4.5 border-t border-card-border-soft pt-3.5">
        <span className="flex items-center gap-[7px] text-sm font-bold text-heart">
          <HeartIcon />
          {post.hearts}
        </span>
        <a
          href="#"
          className="flex items-center gap-[7px] text-sm font-bold text-text-faint"
        >
          <CommentIcon />
          {post.comments}
        </a>
        <span className="flex-1" />
        <a
          href="#"
          className="text-sm font-extrabold text-accent-deep"
        >
          Editar
        </a>
      </footer>
    </article>
  );
}

export default PostCard;