import { forwardRef } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";

const MobileCallButton = forwardRef<HTMLAnchorElement>((_props, ref) => {
  return (
    <a
      ref={ref}
      href={SITE.phone.tel}
      className="fixed bottom-4 left-4 z-fab md:hidden flex items-center gap-2 h-11 px-4 rounded-full shadow-md shadow-primary/25 hover:shadow-lg transition-all font-semibold text-sm text-white bg-gradient-to-br from-primary to-accent active:scale-95"
      aria-label={`Call Now: ${SITE.phone.display}`}
    >
      <Phone className="w-4 h-4 flex-shrink-0" />
      <span className="whitespace-nowrap">{SITE.phone.display}</span>
    </a>
  );
});

MobileCallButton.displayName = "MobileCallButton";
export default MobileCallButton;
