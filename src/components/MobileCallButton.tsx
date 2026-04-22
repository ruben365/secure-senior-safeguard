import { forwardRef } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";

const MobileCallButton = forwardRef<HTMLAnchorElement>((_props, ref) => {
  return (
    <a
      ref={ref}
      href={SITE.phone.tel}
      className="gx-fab fixed bottom-4 left-1/2 -translate-x-1/2 z-fab md:hidden flex items-center justify-center gap-2 py-2.5 px-6 rounded-full font-semibold text-sm text-white bg-gradient-to-br from-[#e07b52] to-[#d96c4a] shadow-lg"
      style={{ minWidth: "200px", maxWidth: "calc(100vw - 32px)", boxSizing: "border-box", paddingTop: "0.625rem", paddingBottom: "0.625rem" }}
      aria-label={`Call Now: ${SITE.phone.display}`}
    >
      <Phone className="w-4 h-4 flex-shrink-0" />
      <span className="whitespace-nowrap">{SITE.phone.display}</span>
    </a>
  );
});

MobileCallButton.displayName = "MobileCallButton";
export default MobileCallButton;
