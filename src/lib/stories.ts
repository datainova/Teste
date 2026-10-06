// Hero narratives: four efforts and one reward. Every visit draws a different one,
// because everyone earns their Friday on a different day and in a different way.

export type StepKind = "treino" | "trabalho" | "constancia" | "recompensa";
export type Step = { kind: StepKind; title: string; line: string };
export type Story = Step[];

export const STEP_LABEL: Record<StepKind, { label: string; eyebrow: string }> = {
  treino: { label: "Treino", eyebrow: "Disciplina" },
  trabalho: { label: "Trabalho", eyebrow: "Execução" },
  constancia: { label: "Constância", eyebrow: "Constância" },
  recompensa: { label: "Recompensa", eyebrow: "Recompensa" },
};

type Raw = [StepKind, string, string];
const t = (title: string, line: string): Raw => ["treino", title, line];
const w = (title: string, line: string): Raw => ["trabalho", title, line];
const c = (title: string, line: string): Raw => ["constancia", title, line];
const r = (title: string, line: string): Raw => ["recompensa", title, line];

const RAW: Raw[][] = [
  [
    t("05:30.", "Treino antes do sol. Ninguém viu. Nem precisava."),
    w("09:00.", "Meta, reunião, entrega. Uma atrás da outra."),
    t("19:00.", "Do trabalho direto pro treino. O corpo cobra, a cabeça agradece."),
    c("Dia 15.", "Constância não é sofrimento. É escolha."),
    r("Terça, 21h.", "Um vinho. Uma mesa boa. Isso é sexta-feira."),
  ],
  [
    t("06:00.", "10 km no escuro. Só você e o pace."),
    w("08:30.", "Café, planilha, decisão difícil. Resolvido."),
    w("16:00.", "A apresentação que tirava seu sono. Aprovada."),
    c("Semana 8.", "Oito semanas sem pular um treino."),
    r("Quinta, 19h.", "Chopp gelado com quem torceu por você. Friday feeling."),
  ],
  [
    c("Mês 11.", "Onze meses guardando, planejando, ralando."),
    w("07:00.", "Primeira reunião antes do trânsito acordar."),
    t("12:30.", "Almoço rápido e treino de força no intervalo."),
    w("23:00.", "Último e-mail respondido. Mala pronta."),
    r("Sexta, 06h.", "Aeroporto. Passagem paga com o próprio esforço. Isso é sexta-feira."),
  ],
  [
    c("Semana 16.", "Dezesseis semanas de planilha. Sem atalho."),
    t("04:45.", "Dia de prova. Frio na barriga, mão firme."),
    t("Km 38.", "A cabeça pede pra parar. As pernas obedecem você."),
    t("Chegada.", "Medalha no peito. Olho marejado."),
    r("Domingo, 16h.", "Pé na areia e água de coco. Friday feeling."),
  ],
  [
    w("08:00.", "Caixa de entrada cheia. Caixa de entrada zerada."),
    t("12:00.", "Natação no almoço. 2 km, cabeça limpa."),
    w("15:00.", "Cliente difícil. Solução simples. Contrato fechado."),
    c("Dia 22.", "Vinte e dois dias de rotina. Ninguém aplaude. Você sabe."),
    r("Quarta, 20h.", "Cinema, pipoca e celular no modo avião. Isso é sexta-feira."),
  ],
  [
    t("05:00.", "Bike. 80 km enquanto a cidade dorme."),
    w("09:00.", "Semana de fechamento. Números batidos."),
    t("18:30.", "Corrida leve, zona 2. Constância é isso."),
    c("Semana 20.", "Vinte semanas sem negociar com a preguiça."),
    r("Sábado, 13h.", "Churrasco com a família, sem olhar o relógio. Friday feeling."),
  ],
  [
    w("Sábado.", "Dia de lançamento. Todo mundo de folga, menos você."),
    w("Domingo.", "Ajusta, testa, ajusta de novo. No ar."),
    t("06:00.", "Mesmo assim, treino feito. Disciplina não tira folga."),
    c("Dia 12.", "Doze dias direto. Valeu cada um."),
    r("Segunda, 15h.", "Folga no meio da semana e uma rede na varanda. Isso é sexta-feira."),
  ],
  [
    t("06:15.", "Treino de força. Mais um quilo na barra."),
    w("10:00.", "Reunião com a diretoria. Você preparado, eles convencidos."),
    w("17:30.", "Avaliação do ano: acima da meta."),
    c("Ano 3.", "Três anos construindo. Tijolo por tijolo."),
    r("Sexta, 20h.", "Jantar a dois, sem pressa e sem notificação. Friday feeling."),
  ],
  [
    t("05:20.", "Mar flat? Remada mesmo assim."),
    w("08:00.", "Do mar direto pro trabalho. Cabelo molhado, cabeça leve."),
    w("18:00.", "Projeto entregue no prazo. Com folga."),
    c("Dia 30.", "Trinta dias seguidos de mar antes do expediente."),
    r("Quinta, 17h.", "Saiu mais cedo. Pôr do sol em cima da prancha. Isso é sexta-feira."),
  ],
  [
    t("06:30.", "Yoga. Respirar também é treino."),
    w("09:00.", "Dez reuniões. Nenhuma paciência perdida."),
    t("19:30.", "Funcional pesado. Suor que lava o dia."),
    c("Semana 6.", "Seis semanas cuidando do corpo como você cuida da carreira."),
    r("Terça, 21h.", "Sauna, banho quente, cama cedo. Descanso também faz parte do plano."),
  ],
  [
    w("07:30.", "Planejamento do trimestre. Tudo no lugar."),
    t("12:15.", "Corrida no almoço. 6 km, 30 minutos, sem desculpa."),
    w("14:00.", "A negociação que travava há meses. Destravada."),
    c("Dia 18.", "Dezoito dias riscando a lista."),
    r("Sábado, 22h.", "Show da banda favorita e a voz rouca no fim. Friday feeling."),
  ],
  [
    t("05:45.", "Natação. 3 km, uma braçada de cada vez."),
    w("08:30.", "Equipe alinhada. Meta clara. Bora."),
    t("19:00.", "Bike no rolo. Chuva lá fora, constância aqui dentro."),
    c("Mês 4.", "Quatro meses sem faltar um treino."),
    r("Domingo, 07h.", "Trilha, cachoeira e silêncio. Isso é sexta-feira."),
  ],
  [
    t("06:00.", "Crossfit. Ontem o treino venceu. Hoje não."),
    w("09:30.", "Primeiro cliente do dia. Primeiro sim do dia."),
    w("16:00.", "Relatório entregue antes do prazo. Respira."),
    c("Dia 40.", "Quarenta dias de rotina. Já virou quem você é."),
    r("Quarta, 20h30.", "Pizza com os amigos. Duas fatias, nem uma a mais. Friday feeling."),
  ],
  [
    w("Dia 1.", "Começo de projeto. Página em branco."),
    w("Dia 9.", "Noite adentro. Café, foco e mais uma versão."),
    t("05:30.", "Mesmo cansado, corrida feita."),
    c("Dia 14.", "Projeto no ar. Duas semanas que valeram um mês."),
    r("Sexta, 14h.", "Massagem, almoço demorado e a tarde livre. Isso é sexta-feira."),
  ],
  [
    t("06:00.", "Treino intervalado. Oito tiros de 400. Doeu. Feito."),
    w("08:00.", "Plantão longo. Muita gente dependendo de você."),
    w("20:00.", "Plantão encerrado. Missão cumprida."),
    c("Semana 10.", "Dez semanas equilibrando escala e treino."),
    r("Domingo, 16h.", "Arquibancada, camisa do time, grito de gol. Friday feeling."),
  ],
  [
    t("06:30.", "Beach tennis antes do expediente. Areia no tênis, sorriso no rosto."),
    w("09:00.", "Meta do mês batida no dia 20."),
    w("15:00.", "Treinando o time novo. Ensinando o que aprendeu."),
    c("Mês 7.", "Sete meses de constância. O corpo agradece."),
    r("Quinta, 18h.", "Pôr do sol na orla e uma caipirinha. Isso é sexta-feira."),
  ],
  [
    c("Semana 1.", "Planilha nova. Sem pular etapa."),
    t("05:30.", "Longão. 21 km antes do café."),
    w("11:00.", "Proposta enviada. Coração na mão."),
    w("17:00.", "Proposta aceita."),
    r("Sexta, 19h.", "Estrada pra serra, fondue e lareira. Friday feeling."),
  ],
  [
    t("06:00.", "Musculação. Série, descanso, série."),
    w("08:00.", "Trabalho de dia, estudo de noite."),
    w("22:00.", "Último trabalho da pós entregue."),
    c("Ano 2.", "Dois anos estudando depois do expediente."),
    r("Sábado, 10h.", "Café na padaria, livro novo, nenhum compromisso. Isso é sexta-feira."),
  ],
  [
    w("07:00.", "Loja aberta antes de todo mundo."),
    t("13:00.", "Treino rápido entre um cliente e outro."),
    w("19:00.", "Caixa fechado. Melhor mês desde que abriu."),
    c("Ano 1.", "Um ano de empresa. Ninguém disse que seria fácil."),
    r("Sábado, 21h.", "Festa de um ano com quem ajudou a construir. Friday feeling."),
  ],
  [
    t("05:00.", "Águas abertas. Um frio que acorda a alma."),
    w("09:00.", "Fechamento de semestre. Tudo entregue."),
    c("Mês 6.", "Seis meses de foco total."),
    w("18:00.", "Status: ausente até segunda ordem."),
    r("Quarta, 10h.", "Mergulho em água azul, celular na mala. Isso é sexta-feira."),
  ],
  [
    t("06:00.", "Pedal com o grupo. 60 km e café na padaria no fim."),
    w("08:30.", "Reunião às 8h30, às 10h, às 11h, às 14h…"),
    w("18:00.", "Decisão difícil tomada. Equipe junto."),
    c("Dia 21.", "Dizem que 21 dias formam um hábito. Você já passou disso."),
    r("Terça, 22h.", "Bar de jazz e uma taça de tinto. Friday feeling."),
  ],
  [
    t("05:30.", "Treino antes da casa acordar."),
    w("07:00.", "Lancheira, escola, reunião. Malabarismo diário."),
    w("17:00.", "Entrega feita. Saída no horário, pela primeira vez no mês."),
    c("Semana 30.", "Trinta semanas conciliando tudo."),
    r("Quinta, 18h.", "Parque com as crianças e sorvete pra todo mundo. Isso é sexta-feira."),
  ],
  [
    t("06:00.", "Jiu-jitsu. Bater no tatame faz parte."),
    w("09:00.", "Problema novo, solução nova. Sempre."),
    t("19:00.", "Segundo treino. Faixa nova não vem sozinha."),
    c("Ano 4.", "Quatro anos de tatame. Quatro de carreira."),
    r("Sábado, 08h.", "Estrada vazia, janela aberta, playlist no máximo. Friday feeling."),
  ],
  [
    w("06:00.", "Acordou antes do despertador. Cabeça já no projeto."),
    t("07:00.", "Esteira inclinada, 45 minutos. Sem pular."),
    w("14:00.", "Pitch pra investidor. Voz firme."),
    c("Mês 9.", "Nove meses de não. Hoje, um sim."),
    r("Quarta, 20h.", "Menu degustação pra comemorar. Isso é sexta-feira."),
  ],
  [
    t("05:00.", "Treino de transição. Bike, corrida, bike, corrida."),
    w("08:00.", "Chefe de férias. Você no comando."),
    w("18:30.", "Semana entregue sem ninguém perceber que foi difícil."),
    c("Semana 12.", "Doze semanas de base. Agora vem a prova."),
    r("Sábado, 19h.", "Barraca, fogueira e céu estrelado. Friday feeling."),
  ],
  [
    t("06:00.", "Corrida debaixo de chuva. Foi mesmo assim."),
    w("09:00.", "O sistema caiu. Você levantou."),
    w("21:00.", "Tudo estável. Equipe liberada."),
    c("Dia 9.", "Nove dias de plantão em sequência."),
    r("Terça, 21h.", "Sofá, série boa e pipoca. Às vezes é só isso. E é sexta-feira."),
  ],
  [
    t("05:45.", "Remo. 5.000 metros de cabeça baixa."),
    w("08:00.", "Viagem a trabalho. Três cidades em dois dias."),
    w("19:00.", "Voo de volta. Relatório escrito no avião."),
    c("Semana 14.", "Catorze semanas de estrada e treino na academia do hotel."),
    r("Domingo, 13h.", "Almoço na casa da mãe. Repete o prato. Friday feeling."),
  ],
  [
    t("06:30.", "Pilates. A força que ninguém vê."),
    w("09:00.", "A planilha que não fechava. Fechou."),
    t("18:00.", "Corrida de 8 km pra descarregar."),
    c("Dia 25.", "Vinte e cinco dias de rotina. Leve, mas firme."),
    r("Sexta, 18h.", "Roda de samba, cerveja e amigos. Isso é sexta-feira."),
  ],
  [
    c("Semana 24.", "Vinte e quatro semanas de planilha pro 70.3."),
    t("1,9 km.", "Natação. Respira a cada três braçadas."),
    t("90 km.", "Bike. Vento contra, cabeça a favor."),
    t("21 km.", "Corrida. O corpo pede, a disciplina responde."),
    r("Domingo, 15h.", "Medalha no peito e hambúrguer na mão. Friday feeling."),
  ],
  [
    w("08:00.", "Primeiro dia no emprego novo. Mão suando."),
    t("06:00.", "No meio da mudança, o treino nunca faltou."),
    w("18:00.", "Primeira entrega elogiada pelo time."),
    c("Dia 90.", "Período de experiência: aprovado."),
    r("Quinta, 20h.", "Jantar com quem acreditou em você desde o começo. Isso é sexta-feira."),
  ],
];

export const STORIES: Story[] = RAW.map((s) => s.map(([kind, title, line]) => ({ kind, title, line })));

const PING_POOL = [
  "Treino concluído · 10 km",
  "7h12 de sono",
  "Meta do mês batida ✓",
  "Proposta aprovada",
  "Treino de força ✓",
  "Pace 5:10/km",
  "Apresentação entregue",
  "Natação · 2.000 m",
  "Contrato assinado",
  "Bike · 60 km",
  "Inbox zerada",
  "Novo recorde pessoal",
  "Feedback: acima da meta",
  "Yoga · 45 min",
  "Projeto no ar 🚀",
  "Hidratação em dia",
];

/** Eight achievement pings, rotated per story so they don't repeat between visits. */
export function pingsFor(storyIndex: number): string[] {
  return Array.from({ length: 8 }, (_, i) => PING_POOL[(storyIndex * 3 + i) % PING_POOL.length]);
}

const LAST_KEY = "ff-last-story";
let picked: number | undefined;

/**
 * Picks this page view's story once: `?historia=N` (1-based) forces one for previews,
 * otherwise a random story different from the one shown on the previous visit.
 */
export function pickStory(): number {
  if (picked !== undefined) return picked;
  const forced = Number(new URLSearchParams(window.location.search).get("historia"));
  if (Number.isInteger(forced) && forced >= 1 && forced <= STORIES.length) {
    picked = forced - 1;
    return picked;
  }
  let last = -1;
  try {
    last = Number(localStorage.getItem(LAST_KEY) ?? -1);
  } catch {}
  let next = Math.floor(Math.random() * STORIES.length);
  if (next === last) next = (next + 1) % STORIES.length;
  try {
    localStorage.setItem(LAST_KEY, String(next));
  } catch {}
  picked = next;
  return picked;
}
