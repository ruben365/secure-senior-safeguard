import { forwardRef } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";

const MobileCallButton = forwardRef<HTMLAnchorElement>((_props, ref) => {
  return (
    <a
      ref={ref}
      href={SITE.phone.tel}
      className="fixed bottom-4 left-4 right-4 max-w-[calc(100vw-2rem)] mx-auto z-fab md:hidden flex items-center justify-center gap-2 py-2 px-4 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all font-bold text-sm text-white bg-gradient-to-br from-orange-500 to-lavender-500"
      aria-label={`Call Now: ${SITE.phone.display}`}
    >
      <Phone className="w-4 h-4" />
      <span className="whitespace-nowrap">{SITE.phone.display}</span>
    </a>
  );
});

MobileCallButton.displayName = "MobileCallButton";
export default MobileCallButton;
