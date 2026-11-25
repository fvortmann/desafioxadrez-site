CREATE TABLE public.contato (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL CHECK (char_length(nome) BETWEEN 1 AND 100),
  email text CHECK (email IS NULL OR char_length(email) <= 255),
  telefone text CHECK (telefone IS NULL OR char_length(telefone) <= 30),
  mensagem text NOT NULL CHECK (char_length(mensagem) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contato TO anon, authenticated;
GRANT ALL ON public.contato TO service_role;
ALTER TABLE public.contato ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Qualquer pessoa pode enviar contato" ON public.contato FOR INSERT TO anon, authenticated WITH CHECK (true);