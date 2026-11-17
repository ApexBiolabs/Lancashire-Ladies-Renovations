"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { EnquiryForm } from "./EnquiryForm";

const tabs = [
  { id: "homeowner", label: "Homeowner enquiry", sub: "Renovations, extensions & planning support" },
  { id: "investor", label: "Property investor enquiry", sub: "Refurbishment management & partnerships" },
] as const;

export function ContactTabs() {
  const params = useSearchParams();
  const initial = params.get("type") === "investor" ? "investor" : "homeowner";
  const service = params.get("service") ?? undefined;
  const [active, setActive] = useState<"homeowner" | "investor">(initial);

  return (
    <div>
      <div role="tablist" aria-label="Enquiry type" className="grid grid-cols-2 border-b border-charcoal/15">
        {tabs.map((t) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  const next = active === "homeowner" ? "investor" : "homeowner";
                  setActive(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }
              }}
              tabIndex={selected ? 0 : -1}
              className={`relative px-2 pb-5 pt-2 text-left transition-colors ${selected ? "text-charcoal" : "text-stone hover:text-charcoal"}`}
            >
              <span className="block font-serif text-xl md:text-2xl">{t.label}</span>
              <span className="mt-1 hidden text-xs text-stone sm:block">{t.sub}</span>
              <span className={`absolute inset-x-0 -bottom-px h-0.5 bg-gold transition-transform duration-500 ${selected ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={active !== t.id} className="pt-10">
          {active === t.id && <EnquiryForm kind={t.id} defaultService={t.id === "homeowner" ? service : undefined} />}
        </div>
      ))}
    </div>
  );
}
