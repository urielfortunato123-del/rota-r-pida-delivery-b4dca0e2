import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Termos = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 overflow-x-hidden">
      <div className="container max-w-3xl px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>

        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-2 break-words">
          Termos de <span className="text-gradient">Uso</span>
        </h1>
        <p className="text-xs text-muted-foreground mb-8">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              1. Sobre o serviço
            </h2>
            <p className="break-words">
              O RotaRápida é uma plataforma de logística sob demanda que conecta
              estabelecimentos (restaurantes, farmácias, pizzarias, padarias) a
              motoboys autônomos. Não somos um marketplace e não intermediamos
              a venda de produtos.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              2. Cadastro
            </h2>
            <p className="break-words">
              Ao se cadastrar, você declara que as informações fornecidas são
              verdadeiras e que possui idade legal para contratar o serviço. O
              uso indevido pode resultar em suspensão imediata.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              3. Valores e pagamento
            </h2>
            <p className="break-words">
              Empresas pagam <strong className="text-foreground">R$ 50/mês</strong>{" "}
              pelo acesso à rede de motoboys. Motoboys recebem{" "}
              <strong className="text-foreground">R$ 25 por dia trabalhado</strong>{" "}
              em indicações aceitas. Valores e formas de pagamento podem ser
              ajustados mediante aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              4. Responsabilidades
            </h2>
            <ul className="list-disc list-inside space-y-1 break-words">
              <li>
                O motoboy é responsável pela entrega segura e pontual.
              </li>
              <li>
                A empresa é responsável por embalar adequadamente os produtos.
              </li>
              <li>
                O RotaRápida atua apenas como intermediário de logística.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              5. Cancelamento
            </h2>
            <p className="break-words">
              Você pode cancelar sua participação a qualquer momento, sem multa
              ou fidelidade. Não há contrato de longo prazo.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              6. Limitação de responsabilidade
            </h2>
            <p className="break-words">
              O RotaRápida não se responsabiliza por danos causados por mau uso
              da plataforma, atrasos decorrentes de trânsito, condições
              climáticas ou problemas externos ao serviço de indicação.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              7. Alterações
            </h2>
            <p className="break-words">
              Estes termos podem ser atualizados a qualquer momento. A versão
              vigente sempre estará disponível nesta página.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              8. Foro
            </h2>
            <p className="break-words">
              Fica eleito o foro da comarca do administrador do RotaRápida para
              dirimir quaisquer questões relacionadas a estes termos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Termos;
