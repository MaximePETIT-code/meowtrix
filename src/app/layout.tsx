import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import ThemeRegistry from "../components/ThemeRegistry/ThemeRegistry";

export const metadata = {
  title: "Meowtrix - Purr-fect Chat Experience",
  description: "Enter the Meowtrix and experience the purr of conversations!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ThemeRegistry>
            <ToasterContext />
            {children}
          </ThemeRegistry>
        </AuthContext>
      </body>
    </html>
  );
}
