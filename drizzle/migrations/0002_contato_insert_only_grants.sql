REVOKE ALL ON TABLE public.contato FROM anon, authenticated, PUBLIC;
GRANT INSERT ON TABLE public.contato TO anon, authenticated;
GRANT ALL ON TABLE public.contato TO service_role;
ALTER TABLE public.contato ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contato FORCE ROW LEVEL SECURITY;