import { useRouter } from "next/router";
import Link from "next/link";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  return (
    <nav
      className={`flex items-center space-x-4 lg:space-x-6 ${className}`}
      {...props}
    >
      <Link legacyBehavior href="/">
        <a
          className={`text-sm font-medium transition-colors hover:text-primary ${
            router.pathname === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          Overview
        </a>
      </Link>

      <Link legacyBehavior href="/settings">
        <a
          className={`text-sm font-medium transition-colors hover:text-primary ${
            router.pathname === "/settings"
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          Settings
        </a>
      </Link>
    </nav>
  );
}
