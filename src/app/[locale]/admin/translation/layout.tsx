import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import "./translation.scss";
export default function TranslationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  return (
    <>
      <div className="translationRoot">
        <div className="translationRoot_menu">
          <ul>
            <li>
              <Link href={`/admin/translation/headerlang`}> HEADER</Link>
            </li>
            <li>
              <Link href={`/admin/translation/quate`}> QUATE</Link>
            </li>
            <li>
              <Link href={`/admin/translation/about`}> ABOUT</Link>
            </li>
            <li>
              <Link href={`/admin/translation/why`}> WHY</Link>
            </li>
            
            <li>
              <Link href={`/admin/translation/footer`}> FOOTER</Link>
            </li>
            <li>
              <Link href={`/admin/translation/contact`}>CONTACT</Link>
            </li>
            <li>
              <Link href={`/admin/translation/seo`}>SEO</Link>
            </li>
            <li>
              <Link href={`/admin/translation/media`}>MEDIA</Link>
            </li>
          </ul>
        </div>
        <div className="translationRoot_content">{children}</div>
      </div>
    </>
  );
}
