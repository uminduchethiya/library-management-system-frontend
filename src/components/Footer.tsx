import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4">
      <div className=" px-12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About */}

        <div className="flex justify-start items-start w-full">
          <div className="max-w-xs">
            <img src={logo} alt="Logo" className="h-8" />
            <p className="text-gray-400 mt-4 text-sm">
              "At Our Digital Library, we are dedicated to connecting readers,
              authors, and educators to inspire learning and discovery. With a
              vast collection and user-friendly tools, we empower book lovers to
              explore, share, and grow their knowledge in a vibrant online
              community."
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Browse Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Membership
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <div className="mt-4 flex items-center bg-gray-800 p-2 rounded-lg">
            <input
              type="email"
              placeholder="Enter your mail"
              className="bg-transparent outline-none text-white flex-1 px-2"
            />
          </div>
          <div className="mt-3 flex items-start">
            <input type="checkbox" className="mt-1" />
            <p className="text-gray-400 text-xs ml-2">
              I agree my personal data will be stored and processed for online
              communication.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        Copyright © 2025{" "}
        <a href="#" className="text-blue-500">
          Expernetic
        </a>
        . All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
