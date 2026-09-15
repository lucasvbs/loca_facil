import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  Handshake,
  HardHat,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  ShieldCheck,
  Truck,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import logo from '@assets/locafacil_1789436696195.jpeg';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();
const WHATSAPP_URL =
  'https://wa.me/5561999853838?text=Olá%20Anderson%2C%20vim%20pelo%20site%20da%20Loca%20Fácil%20e%20quero%20pedir%20um%20orçamento';

const navItems = [
  { label: 'A solução', href: '#solucao' },
  { label: 'Frota', href: '#frota' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Dúvidas', href: '#duvidas' },
];

const benefits = [
  {
    icon: <Truck size={19} />,
    title: 'Frota própria',
    description: 'Você não fica esperando terceiro liberar máquina.',
  },
  {
    icon: <MessageCircle size={19} />,
    title: 'Atendimento direto',
    description: 'Resposta rápida, sem central genérica no caminho.',
  },
  {
    icon: <Clock3 size={19} />,
    title: 'Locação sob medida',
    description: 'Você paga pelo que a sua obra realmente precisa.',
  },
  {
    icon: <HardHat size={19} />,
    title: 'Uma operação completa',
    description: 'Terraplanagem, escavação e transporte com uma só conversa.',
  },
  {
    icon: <Wrench size={19} />,
    title: 'Com ou sem operador',
    description: 'Flexibilidade para a sua equipe e o seu jeito de trabalhar.',
  },
  {
    icon: <MapPin size={19} />,
    title: 'DF e entorno',
    description: 'Atendimento na região sem depender de locadora de fora.',
  },
];

const faqs = [
  {
    question: 'Preciso de operador ou vocês fornecem?',
    answer:
      'A locação pode ser feita com ou sem operador. Você fala a necessidade da obra e o orçamento já sai no formato que faz sentido para sua equipe.',
  },
  {
    question: 'Vocês atendem em que regiões do DF e entorno?',
    answer:
      'A LOCA FÁCIL atende obras no Distrito Federal e cidades do entorno. Envie a localização no WhatsApp para confirmarmos a logística e o frete.',
  },
  {
    question: 'Quanto tempo demora entre o pedido e a máquina chegar?',
    answer:
      'A disponibilidade é confirmada direto com Anderson. Com escopo, local e prazo alinhados, combinamos a saída da máquina sem depender de repasse.',
  },
  {
    question: 'Dá para locar por poucos dias ou só contrato longo?',
    answer:
      'O orçamento é sob medida para o tipo de serviço e o período que a sua obra precisa. Mande a demanda e alinhamos a melhor condição.',
  },
  {
    question: 'E se eu precisar estender o prazo no meio da obra?',
    answer:
      'É só avisar pelo mesmo canal de atendimento. A extensão depende da agenda da frota e é alinhada diretamente, sem central terceirizada.',
  },
];

function WhatsAppButton({
  children,
  className = '',
  testId,
}: {
  children: ReactNode;
  className?: string;
  testId: string;
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className={`btn btn-primary ${className}`}
      data-testid={testId}
      aria-label="Chamar Anderson no WhatsApp"
    >
      <MessageCircle size={17} strokeWidth={2.5} />
      {children}
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container-loca header-inner">
        <a href="#inicio" className="header-logo" data-testid="link-logo">
          <span className="header-logo-image">
            <img src={logo} alt="LOCA FÁCIL" />
          </span>
          <span>
            <span className="header-logo-copy">
              LOCA <span>FÁCIL</span>
            </span>
            <span className="header-logo-sub">locações • transportes • serviços</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton className="header-cta" testId="link-header-whatsapp">
          Falar agora
        </WhatsAppButton>
        <button
          type="button"
          className="mobile-menu"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-panel" aria-label="Navegação móvel">
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
              data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mobile-cta"
            data-testid="link-mobile-whatsapp"
          >
            Chamar no WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

function LocaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'LOCA FÁCIL — A máquina chega rápido';
    const description =
      'Escavadeira, retroescavadeira e caminhão caçamba para sua obra no DF e entorno. Frota própria e atendimento direto com Anderson.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="loca-page">
      <Header />
      <section className="hero" id="inicio">
        <div className="hero-glow" />
        <div className="container-loca hero-grid">
          <div>
            <div className="eyebrow hero-kicker hero-animate">Locação de máquinas pesadas · DF e entorno</div>
            <h1 className="hero-animate">
              Sua obra não pode esperar.
              <strong> A máquina chega rápido.</strong>
            </h1>
            <p className="hero-support hero-animate-delay">
              Escavadeira, retroescavadeira e caminhão caçamba prontos pra sua obra no DF e entorno. Frota própria,
              atendimento direto, sem intermediário.
            </p>
            <div className="hero-actions hero-animate-delay">
              <div className="action-wrap">
                <WhatsAppButton testId="link-hero-whatsapp">Chamar no WhatsApp</WhatsAppButton>
                <span className="action-note">Resposta rápida • Sem compromisso</span>
              </div>
              <div className="action-wrap">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  data-testid="link-hero-budget"
                >
                  Pedir orçamento agora <ArrowDownRight size={17} />
                </a>
                <span className="action-note">Atendimento direto com Anderson</span>
              </div>
            </div>
            <div className="hero-detail hero-animate-delay">
              <span className="hero-detail-line" />
              Atendimento direto com Anderson · (61) 9 9985-3838
            </div>
          </div>
          <div className="hero-visual hero-animate-delay">
            <div className="hero-logo-frame">
              <img src={logo} alt="Logo LOCA FÁCIL com escavadeira, caminhão e retroescavadeira" />
            </div>
            <div className="hero-visual-label">
              <Zap size={17} fill="currentColor" /> Sem enrolação
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <span /> role para ver a operação <span />
        </div>
      </section>

      <div className="ticker" aria-label="Serviços LOCA FÁCIL">
        <div className="ticker-track">
          {[...Array(2)].flatMap(() => ['escavação', 'terraplanagem', 'transporte', 'frota própria', 'DF e entorno']).map((item, index) => (
            <span className="ticker-item" key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="pain section-pad" id="problema">
        <div className="container-loca pain-layout">
          <div className="pain-art reveal">
            <div className="pain-art-number">01</div>
            <div className="pain-art-title">Cronograma não espera máquina.</div>
            <div className="pain-art-note">sinal vermelho<br />na obra</div>
          </div>
          <div className="pain-copy reveal reveal-delay-1">
            <span className="eyebrow">O problema é agora</span>
            <h2 className="section-title">Quem toca obra sabe: <em>máquina parada</em> é dinheiro escorrendo.</h2>
            <p className="body-copy">
              Obra parada por falta de máquina é prejuízo todo dia que passa. Diária de equipe parada, prazo de
              entrega estourando, cliente cobrando.
            </p>
            <div className="pain-list">
              {[
                'Você já perdeu prazo esperando uma locadora responder?',
                'Já negociou com três empresas até descobrir quem tinha disponibilidade?',
                'Já ficou na dúvida se o equipamento aguentava o serviço até dar problema?',
                'Já sentiu que o cronograma dependia de alguém que nem atendia o telefone?',
              ].map((item, index) => (
                <div className="pain-item" key={item} data-testid={`text-pain-point-${index}`}>
                  <CircleCheck size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="solution section-pad" id="solucao">
        <div className="container-loca solution-layout">
          <div className="reveal">
            <span className="eyebrow">A resposta</span>
            <h2 className="section-title">Frota própria. <em>Conversa direta.</em> Obra andando.</h2>
            <p className="solution-intro">
              A LOCA FÁCIL não terceiriza, não depende de repasse. Máquina disponível de verdade, atendimento direto
              com quem toca a operação.
            </p>
            <div className="solution-quote">
              “Você fala, alinha o prazo e o equipamento — e a máquina segue pra obra.”
            </div>
          </div>
          <div className="benefit-grid reveal reveal-delay-1">
            {benefits.map((benefit, index) => (
              <article className="benefit" key={benefit.title} data-testid={`card-benefit-${index}`}>
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fleet section-pad" id="frota">
        <div className="container-loca">
          <div className="fleet-head reveal">
            <div>
              <span className="eyebrow">O que resolve sua demanda</span>
              <h2 className="section-title">A máquina certa para o <em>trabalho certo.</em></h2>
            </div>
            <p>Uma conversa. Um orçamento sob medida. O equipamento que a sua frente de serviço precisa.</p>
          </div>
          <div className="fleet-grid">
            <article className="fleet-card reveal" data-testid="card-fleet-escavadeira">
              <span className="fleet-number">01 / MOVIMENTO DE TERRA</span>
              <div className="machine-graphic" aria-hidden="true">
                <span className="m-body" /><span className="m-cab" /><span className="m-arm" /><span className="m-wheel" />
              </div>
              <Truck className="fleet-machine" size={28} />
              <h3>Escavadeira</h3>
              <p>Para escavação, limpeza, corte e terraplanagem.</p>
              <span className="card-arrow"><ArrowRight size={18} /></span>
            </article>
            <article className="fleet-card reveal reveal-delay-1" data-testid="card-fleet-retro">
              <span className="fleet-number">02 / VERSATILIDADE</span>
              <div className="machine-graphic" aria-hidden="true">
                <span className="m-body" /><span className="m-cab" /><span className="m-arm" /><span className="m-wheel" />
              </div>
              <Wrench className="fleet-machine" size={28} />
              <h3>Retroescavadeira</h3>
              <p>Agilidade para preparar, abrir e resolver no canteiro.</p>
              <span className="card-arrow"><ArrowRight size={18} /></span>
            </article>
            <article className="fleet-card reveal reveal-delay-2" data-testid="card-fleet-cacamba">
              <span className="fleet-number">03 / LOGÍSTICA</span>
              <div className="machine-graphic" aria-hidden="true">
                <span className="m-body" /><span className="m-cab" /><span className="m-arm" /><span className="m-wheel" />
              </div>
              <Truck className="fleet-machine" size={28} />
              <h3>Caminhão caçamba</h3>
              <p>Transporte de terra, entulho e material sem travar a frente.</p>
              <span className="card-arrow"><ArrowRight size={18} /></span>
            </article>
          </div>
          <div className="reveal" style={{ marginTop: 35, textAlign: 'center' }}>
            <WhatsAppButton testId="link-fleet-whatsapp">Pedir orçamento da frota</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="process section-pad" id="como-funciona">
        <div className="container-loca process-layout">
          <div className="reveal">
            <span className="eyebrow">Sem central no caminho</span>
            <h2 className="section-title">Do WhatsApp para a <em>obra.</em></h2>
            <p className="process-intro">
              Você manda a necessidade. A LOCA FÁCIL entende o serviço e monta a conta certa — sem tabela fechada,
              porque cada obra tem uma demanda.
            </p>
          </div>
          <div className="process-steps reveal reveal-delay-1">
            <article className="process-step" data-testid="step-process-1">
              <span className="step-number">01</span>
              <div>
                <h3>Você manda a necessidade</h3>
                <p>Tipo de serviço, prazo e local da obra. Pode ser por texto ou áudio no WhatsApp.</p>
              </div>
            </article>
            <article className="process-step" data-testid="step-process-2">
              <span className="step-number">02</span>
              <div>
                <h3>A gente monta o orçamento</h3>
                <p>Equipamento, período, operador e frete entram na conta sob medida, sem letra miúda.</p>
              </div>
            </article>
            <article className="process-step" data-testid="step-process-3">
              <span className="step-number">03</span>
              <div>
                <h3>Máquina segue pra obra</h3>
                <p>Valor e prazo alinhados? A frota e o operador, se precisar, seguem para o seu canteiro.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="objections section-pad" id="duvidas">
        <div className="container-loca">
          <div className="objections-head reveal">
            <div>
              <span className="eyebrow">Antes de chamar</span>
              <h2 className="section-title">Dúvida justa. <em>Resposta direta.</em></h2>
            </div>
            <p>O que você precisa saber para colocar a máquina em movimento sem surpresa.</p>
          </div>
          <div className="faq-list reveal reveal-delay-1">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className={`faq-item ${isOpen ? 'open' : ''}`} key={faq.question}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    data-testid={`button-faq-${index}`}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <Plus className="faq-icon" size={21} /> : <ChevronDown className="faq-icon" size={21} />}
                  </button>
                  <div className="faq-answer" aria-hidden={!isOpen}>{faq.answer}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="guarantee">
        <div className="container-loca guarantee-layout">
          <div className="guarantee-stamp" aria-label="Escopo alinhado">
            <span><ShieldCheck size={23} /><br />ESCOPO<br />ALINHADO</span>
          </div>
          <div className="reveal">
            <span className="eyebrow" style={{ color: '#fff' }}>O combinado é o combinado</span>
            <h2 className="section-title">Você sabe o que está contratando antes de a máquina sair.</h2>
            <p>
              Escopo alinhado, prazo claro e valor combinado. Sem letra miúda no meio do serviço — do primeiro contato
              à entrega na obra.
            </p>
          </div>
        </div>
      </section>

      <section className="final-cta" id="orcamento">
        <div className="container-loca">
          <div className="final-content reveal">
            <span className="eyebrow">A próxima frente começa agora</span>
            <h2 className="section-title">Obra não espera. <em>Fala com a gente.</em></h2>
            <p className="final-copy">
              Frota própria, resposta rápida, orçamento sob medida — fala agora com a LOCA FÁCIL e resolve a máquina
              hoje.
            </p>
            <div className="final-actions">
              <WhatsAppButton testId="link-final-whatsapp">Chamar no WhatsApp</WhatsAppButton>
              <div className="final-phone">
                Atendimento direto com Anderson
                <strong>(61) 9 9985-3838</strong>
              </div>
            </div>
            <p className="ps-line">
              <strong>PS:</strong> Cada dia de obra parada por falta de máquina é prejuízo que não volta. Com frota
              própria e atendimento direto, a LOCA FÁCIL resolve rápido.
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container-loca footer-inner">
          <span>© {new Date().getFullYear()} LOCA FÁCIL · LOCAÇÕES • TRANSPORTES • SERVIÇOS</span>
          <a className="footer-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-testid="link-footer-whatsapp">
            DF e entorno · pedir orçamento <Phone size={12} style={{ verticalAlign: 'middle', marginLeft: 5 }} />
          </a>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chamar no WhatsApp"
        data-testid="link-floating-whatsapp"
      >
        <MessageCircle size={25} strokeWidth={2.3} />
      </a>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={LocaPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;