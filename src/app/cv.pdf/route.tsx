import { renderToBuffer } from "@react-pdf/renderer";
import { CvDocument } from "@/components/pdf/CvDocument";
import { cvData } from "@/lib/cv-data";

// Rendered once at build time, so the download always matches src/lib/cv-data.ts.
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderToBuffer(<CvDocument data={cvData} />);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="abdulrasaq-taofeeq-olarewaju-cv.pdf"',
    },
  });
}
