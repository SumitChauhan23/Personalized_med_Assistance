import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className='bg-[#80AF81] sticky top-0 p-2 shadow'>
      <div className='flex items-center justify-between mx-auto mt-5 max-w-7xl h-11'>
        <div>
          <h1 className='text-2xl font-bold text-[#000000]'>
            Symptom <span className='text-white'>Seer</span>
          </h1>
        </div>
        <div>
          <ul className='text-custom flex font-medium items-center gap-10'>
            <li>
              <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">Home</ScrollLink>
            </li>
            <li>
              <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer">About Us</ScrollLink>
            </li>
            <li>
              <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer">Contact</ScrollLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar