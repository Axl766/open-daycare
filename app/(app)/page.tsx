import { Composer } from "@/app/_components/composer";
import { PostCard } from "@/app/_components/post-card";
import { FEED_POSTS } from "@/lib/feed-posts";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-8 sm:px-10 sm:pt-[34px]">
      <header className="mb-6">
        <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent">
          GUARDERÍA · SALA SOLES
        </div>
        <h1 className="m-0 font-[family-name:var(--font-fredoka)] text-[30px] font-semibold text-text-strong">
          Buenas, Caro
        </h1>
        <p className="mt-[5px] text-[14.5px] text-text-faint">
          12 niños · martes 17 jun
        </p>
      </header>

      <Composer />

      <div className="mb-3.5 flex items-center gap-3.5">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
          PUBLICADO HOY
        </span>
        <span className="h-px flex-1 bg-divider" />
      </div>

      <div className="flex flex-col gap-4">
        {FEED_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
