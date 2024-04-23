import { Link } from "react-router-dom";
import { headerLinks, headerStats } from "../utils/db";
import headerBg from "../assets/images/header-background.jpg";

const linkStyles = {
  borderRadius: "5px",
  padding: "20px 30px",
  backgroundColor: "#f1a9822c",
  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.3)",
};

function Header() {
  return (
    <header className="relative isolate overflow-scroll h-screen py-24 sm:py-32">
      <img
        src={headerBg}
        alt="Header background"
        className="fixed inset-0 -z-10 h-full w-full object-cover object-center md:object-center"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0">
          <h2
            className="text-4xl font-bold tracking-tight text-[#fff7ed] sm:text-5xl"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            Your One-Stop Destination!
          </h2>
          <p
            className="mt-6 text-lg leading-8 text-orange-50"
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            Welcome to DRESZ – where every click opens a world of possibilities.
            Dive into our curated collection of products, meticulously selected
            to elevate your lifestyle. From trendy fashion to innovative
            gadgets.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {headerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                style={linkStyles}
                data-aos="fade-left"
                data-aos-easing="ease-in-out"
                data-aos-duration={link.aosDuration}
              >
                {link.name}
                <span aria-hidden="true" className="ml-1">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {headerStats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </header>
  );
}

export default Header;
