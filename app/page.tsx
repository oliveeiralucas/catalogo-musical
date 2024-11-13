import { HeroSection } from '@/components/HeroSection';
import { MovieSection } from '@/components/MovieSection';

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <HeroSection
        title="My Hero Academia: World Heroes' Mission"
        description="A mysterious group called Humarize strongly believes in the Quirk Singularity Doomsday theory..."
        imageUrl="/path/to/hero-image.jpg"
      />

      {/* Upcoming Movies Section */}
      <MovieSection
        title="Upcoming movies"
        movies={[
          { id: 1, title: "Movie Title 1", year: "2022", imageUrl: "/path/to/movie-poster.jpg" },
          { id: 2, title: "Movie Title 2", year: "2021", imageUrl: "/path/to/movie-poster.jpg" },
          // Adicione mais filmes conforme necessário
        ]}
        viewMoreLink="#"
      />

      {/* Top Rated Movies Section */}
      <MovieSection
        title="Top rated movies"
        movies={[
          { id: 3, title: "Movie Title 3", year: "2020", imageUrl: "/path/to/movie-poster.jpg" },
          { id: 4, title: "Movie Title 4", year: "2019", imageUrl: "/path/to/movie-poster.jpg" },
          // Adicione mais filmes conforme necessário
        ]}
        viewMoreLink="#"
      />
    </div>
  );
}