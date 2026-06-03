import Footer from "./Component/SectionOne/Footer"
import NavBar from "./Component/SectionOne/NavBar";

import SessionWrapper from "./Component/essentials/SessionWrapper";

import "./globals.css";

export const metadata = {
  title: "RangManch",
  description: "A platform for artists to showcase their work and connect with other artists.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <NavBar />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
