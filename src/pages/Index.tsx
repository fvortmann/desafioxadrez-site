import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Instagram } from "lucide-react";
import { useRef } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { CollectionCard } from "@/components/CollectionCard";
import { collections, getNewProducts, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/torneio_xadrez_criancas_2.jpg";
import tournamentBadge from "@/assets/logo_torneio_tbs.webp";

const Index = () => {
  const newProducts = getNewProducts();
  const latestProducts = products.slice(0, 4);
  const displayedCollections = collections.slice(0, 6);
  const featuredCollection = collections[0]; // Lighting
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Instagram placeholder images
  const instagramImages = [
    "/images/photo-1618221195710-dd6b41faaea6-w400.jpg",
    "/images/photo-1600210492486-724fe5c67fb0-w400.jpg",
    "/images/photo-1600585154340-be6161a56a0c-w400.jpg",
    "/images/photo-1586023492125-27b2c045efd7-w400.jpg",
    "/images/photo-1565193566173-7a0ee3dbe261-w400.jpg",
    "/images/photo-1578500494198-246f612d3b3d-w400.jpg",
  ];

  return (
    <Layout>
      {/* Hero Section — Full Viewport */}
      <section ref={heroRef} className="tournament-opening relative -mt-16 md:-mt-20 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src={heroPhoto}
            alt="Crianças participantes do Desafio de Xadrez com troféus e medalhas"
            className="w-full h-[120%] object-cover object-[center_20%] animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/45 to-charcoal/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/30 to-transparent" />
        </motion.div>

        <motion.div
          className="tournament-opening-content relative container-full h-full flex flex-col justify-center"
          style={{ opacity: heroOpacity }}
        >
          <div className="tournament-layout relative">
          <div className="tournament-badge lg:order-2">
            <motion.img
              src={tournamentBadge}
              alt="Selo Chess Competition do torneio na The British School"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="w-full h-auto"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="tournament-text relative min-w-0 text-center lg:order-1"
          >
            <h1 className="tournament-title font-serif font-bold whitespace-nowrap text-primary-foreground">
              Desafio de Xadrez
            </h1>
            <p className="tournament-details text-primary-foreground/90 max-w-xl mx-auto whitespace-pre-line">
              <strong>{"​Categorias: 6 à 17 anos"}</strong>
              {"\n(Separadas por idades)\n\n"}
              <strong>05 de dezembro (Sábado)</strong>
              {"\n15h às 18h00\n\n"}
              <strong>The British School - Botafogo</strong>
              {"\nRua Real Grandeza, 99 - Botafogo\nRio de Janeiro - RJ."}
            </p>
            <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-none px-10 py-6 text-base tracking-[0.15em] uppercase btn-premium"
              >
                <Link to="/products">
                  INSCRIÇÕES
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="tournament-scroll-indicator absolute bottom-3 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Collections Grid */}
      <section className="py-24 md:py-32">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >            
          </motion.div>

          {/* Asymmetric grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">                      

            {/* Second row: 3 items */}
            <div className="md:col-span-4">
              <CollectionCard
                collection={displayedCollections[2]}
                index={2}
              />
            </div>
            <div className="md:col-span-4">
              <CollectionCard
                collection={displayedCollections[3]}
                index={3}
              />
            </div>
            <div className="md:col-span-4">
              <CollectionCard
                collection={displayedCollections[4]}
                index={4}
              />
            </div>

          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 md:py-32 bg-linen">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-6">
              Sobre o Desafio!!!
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.3] mb-8">
              Acreditamos que desafios movem fronteiras e preparam nossas criança para o {" "} <span className="italic">FUTURO</span>.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Venha participar dessa divertida aventura.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase"
            >
              <Link to="/about">
                Veja nossos outros projetos.
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Follow Us / Instagram Section */}
      <section className="py-20 md:py-28">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              Veja nossos torneios passados.
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              @feitoComCarinho
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Inspire-se com os seus próprios filhos e venha torcer por eles, em um espaço e momento acolhedor, ao mesmo tempo de conquistas.
            </p>
          </motion.div>

          {/* Instagram Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {instagramImages.map((image, index) => (
              <motion.a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <img
                  src={image}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 md:py-28">
        <div className="container-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="relative aspect-[4/5] overflow-hidden group"
            >
              <img
                src={featuredCollection.heroImage || featuredCollection.image}
                alt={featuredCollection.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="md:py-12"
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Apoio
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[0.95]">
                Patrocinadora ouro do evento.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                Uma parceria de longa data.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase btn-premium"
              >
                <Link to={`/#`}>
                  ⭐⭐⭐⭐⭐
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 md:py-28">
        <div className="container-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="relative aspect-[4/5] overflow-hidden group"
            >
              <img
                src={featuredCollection.heroImage || featuredCollection.image}
                alt={featuredCollection.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="md:py-12"
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Organização
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[0.95]">
                Professor <br> Wagner Vortmann
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                Juntos somos mais fortes.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase btn-premium"
              >
                <Link to={`/#`}>
                  👑👑👑👑👑
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
