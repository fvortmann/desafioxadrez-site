import { Layout } from "@/components/Layout";

type InstitutionalPageProps = {
  title: string;
  description: string;
};

const InstitutionalPage = ({ title, description }: InstitutionalPageProps) => (
  <Layout>
    <section className="container-full min-h-[60svh] py-20 md:py-28">
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
        {title}
      </h1>
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
        {description}
      </p>
    </section>
  </Layout>
);

export default InstitutionalPage;