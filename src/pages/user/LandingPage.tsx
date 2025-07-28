import HomeBackground from "../../assets/homebg.png";
import Cardbg1 from "../../assets/cardbg1.png";
import Cardbg2 from "../../assets/cardbg2.png";
import Banner from "../../assets/banner.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const LandingPage = () => {
  
  const featuredBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Classic Literature",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      description:
        "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description:
        "A gripping tale of racial injustice and childhood innocence in the American South.",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      category: "Dystopian Fiction",
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      description:
        "A dystopian social science fiction novel exploring themes of totalitarianism and surveillance.",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Romance",
      image:
        "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?w=300&h=400&fit=crop",
      description:
        "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      category: "Coming of Age",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      description:
        "A controversial novel narrated by a teenager expelled from his prep school.",
    },
    {
      id: 6,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      category: "Fantasy",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description:
        "The first book in the beloved Harry Potter series about a young wizard's adventures.",
    },
  ];

  return (
    <div>
      <header className="absolute top-0 left-0 right-0 z-10"></header>

      <Header />
      <section
        className="bg-cover bg-center text-white text-center py-60 px-6 relative"
        style={{ backgroundImage: `url(${HomeBackground})` }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Discover Your Next Great Read <br />
          <span className="text-blue-400">At Our Digital Library</span>
        </h1>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Explore thousands of books, manage your reading list, and connect with
          fellow book lovers in our comprehensive library management system.
        </p>
        <button className="mt-6 bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">
          BROWSE BOOKS
        </button>
      </section>

      {/* Reader and Librarian Cards */}
      <div className="flex flex-col items-center justify-center py-16 px-10">
        <h2 className="text-xl font-semibold text-center">
          ENHANCE YOUR READING EXPERIENCE WITH
        </h2>
        <h2 className="text-xl font-semibold text-blue-500 text-center">
          POWERFUL LIBRARY TOOLS
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mt-4">
          Whether you're a passionate reader, a student, or a librarian managing
          collections, our platform provides seamless tools and features to
          enhance your library experience and foster a love for reading.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-8">
          {/* READERS Card */}
          <div
            className="p-6 rounded-lg shadow-md w-full max-w-[700px] h-[300px]"
            style={{
              backgroundImage: `url(${Cardbg1})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h3 className="text-4xl font-bold">READERS</h3>
            <p className="text-sm font-semibold text-gray-700 py-7">
              STUDENTS, RESEARCHERS & BOOK ENTHUSIASTS
            </p>
            <p className="text-gray-600">
              Access thousands of books, track your reading progress, and
              discover new titles through personalized recommendations.
            </p>
            <div className="mt-4 flex gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Start Reading
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-full">
                Learn More
              </button>
            </div>
          </div>

          {/* LIBRARIANS Card */}
          <div
            className="p-6 rounded-lg shadow-md w-full max-w-[700px] h-[300px]"
            style={{
              backgroundImage: `url(${Cardbg2})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h3 className="text-4xl font-bold">LIBRARIANS</h3>
            <p className="text-sm font-semibold text-gray-700 py-7">
              LIBRARY STAFF & ADMINISTRATORS
            </p>
            <p className="text-gray-600">
              Efficiently manage book collections, track borrowing patterns, and
              provide excellent service to library users.
            </p>
            <div className="mt-4 flex gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Manage Library
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-full">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED BOOKS Section */}
      <div className="flex flex-col items-center justify-center py-16 px-8 md:px-48">
        <h2 className="text-xl font-semibold text-center mb-6">
          FEATURED BOOKS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/300x400?text=Book+Cover";
                }}
              />
              <div className="flex-1 flex flex-col">
                <h3 className="text-gray-800 font-bold text-lg mt-4">
                  {book.title}
                </h3>
                <p className="text-blue-600 font-medium text-sm">
                  by {book.author}
                </p>
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-2 w-fit">
                  {book.category}
                </span>
                <p className="text-gray-600 mt-2 flex-1 line-clamp-3">
                  {book.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Borrow Book
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div
        className="relative flex items-center justify-between p-8 rounded-2xl w-full max-w-5xl mx-auto bg-cover bg-center h-[200px] mb-12"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="text-white">
          <h2 className="text-3xl font-bold">Join Our Library Community</h2>
          <p className="text-base opacity-80">
            Start your reading journey today with unlimited access to our
            collection
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
          Get Library Card <span className="text-lg">→</span>
        </button>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;
