import { forwardRef } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";

const MobileCallButton = forwardRef<HTMLAnchorElement>((_props, ref) => {
  return (
    <a
      ref={ref}
      href={SITE.phone.tel}
      className="fixed bottom-3 right-3 z-fab md:hidden inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-semibold text-white bg-gradient-to-b from-[#c2410c] to-[#9a3412] border border-[#7c2d12] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] hover:shadow-lg transition-all"
      aria-label={`Call Now: ${SITE.phone.display}`}
    >
      <Phone className="w-3.5 h-3.5" />
      <span className="whitespace-nowrap">{SITE.phone.display}</span>
    </a>
  );
});

MobileCallButton.displayName = "MobileCallButton";
export default MobileCallButton;
