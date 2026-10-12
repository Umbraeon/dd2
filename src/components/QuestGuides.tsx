import React, { useEffect, useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { FORGERY_ITEMS, QUEST_GUIDES, questGuidesForEvent } from '../data/questGuides';
import type { QuestGuide } from '../data/questGuides';
import { QUEST_ITEM_REQUIREMENTS } from '../data/questItemRequirements';

const smallHeading = 'font-serif text-base font-bold text-[#f0d1a0]';
const note = 'text-sm leading-relaxed text-[#d1c7b7]';

const SourceLinks: React.FC<{ urls: readonly string[] }> = ({ urls }) => (
  <div className="mt-3 flex flex-wrap gap-3">
    {urls.map((url, index) => (
      <a key={url} href={url} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-[#d9b780] underline underline-offset-2">
        Fonte {index + 1} <ExternalLink size={13} aria-hidden="true" />
      </a>
    ))}
  </div>
);

const WalkthroughCard: React.FC<{ guide: QuestGuide; initialOpen?: boolean }> = ({
  guide, initialOpen = false
}) => (
  <details id={`quest-guide-${guide.id}`} open={initialOpen ? true : undefined} className="rounded-md border border-[#574b39] bg-[#16191c] p-3 sm:p-4">
    <summary className="cursor-pointer text-[#f0d1a0] font-semibold">
      {guide.title} <span className="text-[#a99f90] font-normal text-sm">({guide.original})</span>
    </summary>
    <div className="pt-3 space-y-3">
      <p className={note}><strong>Onde:</strong> {guide.region} · <strong>Quem:</strong> {guide.giver}</p>
      {QUEST_ITEM_REQUIREMENTS[guide.id] && (
        <section className="space-y-3 border border-[#756044] rounded-md bg-[#221e1a] p-3" aria-label="Itens necessários e onde conseguir">
          <h4 className={smallHeading}>Itens necessários: onde conseguir e o que entregar</h4>
          <p className={note}>{QUEST_ITEM_REQUIREMENTS[guide.id].guidance}</p>
          <ul className="space-y-3">
            {QUEST_ITEM_REQUIREMENTS[guide.id].items.map(item => (
              <li key={item.name} className="border-t border-[#574b39] pt-2 space-y-1">
                <p className="text-sm font-semibold text-[#f0d1a0]">{item.name}{item.optional ? ' (opcional/condicional)' : ''}</p>
                <p className={note}><strong>Quantidade:</strong> {item.quantity}</p>
                <p className={note}><strong>Onde conseguir:</strong> {item.where}</p>
                <p className={note}><strong>O que fazer:</strong> {item.use}</p>
                <p className={note}><strong>Falsificação:</strong> {item.forgery === 'original' ? 'preserve ou entregue o original' : item.forgery === 'copy' ? 'faça/entregue uma cópia' : item.forgery === 'optional' ? 'cópia opcional' : 'não é necessário falsificar'}</p>
              </li>
            ))}
          </ul>
          {QUEST_ITEM_REQUIREMENTS[guide.id].references && <SourceLinks urls={QUEST_ITEM_REQUIREMENTS[guide.id].references} />}
        </section>
      )}
      {guide.preparation.length > 0 && <div>
        <h4 className={smallHeading}>Antes de começar</h4>
        <ul className="mt-1 list-disc list-inside space-y-1">
          {guide.preparation.map(item => <li className={note} key={item}>{item}</li>)}
        </ul>
      </div>}
      <div>
        <h4 className={smallHeading}>Passo a passo</h4>
        <ol className="mt-2 ml-5 list-decimal space-y-2">
          {guide.steps.map(step => <li className={note} key={step}>{step}</li>)}
        </ol>
      </div>
      <p className={note}><strong>Conclusão:</strong> {guide.completion}</p>
      <SourceLinks urls={guide.references} />
    </div>
  </details>
);

/** Nunca marca etapas automaticamente: o guia é apenas material de consulta. */
export const QuestWalkthroughsForEvent: React.FC<{ eventId: string }> = ({ eventId }) => {
  const linked = questGuidesForEvent(eventId);
  if (linked.length === 0) return null;
  return (
    <section className="mt-3 space-y-2" aria-label="Guias detalhados relacionados">
      <h3 className={smallHeading}><BookOpen className="inline-block mr-2" size={17} aria-hidden="true"/>Missões detalhadas</h3>
      {linked.map(guide => <WalkthroughCard key={guide.id} guide={guide} />)}
    </section>
  );
};

export const ForgeryGuide: React.FC = () => (
  <section aria-labelledby="forgery-guide-title" className="space-y-3">
    <div>
      <h3 id="forgery-guide-title" className="text-lg font-serif font-bold text-[#f0d1a0]">
        O que falsificar — e quem recebe cada versão
      </h3>
      <p className="mt-1 text-sm text-[#cfc8bd]">
        Ibrahim faz as falsificações na Cidade de Descanso da Fronteira. Confira o nome do item antes de entregá-lo.
      </p>
    </div>
    <p className="text-sm text-[#e9d0a5]">
      <strong>Grimórios:</strong> entregue ao menos três volumes autênticos a Trysha e três falsificações diferentes a Myrddin.
      A lista de cinco tipos abaixo oferece opções; não é necessário fabricar todos para completar essas missões.
    </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {FORGERY_ITEMS.map(item => (
        <article key={item.id} className="border border-[#4d4437] rounded-md bg-[#17191c] p-3 space-y-2">
          <h4 className={smallHeading}>{item.item}</h4>
          <p className="text-xs text-[#b8ae9d]">Falsificação: <strong className="text-[#ded3c0]">{item.forged}</strong></p>
          <p className={note}><strong>Onde encontrar:</strong> {item.obtain}</p>
          <div className="space-y-1.5 border-t border-[#3d372e] pt-2">
            <p className={note}><strong className="text-[#d9b780]">Original →</strong> {item.originalTo}</p>
            <p className={note}><strong className="text-[#d9b780]">Cópia →</strong> {item.copyTo}</p>
          </div>
          <p className={note}>{item.action}</p>
          <SourceLinks urls={item.references} />
        </article>
      ))}
    </div>
  </section>
);

export const QuestGuideLibrary: React.FC<{ initialGuideId?: string }> = ({ initialGuideId = '' }) => {
  const [filter, setFilter] = useState('');
  useEffect(() => {
    if (!initialGuideId) return;
    const selected = document.getElementById(`quest-guide-${initialGuideId}`);
    if (selected) {
      selected.scrollIntoView({ block: 'start' });
      selected.querySelector('summary')?.focus();
    }
  }, [initialGuideId]);
  const normalized = filter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const visible = QUEST_GUIDES.filter(guide =>
    [guide.title, guide.original, guide.region, guide.giver,
      ...(QUEST_ITEM_REQUIREMENTS[guide.id]?.items.flatMap(item => [item.name, item.where]) ?? [])].join(' ')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalized));
  return (
    <section aria-labelledby="guides-title" className="space-y-5">
      <div>
        <p className="consult-eyebrow">PASSO A PASSO</p>
        <h2 id="guides-title" className="font-serif text-xl font-bold text-[#f0d1a0]">Guias de missões e falsificações</h2>
        <p className={note}>Consulte os passos de cada missão, seus requisitos e os itens envolvidos.</p>
      </div>
      <ForgeryGuide />
      <div className="space-y-3">
        <h3 className="text-lg font-serif font-bold text-[#f0d1a0]">Passo a passo das missões</h3>
        <label htmlFor="quest-guide-filter" className="block text-sm text-[#d2c5ae]">Buscar ficha</label>
        <input id="quest-guide-filter" type="search" value={filter} onChange={event => setFilter(event.target.value)}
          placeholder="Ex.: Trysha, Jadeite, Isaac"
          className="w-full min-h-11 rounded border border-[#5d5140] bg-[#16181b] p-3 text-[#f0e2cf]" />
        {visible.map(guide => <WalkthroughCard guide={guide} key={guide.id} initialOpen={guide.id === initialGuideId}/>)}
        {visible.length === 0 && <p role="status" className={note}>Nenhuma ficha encontrada. Tente outro nome.</p>}
      </div>
    </section>
  );
};
