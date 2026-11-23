import logoAsset from "@/assets/logo-desafio-de-xadrez.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/products";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      
      {/* Main footer content */}
      <div className="container-full py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">          
          
          {/* Explore */}
          <div>
            <Link
              to="/"
              className="inline-block"
              aria-label="Desafio de Xadrez - página inicial"
            >
              <img
                src={logoAsset}
                alt="Desafio de Xadrez"
                className="h-14 md:h-16 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-background/50 leading-relaxed max-w-xs">
              Lema Desafio 2026: Sozinhos vamos longe. Juntos, somos mais rápidos e mais fortes.
            </p>
          </div>
          
          <div>
            {/* Menu */}
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">Menu</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-sm text-background/60 hover:text-background transition-colors duration-300">INÍCIO</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-background/60 hover:text-background transition-colors duration-300">INFORMAÇÕES</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-background/60 hover:text-background transition-colors duration-300">FOTOS DE TORNEIOS</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-background/60 hover:text-background transition-colors duration-300">ESG</Link>
              </li>              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contato.vpe@hotmail.com" className="text-sm text-background/60 hover:text-background transition-colors duration-300">                  
                  contato.vpe@hotmail.com
                </a>
              </li>
              <li>
                <p className="text-sm text-background/40 leading-relaxed">
                  Tel./WhatsApp: +55 (21) 9.9909-2345
                </p>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="max-w-sm w-full">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-background/40 mb-3">
                Newsletter
              </p>
              <form className="flex gap-0">
                <input
                  type="email"
                  placeholder="Informe seu email"
                  className="flex-1 h-12 px-4 text-sm bg-background/5 border border-background/15 text-background placeholder:text-background/30 focus:outline-none focus:border-background/40 transition-colors"
                />
                <button
                  type="submit"
                  className="h-12 px-5 text-sm font-medium bg-background text-foreground hover:bg-background/90 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container-full py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} - All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-xs text-background/30 hover:text-background/60 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-background/30 hover:text-background/60 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-background/30 hover:text-background/60 transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
