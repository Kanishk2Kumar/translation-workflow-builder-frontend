import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/95 backdrop-blur supports-backdrop-filter:bg-background-dark/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2" href="/">
          <div className="flex size-8 items-center justify-center rounded text-primary">
            <div className="size-8 text-primary">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Translatio
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
            href="/solutions"
          >
            Solutions
          </a>
          <a
            className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
            href="/security"
          >
            Security
          </a>
          <a
            className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
            href="/pricing"
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <a
            className="hidden text-sm font-medium text-slate-300 hover:text-white sm:block"
            href="/sign-in"
          >
            Log in
          </a>
          <a
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-background-dark hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(19,236,91,0.3)]"
            href="/sign-up"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
