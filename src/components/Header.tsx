import logoAsset from "@/assets/logo-desafio-de-xadrez.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collections } from "@/data/products";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const informationCollections = collections.slice(0, 3);

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <nav className="container-full">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
            aria-label="Desafio de Xadrez - página inicial"
          >
            <img
              src={logoAsset}
              alt="Desafio de Xadrez"
              className="h-10 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            <Link
              to="/"
              className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
            >
              INÍCIO
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground">
                    INFORMAÇÕES
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {informationCollections.map((collection) => (
                        <li key={collection.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/products?collection=${collection.slug}`}
                              className={cn(
                                "block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              <div className="text-sm font-medium leading-none">
                                {collection.name}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {collection.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/about"
              className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
            >
              FOTOS DE TORNEIOS
            </Link>
            {[
              { to: "/about", label: "ESG" },
              { to: "/contato", label: "CONTATO" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              className="xl:hidden p-2 hover:bg-accent transition-colors duration-300"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="xl:hidden border-t border-border overflow-hidden max-h-[calc(100svh-5rem)] overflow-y-auto"
            >
              <div className="py-8 space-y-6">
                <Link
                  to="/"
                  className="block px-2 py-2.5 text-sm font-medium hover:bg-accent transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  INÍCIO
                </Link>
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/50 px-2 mb-3">
                    INFORMAÇÕES
                  </p>
                  {informationCollections.map((collection, i) => (
                    <motion.div
                      key={collection.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={`/products?collection=${collection.slug}`}
                        className="block px-2 py-2.5 text-sm hover:bg-accent transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {collection.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-6 border-t border-border space-y-1">
                  {[
                    { to: "/about", label: "FOTOS DE TORNEIOS" },
                    { to: "/about", label: "ESG" },
                    { to: "/contato", label: "CONTATO" },
                    { to: "/cart", label: "Shopping Bag" },
                  ].map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        className="block px-2 py-2.5 text-sm font-medium hover:bg-accent transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
