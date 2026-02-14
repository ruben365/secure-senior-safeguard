import decorativeBanner from "@/assets/decorative-banner.png";

export const DecorativeBanner = () => {
  return (
    <div className="w-full overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <img
        src={decorativeBanner}
        alt=""
        className="w-full h-auto object-cover opacity-60"
        width={1920}
        height={512}
        loading="lazy"
        decoding="async"
        role="presentation"
      />
    </div>
  );
};
