import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacidade = () => {
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
          Política de <span className="text-gradient">Privacidade</span>
        </h1>
        <p className="text-xs text-muted-foreground mb-8">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              1. Quais dados coletamos
            </h2>
            <p className="break-words">
              Coletamos apenas as informações necessárias para conectar
              restaurantes a motoboys: nome, telefone, e-mail, endereço e dados
              do estabelecimento ou do veículo. Não pedimos nem armazenamos
              senhas de terceiros.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              2. Como usamos seus dados
            </h2>
            <p className="break-words">
              Os dados são usados exclusivamente para indicar o motoboy mais
              próximo, processar o cadastro e enviar avisos via WhatsApp sobre
              corridas e oportunidades. Não vendemos nem compartilhamos seus
              dados com terceiros para fins de marketing.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              3. Localização
            </h2>
            <p className="break-words">
              Solicitamos a localização do motoboy apenas no momento do
              cadastro, para definir a zona de atuação. Você pode revogar essa
              permissão a qualquer momento nas configurações do navegador.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              4. Cookies e armazenamento local
            </h2>
            <p className="break-words">
              Utilizamos armazenamento local do navegador (localStorage) para
              guardar preferências e métricas de uso. Esses dados ficam apenas
              no seu dispositivo.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              5. Seus direitos (LGPD)
            </h2>
            <p className="break-words">
              Você pode solicitar a qualquer momento a consulta, correção ou
              exclusão dos seus dados, conforme a Lei Geral de Proteção de
              Dados (Lei 13.709/2018). Basta entrar em contato pelo WhatsApp do
              administrador.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              6. Contato
            </h2>
            <p className="break-words">
              Para dúvidas sobre privacidade, entre em contato pelos canais
              oficiais do RotaRápida.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacidade;
