import { useEffect } from "react";
import { ContentHero } from "../components";

export default function HomePage() {
  useEffect(() => {
    document.title = "Gestión de Finanzas";
  }, []);
  return (
    <>
      <ContentHero />
    </>
  );
}
