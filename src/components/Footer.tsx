import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              Made with ❤️ by{' '}
              <Link 
                href="https://yurii.shushanskyi.com/" 
                className="font-semibold text-normal-blue hover:text-dimmed-blue transition-colors underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Yurii Shushanskyi
              </Link>
              {' '}© 2025
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="https://github.com/Dazzoo" 
              className="text-gray-600 hover:text-normal-blue transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            <Link 
              href="https://www.linkedin.com/in/yurii-shushanskyi-399916160/" 
              className="text-gray-600 hover:text-normal-blue transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            <Link 
              href="mailto:yuraks46@gmail.com" 
              className="text-gray-600 hover:text-normal-blue transition-colors text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

