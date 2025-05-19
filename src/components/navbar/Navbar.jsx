import { FaBookOpen, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo con animaciones Tailwind */}
          <div className="flex items-center space-x-8">
            <a 
              href="/homePage" 
              className="flex items-center space-x-2 group transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md group-hover:rotate-12 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <FaBookOpen className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-xl font-bold text-gray-800 transition-all duration-300 group-hover:text-indigo-600">
                Aula<span className="text-indigo-600">Abierta</span>
              </span>
            </a>

            {/* Menú desktop con animaciones Tailwind */}
            <div className="hidden md:flex items-center space-x-6">
              {['Inicio', 'Todos los Cursos'].map((item) => (
                <a 
                  key={item}
                  href="/" 
                  className="relative py-1 group transition-all duration-200 hover:scale-[1.03]"
                >
                  <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">
                    {item}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            {/* Botón menú móvil con animación Tailwind */}
            <button 
              className="md:hidden text-gray-700 focus:outline-none ml-4 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil con animaciones Tailwind */}
        <div className="md:hidden hidden overflow-hidden transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 space-y-1">
            {['Inicio', 'Todos los Cursos', 'Categorías', 'Sobre el Blog'].map((item) => (
              <a 
                key={item}
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 hover:translate-x-1"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="px-2 pt-2 pb-3">
            <div className="relative transition-all duration-300 transform hover:scale-[1.01]">
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-300 pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;