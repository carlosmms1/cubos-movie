import { Link, type LinkComponentProps } from "@tanstack/react-router";

type MovieCardProps = {
  coverImage: string;
  title: string;
  genre?: string[];
} & LinkComponentProps<"a">;

export function MovieCard({
  coverImage,
  title,
  genre,
  ...props
}: MovieCardProps) {
  return (
    <Link
      {...props}
      className="hover:scale-[101%] transition-[scale] cursor-pointer"
    >
      <div className="relative h-full">
        <div className="relative min-w-[255px] w-full min-h-[355px] h-full">
          <img
            className="w-full h-full object-cover rounded-xs shadow"
            src={coverImage}
            alt={title}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-xs"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.0) 50%)",
            }}
          />
        </div>
        <div className="absolute left-4 bottom-4 space-y-2">
          <p className="font-medium uppercase text-secondary dark:text-primary-foreground">
            {title}
          </p>
          {genre && (
            <p className="text-sm font-light text-secondary/60 dark:text-primary-foreground/60">
              {genre.join(", ")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function MovieCardPlaceholder() {
  return (
    <div className="min-h-[355px] h-full min-w-[255px] w-full bg-accent rounded-xs animate-pulse shadow" />
  );
}
