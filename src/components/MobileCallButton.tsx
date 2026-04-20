import { forwardRef } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";

const MobileCallButton = forwardRef<HTMLAnchorElement>((_props, ref) => {
  return (
    <a
      ref={ref}
      href={SITE.phone.tel}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-fab md:hidden w-[260px] flex items-center justify-center gap-2 py-1.5 px-5 rounded-full shadow-md shadow-orange-500/25 hover:shadow-lg transition-all font-bold text-xs text-white bg-gradient-to-br from-orange-500 to-lavender-500"
      aria-label={`Call Now: ${SITE.phone.display}`}
    >
      <Phone className="w-3.5 h-3.5" />
      <span className="whitespace-nowrap">{SITE.phone.display}</span>
    </a>
  );
});

MobileCallButton.displayName = "MobileCallButton";
export default MobileCallButton;
