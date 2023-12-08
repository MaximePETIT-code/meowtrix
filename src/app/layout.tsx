import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import ThemeRegistry from "../components/ThemeRegistry/ThemeRegistry";

export const metadata = {
  title: 'Meowtrix - Chat web app',
  description: 'Meotrix is a chat web app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body >
        <AuthContext>
          <ThemeRegistry>
            <ToasterContext />
            {children}
          </ThemeRegistry>
        </AuthContext>
      </body>
    </html>
  )
}
