import { forwardRef } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";

const MobileCallButton = forwardRef<HTMLAnchorElement>((_props, ref) => {
  return (
    <a
      ref={ref}
      href={SITE.phone.tel}
      className="gx-fab fixed bottom-4 left-1/2 -translate-x-1/2 z-fab md:hidden flex items-center justify-center gap-2 py-1.5 px-5 rounded-full font-bold text-xs text-white bg-gradient-to-br from-[#e07b52] to-[#d96c4a]"
      style={{ width: "260px", maxWidth: "260px", boxSizing: "border-box" }}
      aria-label={`Call Now: ${SITE.phone.display}`}
    >
      <Phone className="w-3.5 h-3.5" />
      <span className="whitespace-nowrap">{SITE.phone.display}</span>
    </a>
  );
});

MobileCallButton.displayName = "MobileCallButton";
export default MobileCallButton;
