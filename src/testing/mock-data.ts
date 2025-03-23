import { Movie, Showtime } from '@/types';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    posterUrl: 'https://images.unsplash.com/photo-1560109947-543149eceb16?q=80&w=1035&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1059&auto=format&fit=crop',
    releaseDate: '2023-11-15',
    duration: 148,
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8
  },
  {
    id: '2',
    title: 'Interstellar',
    posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1287&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop',
    releaseDate: '2023-10-26',
    duration: 169,
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    rating: 8.6
  },
  {
    id: '3',
    title: 'The Grand Budapest Hotel',
    posterUrl: 'https://images.unsplash.com/photo-1580130632031-c93cdc55c72a?q=80&w=1287&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1170&auto=format&fit=crop',
    releaseDate: '2023-12-05',
    duration: 99,
    genre: ['Comedy', 'Drama'],
    director: 'Wes Anderson',
    cast: ['Ralph Fiennes', 'F. Murray Abraham', 'Mathieu Amalric', 'Adrien Brody'],
    synopsis: 'The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
    rating: 8.1
  },
  {
    id: '4',
    title: 'Dune',
    posterUrl: 'https://images.unsplash.com/photo-1630500874230-5a8a87153246?q=80&w=1287&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1294&auto=format&fit=crop',
    releaseDate: '2023-09-18',
    duration: 155,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac', 'Josh Brolin'],
    synopsis: 'Feature adaptation of Frank Herbert\'s science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.',
    rating: 8.0
  },
  {
    id: '5',
    title: 'Parasite',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1611315764615-3e788573f31e?q=80&w=1287&auto=format&fit=crop',
    releaseDate: '2023-11-02',
    duration: 132,
    genre: ['Thriller', 'Drama', 'Comedy'],
    director: 'Bong Joon Ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    rating: 8.6
  },
  {
    id: '6',
    title: 'The Dark Knight',
    posterUrl: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1287&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?q=80&w=1170&auto=format&fit=crop',
    releaseDate: '2023-12-15',
    duration: 152,
    genre: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    rating: 9.0
  },
  {
    id: '7',
    title: 'Pulp Fiction',
    posterUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1170&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=1170&auto=format&fit=crop',
    releaseDate: '2023-08-22',
    duration: 154,
    genre: ['Crime', 'Drama'],
    director: 'Quentin Tarantino',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
    synopsis: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    rating: 8.9
  },
  {
    id: '8',
    title: 'The Shawshank Redemption',
    posterUrl: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=1170&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1170&auto=format&fit=crop',
    releaseDate: '2023-10-14',
    duration: 142,
    genre: ['Drama'],
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
    synopsis: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rating: 9.3
  },
  {
    id: '9',
    title: 'The Godfather',
    posterUrl: 'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?q=80&w=1287&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1604975701397-6365ccbd028a?q=80&w=1287&auto=format&fit=crop',
    releaseDate: '2023-09-10',
    duration: 175,
    genre: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Richard S. Castellano'],
    synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    rating: 9.2
  },
  {
    id: '10',
    title: 'Spirited Away',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1287&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1171&auto=format&fit=crop',
    releaseDate: '2023-11-20',
    duration: 125,
    genre: ['Animation', 'Adventure', 'Family'],
    director: 'Hayao Miyazaki',
    cast: ['Daveigh Chase', 'Suzanne Pleshette', 'Miyu Irino', 'Rumi Hiiragi'],
    synopsis: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    rating: 8.6
  },
  {
    id: '11',
    title: 'Whiplash',
    posterUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1170&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1170&auto=format&fit=crop',
    releaseDate: '2023-12-01',
    duration: 106,
    genre: ['Drama', 'Music'],
    director: 'Damien Chazelle',
    cast: ['Miles Teller', 'J.K. Simmons', 'Melissa Benoist', 'Paul Reiser'],
    synopsis: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
    rating: 8.5
  },
  {
    id: '12',
    title: 'Blade Runner 2049',
    posterUrl: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=1287&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1485163819542-13adeb5e0068?q=80&w=1287&auto=format&fit=crop',
    releaseDate: '2023-10-05',
    duration: 164,
    genre: ['Sci-Fi', 'Thriller', 'Drama'],
    director: 'Denis Villeneuve',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas', 'Sylvia Hoeks'],
    synopsis: 'A young blade runner\'s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who\'s been missing for thirty years.',
    rating: 8.0
  }
];

export const mockShowtimes: Showtime[] = [
  {
    id: '1',
    movieId: '1',
    date: '2023-12-26',
    startTime: '18:30',
    endTime: '21:00',
    theater: 'Theater 1',
    availableSeats: 120,
    totalSeats: 150
  },
  {
    id: '2',
    movieId: '1',
    date: '2023-12-26',
    startTime: '21:15',
    endTime: '23:45',
    theater: 'Theater 3',
    availableSeats: 80,
    totalSeats: 150
  },
  {
    id: '3',
    movieId: '2',
    date: '2023-12-26',
    startTime: '17:45',
    endTime: '20:30',
    theater: 'Theater 2',
    availableSeats: 100,
    totalSeats: 150
  },
  {
    id: '4',
    movieId: '3',
    date: '2023-12-26',
    startTime: '19:00',
    endTime: '20:40',
    theater: 'Theater 4',
    availableSeats: 65,
    totalSeats: 100
  },
  {
    id: '5',
    movieId: '4',
    date: '2023-12-26',
    startTime: '18:00',
    endTime: '20:35',
    theater: 'Theater 5',
    availableSeats: 110,
    totalSeats: 150
  },
  // Additional showtimes for movie 11 (Whiplash)
  {
    id: '6',
    movieId: '11',
    date: '2023-12-26',
    startTime: '14:00',
    endTime: '15:46',
    theater: 'Theater 1',
    availableSeats: 100,
    totalSeats: 150
  },
  {
    id: '7',
    movieId: '11',
    date: '2023-12-26',
    startTime: '17:30',
    endTime: '19:16',
    theater: 'Theater 3',
    availableSeats: 75,
    totalSeats: 150
  },
  {
    id: '8',
    movieId: '11',
    date: '2023-12-26',
    startTime: '20:15',
    endTime: '22:01',
    theater: 'Theater 2',
    availableSeats: 130,
    totalSeats: 150
  },
  {
    id: '9',
    movieId: '11',
    date: '2023-12-27',
    startTime: '13:45',
    endTime: '15:31',
    theater: 'Theater 4',
    availableSeats: 90,
    totalSeats: 100
  },
  {
    id: '10',
    movieId: '11',
    date: '2023-12-27',
    startTime: '16:30',
    endTime: '18:16',
    theater: 'Theater 2',
    availableSeats: 110,
    totalSeats: 150
  },
  {
    id: '11',
    movieId: '11',
    date: '2023-12-27',
    startTime: '19:45',
    endTime: '21:31',
    theater: 'Theater 1',
    availableSeats: 140,
    totalSeats: 150
  },
  {
    id: '12',
    movieId: '11',
    date: '2023-12-28',
    startTime: '14:30',
    endTime: '16:16',
    theater: 'Theater 3',
    availableSeats: 95,
    totalSeats: 150
  },
  {
    id: '13',
    movieId: '11',
    date: '2023-12-28',
    startTime: '18:00',
    endTime: '19:46',
    theater: 'Theater 5',
    availableSeats: 120,
    totalSeats: 150
  },
  {
    id: '14',
    movieId: '11',
    date: '2023-12-28',
    startTime: '21:30',
    endTime: '23:16',
    theater: 'Theater 1',
    availableSeats: 145,
    totalSeats: 150
  }
];

export const getMovieById = (id: string): Movie | undefined => {
  return mockMovies.find(movie => movie.id === id);
};

export const getShowtimesByMovieId = (movieId: string): Showtime[] => {
  return mockShowtimes.filter(showtime => showtime.movieId === movieId);
};

export const getShowtimeById = (id: string): Showtime | undefined => {
  return mockShowtimes.find(showtime => showtime.id === id);
};
