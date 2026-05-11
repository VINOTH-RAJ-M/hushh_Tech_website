// app/layout.tsx (or your root _app.tsx)
import BackToTop from "@/components/BackToTop";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}