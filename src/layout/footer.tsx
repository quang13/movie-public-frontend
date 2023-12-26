import Link from "next/link";

export default function FooterComponent() {
  return (
    <footer id="footer-container" className="w-full border-t border-t-blueSecondary mt-10">
      <div className="footer-wrapper mx-auto max-w-[1440px] py-6 text-center">
        Liên hệ quảng cáo:{" "}
        <Link
          href="tel:0948852465"
          className="text-xl font-semibold text-blueSecondary"
        >
          Tôi
        </Link>
      </div>
    </footer>
  );
}
