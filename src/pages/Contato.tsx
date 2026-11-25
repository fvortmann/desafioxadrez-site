import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "552182320002";
const PHONE_DISPLAY = "(21) 8232-0002";
const EMAIL = "a definir";
const HOURS = "a definir";

const schema = z.object({
  nome: z.string().trim().min(1, "Informe seu nome").max(100),
  email: z.union([z.literal(""), z.string().trim().email("E-mail inválido").max(255)]),
  telefone: z.string().trim().max(30),
  mensagem: z.string().trim().min(1, "Escreva sua mensagem").max(2000),
});

const empty = { nome: "", email: "", telefone: "", mensagem: "" };

const Contato = () => {
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSending(true);
    const d = parsed.data;
    const { error } = await supabase.from("contato").insert({
      nome: d.nome,
      email: d.email || null,
      telefone: d.telefone || null,
      mensagem: d.mensagem,
    });
    setSending(false);
    if (error) {
      toast.error("Não foi possível enviar. Tente novamente.");
      return;
    }
    toast.success("Mensagem enviada com sucesso!");
    setForm(empty);
  };

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de informações sobre o Desafio de Xadrez.")}`;

  return (
    <Layout>
      <section className="container-full py-16 md:py-24">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-10">CONTATO</h1>
        <div className="grid gap-10 lg:grid-cols-3">
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input id="nome" required maxLength={100} value={form.nome} onChange={set("nome")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" maxLength={255} value={form.email} onChange={set("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" type="tel" maxLength={30} value={form.telefone} onChange={set("telefone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem *</Label>
              <Textarea id="mensagem" required rows={5} maxLength={2000} value={form.mensagem} onChange={set("mensagem")} />
            </div>
            <Button type="submit" disabled={sending} className="w-full">
              {sending ? "Enviando..." : "Enviar"}
            </Button>
          </form>

          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <MessageCircle className="h-40 w-40 text-primary" strokeWidth={1.2} aria-label="WhatsApp" />
            <Button asChild size="lg">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">Enviar Mensagem via WhatsApp</a>
            </Button>
          </div>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary shrink-0" />
              <div><p className="font-semibold">E-mail</p><p className="text-muted-foreground">{EMAIL}</p></div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary shrink-0" />
              <div><p className="font-semibold">Telefone</p><p className="text-muted-foreground">{PHONE_DISPLAY}</p></div>
            </li>
            <li className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary shrink-0" />
              <div><p className="font-semibold">Horário de atendimento</p><p className="text-muted-foreground">{HOURS}</p></div>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
