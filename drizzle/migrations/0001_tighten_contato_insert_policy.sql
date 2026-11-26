DROP POLICY IF EXISTS "Qualquer pessoa pode enviar contato" ON public.contato;
CREATE POLICY "Qualquer pessoa pode enviar contato valido" ON public.contato
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(nome)) BETWEEN 1 AND 100
  AND length(btrim(mensagem)) BETWEEN 1 AND 2000
  AND (email IS NULL OR (length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  AND (telefone IS NULL OR length(telefone) <= 30)
  AND created_at >= now() - interval '5 minutes'
  AND created_at <= now() + interval '5 minutes'
);