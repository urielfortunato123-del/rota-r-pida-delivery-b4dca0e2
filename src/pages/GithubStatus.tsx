import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ExternalLink, Github, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CheckKey = "connected" | "repo" | "branch";

interface CheckState {
  connected: boolean;
  repo: string;
  branch: string;
  checks: Record<CheckKey, boolean>;
}

const STORAGE_KEY = "rotarapida:github-status";

const defaultState: CheckState = {
  connected: false,
  repo: "",
  branch: "main",
  checks: { connected: false, repo: false, branch: false },
};

const GithubStatus = () => {
  const [state, setState] = useState<CheckState>(defaultState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const toggle = (key: CheckKey) =>
    setState((s) => ({ ...s, checks: { ...s.checks, [key]: !s.checks[key] } }));

  const reset = () => setState(defaultState);

  const allOk =
    state.checks.connected && state.checks.repo && state.checks.branch && !!state.repo.trim();

  const repoUrl = state.repo.trim()
    ? `https://github.com/${state.repo.trim().replace(/^https?:\/\/github\.com\//, "")}`
    : "";
  const commitsUrl = repoUrl ? `${repoUrl}/commits/${state.branch || "main"}` : "";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <div className="flex items-center gap-3 mb-2">
          <Github className="text-primary" size={28} aria-hidden="true" />
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Status do GitHub</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Use este checklist para verificar se a sincronização do projeto com o GitHub está
          configurada corretamente.
        </p>

        {/* Resumo */}
        <div
          className={`rounded-lg border p-4 mb-8 flex items-start gap-3 ${
            allOk
              ? "border-primary/40 bg-primary/5"
              : "border-amber-500/40 bg-amber-500/5"
          }`}
          role="status"
          aria-live="polite"
        >
          {allOk ? (
            <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} aria-hidden="true" />
          ) : (
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} aria-hidden="true" />
          )}
          <div className="text-sm">
            <p className="font-medium">
              {allOk ? "Tudo verificado!" : "Verificação pendente"}
            </p>
            <p className="text-muted-foreground">
              {allOk
                ? "Seu projeto deve estar sincronizando normalmente com o GitHub."
                : "Marque cada item abaixo após confirmar na interface da Lovable."}
            </p>
          </div>
        </div>

        <ol className="space-y-6">
          {/* 1 - Conectado */}
          <li className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggle("connected")}
                className="mt-0.5"
                aria-label="Marcar item: GitHub conectado"
              >
                {state.checks.connected ? (
                  <CheckCircle2 className="text-primary" size={22} />
                ) : (
                  <Circle className="text-muted-foreground" size={22} />
                )}
              </button>
              <div className="flex-1">
                <h2 className="font-heading text-lg font-semibold">
                  1. GitHub está conectado?
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Abra <strong>Connectors → GitHub</strong> na barra lateral (desktop) ou via
                  botão <strong>...</strong> no canto inferior direito (mobile) e verifique se
                  o status aparece como conectado.
                </p>
                <a
                  href="https://docs.lovable.dev/integrations/github"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                >
                  Documentação <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </li>

          {/* 2 - Repo */}
          <li className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggle("repo")}
                className="mt-0.5"
                aria-label="Marcar item: repositório selecionado"
              >
                {state.checks.repo ? (
                  <CheckCircle2 className="text-primary" size={22} />
                ) : (
                  <Circle className="text-muted-foreground" size={22} />
                )}
              </button>
              <div className="flex-1">
                <h2 className="font-heading text-lg font-semibold">
                  2. Qual repositório está selecionado?
                </h2>
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  Cole abaixo o repositório no formato <code>usuario/repo</code> mostrado em
                  Connectors → GitHub.
                </p>
                <Label htmlFor="repo" className="sr-only">
                  Repositório
                </Label>
                <Input
                  id="repo"
                  placeholder="usuario/rotarapida"
                  value={state.repo}
                  onChange={(e) => setState((s) => ({ ...s, repo: e.target.value }))}
                />
                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                  >
                    Abrir no GitHub <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </li>

          {/* 3 - Branch */}
          <li className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggle("branch")}
                className="mt-0.5"
                aria-label="Marcar item: branch verificada"
              >
                {state.checks.branch ? (
                  <CheckCircle2 className="text-primary" size={22} />
                ) : (
                  <Circle className="text-muted-foreground" size={22} />
                )}
              </button>
              <div className="flex-1">
                <h2 className="font-heading text-lg font-semibold">
                  3. Em qual branch os commits estão indo?
                </h2>
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  A Lovable envia commits para a branch padrão do repositório (geralmente{" "}
                  <code>main</code>).
                </p>
                <Label htmlFor="branch" className="sr-only">
                  Branch
                </Label>
                <Input
                  id="branch"
                  placeholder="main"
                  value={state.branch}
                  onChange={(e) => setState((s) => ({ ...s, branch: e.target.value }))}
                />
                {commitsUrl && (
                  <a
                    href={commitsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                  >
                    Ver commits desta branch <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </li>
        </ol>

        <div className="flex flex-wrap gap-3 mt-8">
          <Button variant="outline" onClick={reset} className="gap-2">
            <RefreshCw size={16} aria-hidden="true" /> Limpar checklist
          </Button>
          <Button asChild variant="ghost">
            <Link to="/">Voltar para o início</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GithubStatus;
