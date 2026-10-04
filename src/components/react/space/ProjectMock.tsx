import type { CSSProperties } from "react";
import { bi, type Lang } from "../../../data/content";

// Schematic UI fragments for projects without a public screenshot. They show
// the shape of the product (what the screen is for, what moves through it),
// drawn with the page's own tokens; every value is illustrative. aria-hidden:
// the project text already says what the product does.

const t = {
  quote: bi("Cotización", "Quote"),
  item: bi("Concepto", "Item"),
  cost: bi("Costo", "Cost"),
  margin: bi("Margen", "Margin"),
  price: bi("Precio", "Price"),
  sales: bi("Ventas", "Sales"),
  purchasing: bi("Compras", "Purchasing"),
  logistics: bi("Logística", "Logistics"),
  install: bi("Instalación", "Installation"),
  overhead: bi("Indirectos", "Overhead"),
  synced: bi("Sincronizado con Odoo", "Synced with Odoo"),
  file: bi("layout_clientes.xlsx", "customers_layout.xlsx"),
  rows: bi("1,240 registros", "1,240 records"),
  valid: bi("VÁLIDO", "VALID"),
  error: bi("REVISAR", "REVIEW"),
  loaded: bi("CARGADO", "LOADED"),
};

function GbsMock({ lang }: { lang: Lang }) {
  const rows = [
    { k: t.sales, c: "18,400", m: "22%", tone: "#6EF3A5" },
    { k: t.purchasing, c: "9,860", m: "15%", tone: "#FFC07A" },
    { k: t.logistics, c: "3,120", m: "12%", tone: "#F9A8D4" },
    { k: t.install, c: "2,450", m: "20%", tone: "#9DB4FF" },
    { k: t.overhead, c: "1,180", m: "10%", tone: "#A49FC9" },
  ];
  return (
    <div className="mock mock--gbs" aria-hidden="true">
      <div className="mock__head">
        <span className="mock__title">
          {t.quote[lang]} <b>Q-2048</b>
        </span>
        <span className="mock__badge">
          <i /> {t.synced[lang]}
        </span>
      </div>
      <div className="mock__grid">
        <div className="mock__table">
          <div className="mock__tr mock__tr--h">
            <span>{t.item[lang]}</span>
            <span>{t.cost[lang]}</span>
            <span>{t.margin[lang]}</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.k.en} className="mock__tr" style={{ ["--tone" as string]: r.tone, ["--k" as string]: i } as CSSProperties}>
              <span>
                <i className="mock__swatch" />
                {r.k[lang]}
              </span>
              <span>{r.c}</span>
              <span>{r.m}</span>
            </div>
          ))}
        </div>
        <div className="mock__summary">
          <span className="label">{t.cost[lang].toUpperCase()}</span>
          <strong>35,010</strong>
          <span className="label">{t.margin[lang].toUpperCase()}</span>
          <strong>18.6%</strong>
          <span className="label">{t.price[lang].toUpperCase()}</span>
          <strong className="mock__price">43,010</strong>
        </div>
      </div>
    </div>
  );
}

function LayoutMock({ lang }: { lang: Lang }) {
  const rows = [
    { id: "C-0418", s: t.loaded, tone: "#6EF3A5" },
    { id: "C-0419", s: t.loaded, tone: "#6EF3A5" },
    { id: "C-0420", s: t.error, tone: "#FFC07A" },
    { id: "C-0421", s: t.valid, tone: "#7DE3FF" },
  ];
  return (
    <div className="mock mock--layout" aria-hidden="true">
      <div className="mock__head">
        <span className="mock__title">
          <b>{t.file[lang]}</b>
        </span>
        <span className="mock__muted">{t.rows[lang]}</span>
      </div>
      <div className="mock__progress">
        <i />
      </div>
      <div className="mock__table">
        {rows.map((r, i) => (
          <div key={r.id} className="mock__tr mock__tr--2" style={{ ["--tone" as string]: r.tone, ["--k" as string]: i } as CSSProperties}>
            <span>{r.id}</span>
            <span className="mock__status">{r.s[lang]}</span>
          </div>
        ))}
      </div>
      <pre className="mock__log">
        <span>POST /erp/partners</span> <b>201</b>
        {"\n"}
        <span>POST /validate/rfc</span> <b>200</b>
      </pre>
    </div>
  );
}

const MOCKS: Record<string, (p: { lang: Lang }) => JSX.Element> = {
  "gbs-builder": GbsMock,
  "layout-builder": LayoutMock,
};

export const hasMock = (slug: string) => slug in MOCKS;

export default function ProjectMock({ slug, lang }: { slug: string; lang: Lang }) {
  const Mock = MOCKS[slug];
  return Mock ? <Mock lang={lang} /> : null;
}
