import { Link } from 'react-router-dom';
import { Film, Facebook, Twitter, Instagram, Youtube, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Sobre nosotros', href: '/about' },
      { label: 'Empleos', href: '/careers' },
      { label: 'Prensa', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Centro de ayuda', href: '/help' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Preguntas frecuentes', href: '/faq' },
      { label: 'Dispositivos', href: '/devices' },
    ],
    legal: [
      { label: 'Términos de uso', href: '/terms' },
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Aviso legal', href: '/legal' },
    ],
    social: [
      { label: 'Facebook', icon: Facebook, href: '#' },
      { label: 'Twitter', icon: Twitter, href: '#' },
      { label: 'Instagram', icon: Instagram, href: '#' },
      { label: 'YouTube', icon: Youtube, href: '#' },
    ],
  };

  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800 mt-12 md:mt-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Social Links */}
        <div className="flex items-center gap-4 mb-8">
          {footerLinks.social.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Soporte</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Cuenta</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/account"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Mi cuenta
                </Link>
              </li>
              <li>
                <Link
                  to="/my-list"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Mi lista
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Configuración
                </Link>
              </li>
              <li>
                <Link
                  to="/preferences"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Preferencias
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Code Button */}
        <div className="mb-8">
          <button className="px-4 py-2 text-xs text-gray-500 border border-gray-700 hover:border-gray-500 transition-colors">
            Código de servicio
          </button>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
              <Film className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Stream<span className="text-red-600">Flix</span>
            </span>
          </div>
          <p className="text-sm text-gray-500 text-center">
            © {currentYear} StreamFlix. Todos los derechos reservados.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
