// app/page.tsx
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Explore GitHub Repositories
      </h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-lg">
        Enter a GitHub username to see their public repositories and file structures.
      </p>
      {/* SearchBar needs to be a Client Component to handle form submission and navigation */}
      <SearchBar /> 
    </div>
  )
}