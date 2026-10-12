/** 63 quest-title pairs mapped to editorial milestones, NOT 62 milestone equivalents.
 * Source: docs/audit/quest-name-mapping.csv plus seven hash/key examples reported
 * from DD2 Steam build 25290080. The full original PAK export is NOT in Git.
 * 'paired_catalog' MUST NOT be described as independently verified PAK bytes.
 */
export type QuestNameEvidence = 'pak_sample_reported' | 'paired_catalog' | 'kiranico_ptbr';
export interface QuestNameRecord {
  english: string;
  ptBR: string;
  eventIds: readonly string[];
  evidence: QuestNameEvidence;
  sourceUrl?: string;
  titleKey?: string;
  resourcePath?: string;
  sha256?: string;
}
export const QUEST_NAME_INDEX: readonly QuestNameRecord[] = [
  {
    "english": "Gaoled Awakening",
    "ptBR": "O Despertar na Prisão",
    "eventIds": [
      "m01"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Hand That Guides",
    "ptBR": "A Mão que Guia",
    "eventIds": [
      "m01"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Tale's Beginning",
    "ptBR": "A História se Inicia",
    "eventIds": [
      "m01"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "In Dragon's Wake",
    "ptBR": "No Rastro do Dragão",
    "eventIds": [
      "m01",
      "v101",
      "m04"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Ordeals of a New Recruit",
    "ptBR": "Provações de um Novo Recruta",
    "eventIds": [
      "m02"
    ],
    "evidence": "pak_sample_reported",
    "titleKey": "Mes_qu020020_log_title",
    "resourcePath": "natives/stm/message/questlog/qu020020_log.msg.24",
    "sha256": "293A9F210957C01FF354A89EDF0B88232BB1D95428A9B879A1A3486850A0D97D"
  },
  {
    "english": "The Provisioner's Plight",
    "ptBR": "Um Fornecedor em Apuros",
    "eventIds": [
      "m02"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Claw Them Into Shape",
    "ptBR": "Treino Leonino",
    "eventIds": [
      "m03",
      "p03"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Beren's Final Lesson",
    "ptBR": "A Última Lição de Beren",
    "eventIds": [
      "m03",
      "p03"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Spellbound",
    "ptBR": "Magia Vertiginosa",
    "eventIds": [
      "m03",
      "v206",
      "p03"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Sorcerer's Appraisal",
    "ptBR": "O Julgamento do Feiticeiro",
    "eventIds": [
      "v206",
      "p03"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Medicament Predicament",
    "ptBR": "Bravura Revigorante",
    "eventIds": [
      "m04"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Nesting Troubles",
    "ptBR": "Problemas Aninhados",
    "eventIds": [
      "m04",
      "v303"
    ],
    "evidence": "pak_sample_reported",
    "titleKey": "Mes_qu020040_log_title",
    "resourcePath": "natives/stm/message/questlog/qu020040_log.msg.24",
    "sha256": "0F68DDB3A20A02CBC5646C52A13D1D8F93FE3BE248D38C1E7DDB76F3FFC32845"
  },
  {
    "english": "Brothers Brave and Timid",
    "ptBR": "A Tímida Bravura dos Irmãos",
    "eventIds": [
      "m04"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "A Game of Wits",
    "ptBR": "Um Jogo de Perspicácia",
    "eventIds": [
      "m06",
      "v205",
      "b06",
      "b062"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "One-Eyed Interloper",
    "ptBR": "Intruso de um Olho Só",
    "eventIds": [
      "v101"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Seat of the Sovran",
    "ptBR": "O Trono do Sobran",
    "eventIds": [
      "v101"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Vocation Frustration",
    "ptBR": "Frustração Vocacional",
    "eventIds": [
      "v102",
      "v303"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Gift of the Bow",
    "ptBR": "O Dom do Arco",
    "eventIds": [
      "v102"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Ornate Box",
    "ptBR": "A Caixa Ornamentada",
    "eventIds": [
      "v103",
      "v303"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Heel of History",
    "ptBR": "A História sob a Profundez",
    "eventIds": [
      "v103"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Caged Magistrate",
    "ptBR": "O Magistrado Aprisionado",
    "eventIds": [
      "v103"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Stolen Throne",
    "ptBR": "O Trono Roubado",
    "eventIds": [
      "v104"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "A Place to Call Home",
    "ptBR": "Um Lugar para Chamar de Lar",
    "eventIds": [
      "v105"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Readvent of Calamity",
    "ptBR": "Revinda da Calamidade",
    "eventIds": [
      "v107",
      "v202",
      "v303"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Monster Culling",
    "ptBR": "Elimine os Monstros",
    "eventIds": [
      "v201"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Nameless Village",
    "ptBR": "O Vilarejo sem Nome",
    "eventIds": [
      "v201"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Scaly Invaders",
    "ptBR": "Invasores Escamosos",
    "eventIds": [
      "v201",
      "v202"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Trouble on the Cape",
    "ptBR": "As Mãos Atadas que Abraçam a Causa",
    "eventIds": [
      "v202"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Till Death Do Us Part",
    "ptBR": "Até que a Morte Nos Separe",
    "eventIds": [
      "v203"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Disa's Plot",
    "ptBR": "O Plano de Disa",
    "eventIds": [
      "v301"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Arisen's Shadow",
    "ptBR": "Uma Sombra à Espreita",
    "eventIds": [
      "v301",
      "v303"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Every Rose Has Its Thorn",
    "ptBR": "As Rosas Têm Espinhos",
    "eventIds": [
      "v302",
      "v303"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Feast of Deception",
    "ptBR": "O Banquete da Farsa",
    "eventIds": [
      "v107",
      "v202",
      "v303",
      "v304"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Nation of the Lambent Flame",
    "ptBR": "Nação da Chama Luzente",
    "eventIds": [
      "v304",
      "b01"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Mercy among Thieves",
    "ptBR": "Piedade entre Ladrões",
    "eventIds": [
      "b02"
    ],
    "evidence": "pak_sample_reported",
    "titleKey": "Mes_qu030210_log_title",
    "resourcePath": "natives/stm/message/questlog/qu030210_log.msg.24",
    "sha256": "BE1989B3F59F54DD1F7D5BD680B61E2E651B967B7C8578B6A26CA5C8D737A7B5"
  },
  {
    "english": "Shadowed Prayers",
    "ptBR": "Orações Ensombradas",
    "eventIds": [
      "b02"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "A Poisonous Proposal",
    "ptBR": "Uma Proposta Venenosa",
    "eventIds": [
      "b02"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Short-Sighted Ambition",
    "ptBR": "Ambição Cega",
    "eventIds": [
      "b03"
    ],
    "evidence": "pak_sample_reported",
    "titleKey": "Mes_qu020290_log_title",
    "resourcePath": "natives/stm/message/questlog/qu020290_log.msg.24",
    "sha256": "1325D3F4B64B0F639BA94780D254A0C149639C049F0CC88874E918F0DC5082F2"
  },
  {
    "english": "The Phantom Oxcart",
    "ptBR": "A Carroça Fantasma",
    "eventIds": [
      "b05"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Put a Spring in Thy Step",
    "ptBR": "A Fonte do Contentamento",
    "eventIds": [
      "i03"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Sotted Sage",
    "ptBR": "O Sábio Beberrão",
    "eventIds": [
      "i05"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Dulled Steel, Cold Forge",
    "ptBR": "Lâmina Cega, Forja Fria",
    "eventIds": [
      "i06"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Steeled Resolve, Blazing Forge",
    "ptBR": "Vontade Resistente, Forja Ardente",
    "eventIds": [
      "i06"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "A New Godsway",
    "ptBR": "Um Novo Chamado Divino",
    "eventIds": [
      "p04"
    ],
    "evidence": "pak_sample_reported",
    "titleKey": "Mes_qu010170_log_title",
    "resourcePath": "natives/stm/message/questlog/qu010170_log.msg.24",
    "sha256": "251F5B8D05DA66388B965F646233461368DD6666F1512C18A6CC9D8DD3577D9D"
  },
  {
    "english": "The Guardian Gigantus",
    "ptBR": "O Guardião Gigantus",
    "eventIds": [
      "p04",
      "p05"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Legacy",
    "ptBR": "Legado",
    "eventIds": [
      "p06",
      "u01",
      "u02"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Dreams Apart",
    "ptBR": "Destinos Separados",
    "eventIds": [
      "u03"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Halls of the First Dawn",
    "ptBR": "Átrios da Primeira Aurora",
    "eventIds": [
      "u04",
      "u08"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Regentkin's Resolve",
    "ptBR": "A Determinação do Príncipe Regente",
    "eventIds": [
      "u04"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Civil Unrest",
    "ptBR": "Instabilidade Civil",
    "eventIds": [
      "u04"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Wandering Roots",
    "ptBR": "Raízes Errantes",
    "eventIds": [
      "u04"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "The Importance of Aiding Ernesto",
    "ptBR": "A Importância de Ajudar Ernesto",
    "eventIds": [
      "u04"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Shepherd of the Pawns",
    "ptBR": "Pastor de Peões",
    "eventIds": [
      "u04"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "A Scholarly Pursuit",
    "ptBR": "A Missão dos Eruditos",
    "eventIds": [
      "u05"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "When Wills Collide",
    "ptBR": "Quando as Vontades São Conflituantes",
    "eventIds": [
      "u05",
      "u06"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "Chilling Tidings",
    "ptBR": "Notícias Congelantes",
    "eventIds": [
      "d01"
    ],
    "evidence": "pak_sample_reported",
    "titleKey": "Mes_qu040010_log_title",
    "resourcePath": "natives/stm/message/questlog/qu040010_log_end.msg.24",
    "sha256": "91B4FAC9E38DFCCC3BB5D46AC9A96EADAD7BF285FFDD464515D7F9F3A6B02CE9"
  },
  {
    "english": "Lost Rites",
    "ptBR": "Rituais Perdidos",
    "eventIds": [
      "d01"
    ],
    "evidence": "pak_sample_reported",
    "titleKey": "Mes_CONTENTS_0014_log_title",
    "resourcePath": "natives/stm/message/questlog/questlog_contents_0014.msg.24",
    "sha256": "6148A9170CC816A6B51DC3EFF6AF27D1CBF663D6D79A8725513E23BB5392C69C"
  },
  {
    "english": "Home Is Where the Hearth Is",
    "ptBR": "Lar é Onde o Coração Está",
    "eventIds": [
      "v303",
      "v202",
      "u04"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "A Trial of Archery",
    "ptBR": "A Prova de Arco e Flecha",
    "eventIds": [
      "v102",
      "MAISTER:archer_taliesin"
    ],
    "evidence": "paired_catalog"
  },
  {
    "english": "An Unsettling Encounter",
    "ptBR": "Um Encontro Perturbador",
    "eventIds": ["v301", "v303"],
    "evidence": "kiranico_ptbr",
    "sourceUrl": "https://dragonsdogma2.kiranico.com/pt-BR/data/quests"
  },
  {
    "english": "Flickering Shadows",
    "ptBR": "Sombras Trêmulas",
    "eventIds": ["b02", "b04"],
    "evidence": "kiranico_ptbr",
    "sourceUrl": "https://dragonsdogma2.kiranico.com/pt-BR/data/quests"
  },
  {
    "english": "Convergence",
    "ptBR": "Convergência",
    "eventIds": ["p04"],
    "evidence": "kiranico_ptbr",
    "sourceUrl": "https://dragonsdogma2.kiranico.com/pt-BR/data/quests"
  },
  {
    "english": "Prey for the Pack",
    "ptBR": "A Presa da Alcateia",
    "eventIds": ["v206"],
    "evidence": "kiranico_ptbr",
    "sourceUrl": "https://dragonsdogma2.kiranico.com/pt-BR/data/quests"
  }
];
export const questNamesForEvent = (eventId: string): QuestNameRecord[] =>
  QUEST_NAME_INDEX.filter(item => item.eventIds.includes(eventId));
