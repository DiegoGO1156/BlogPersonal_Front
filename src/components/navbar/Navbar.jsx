import { FaBookOpen, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <>
         <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo con animación */}
          <div className="flex items-center space-x-8">
            <a href="/homePage" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white 
                transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                <FaBookOpen className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-xl font-bold text-gray-800 transition-all duration-300 
                group-hover:text-indigo-600 group-hover:tracking-wide">
                Aula<span className="text-indigo-600">Abierta</span>
              </span>
            </a>

            {/* Menú desktop con animaciones */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="relative py-1 group">
                <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                  Inicio
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 
                  transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              <a href="#" className="relative py-1 group">
                <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                  Todos los Cursos
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 
                  transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              <a href="#" className="relative py-1 group">
                <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                  Sobre el Blog
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 
                  transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* Barra de búsqueda con animación */}
          <div className="flex items-center">
            <div className="hidden lg:flex relative group">
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="w-56 pl-4 pr-10 py-1.5 rounded-full border border-gray-300 focus:outline-none 
                focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-sm transition-all 
                duration-300 group-hover:w-64 group-hover:shadow-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 
                hover:text-indigo-600 transition-colors duration-300 group-hover:scale-110">
                <FaSearch className="text-sm" />
              </button>
            </div>

            {/* Botón menú móvil con animación */}
            <button className="md:hidden text-gray-700 focus:outline-none ml-4 hover:text-indigo-600 
              transition-colors duration-300 transform hover:scale-110">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil con animaciones (oculto por defecto) */}
        <div className="md:hidden hidden pb-3">
          <div className="px-2 pt-2 space-y-2">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
              hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 hover:pl-4">
              Inicio
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
              hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 hover:pl-4">
              Todos los Cursos
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
              hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 hover:pl-4">
              Categorías
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
              hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 hover:pl-4">
              Sobre el Blog
            </a>
          </div>
          <div className="px-2 pt-2">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none 
                focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-sm transition-all 
                duration-300 group-hover:shadow-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 
                hover:text-indigo-600 transition-colors duration-300 group-hover:scale-110">
                <FaSearch className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar