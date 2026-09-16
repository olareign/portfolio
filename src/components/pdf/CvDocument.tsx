import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CvData } from "@/lib/cv-data";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 9, fontFamily: "Helvetica", color: "#1a1a1a" },
  name: { fontSize: 18, fontFamily: "Helvetica-Bold" },
  title: { fontSize: 10, marginTop: 2 },
  contactRow: { fontSize: 8.5, marginTop: 4, color: "#444" },
  sectionHeading: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    marginTop: 8,
    marginBottom: 3,
    borderBottom: "1pt solid #1a1a1a",
    paddingBottom: 1.5,
    textTransform: "uppercase",
  },
  paragraph: { lineHeight: 1.3 },
  skillRow: { flexDirection: "row", marginBottom: 1.5 },
  skillLabel: { fontFamily: "Helvetica-Bold", width: 100 },
  skillItems: { flex: 1 },
  entry: { marginBottom: 5 },
  entryHeaderRow: { flexDirection: "row", justifyContent: "space-between" },
  entryRole: { fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  entryYears: { fontSize: 8.5, color: "#444" },
  entryMeta: { fontSize: 8.5, fontStyle: "italic", color: "#444", marginTop: 1, marginBottom: 2 },
  bullet: { flexDirection: "row", marginBottom: 1.5 },
  bulletDot: { width: 9 },
  bulletText: { flex: 1, lineHeight: 1.25 },
  certRow: { marginBottom: 1.5 },
});

function Bullets({ items }: { items: string[] }) {
  return (
    <>
      {items.map((b) => (
        <View key={b} style={styles.bullet}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{b}</Text>
        </View>
      ))}
    </>
  );
}

export function CvDocument({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.contactRow}>
          {data.location} · {data.email} · {data.phone}
        </Text>
        <Text style={styles.contactRow}>
          {data.linkedin} · {data.github} · {data.availability}
        </Text>

        <Text style={styles.sectionHeading}>Professional Summary</Text>
        <Text style={styles.paragraph}>{data.summary}</Text>

        <Text style={styles.sectionHeading}>Technical Skills</Text>
        {data.skills.map((s) => (
          <View key={s.label} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{s.label}:</Text>
            <Text style={styles.skillItems}>{s.items}</Text>
          </View>
        ))}

        <Text style={styles.sectionHeading}>Professional Experience</Text>
        {data.experience.map((e) => (
          <View key={`${e.org}-${e.role}`} style={styles.entry} wrap={false}>
            <View style={styles.entryHeaderRow}>
              <Text style={styles.entryRole}>
                {e.role}, {e.org}
              </Text>
              <Text style={styles.entryYears}>{e.years}</Text>
            </View>
            <Text style={styles.entryMeta}>{e.meta}</Text>
            <Bullets items={e.bullets} />
          </View>
        ))}

        {data.projects.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Projects</Text>
            {data.projects.map((p) => (
              <View key={p.name} style={styles.entry} wrap={false}>
                <View style={styles.entryHeaderRow}>
                  <Text style={styles.entryRole}>{p.name}</Text>
                  <Text style={styles.entryYears}>{p.meta}</Text>
                </View>
                <Bullets items={p.bullets} />
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionHeading}>Certifications</Text>
        {data.certifications.map((c) => (
          <Text key={c} style={styles.certRow}>
            • {c}
          </Text>
        ))}

        <Text style={styles.sectionHeading}>Education</Text>
        {data.education.map((ed) => (
          <View key={ed.degree} style={styles.entryHeaderRow}>
            <Text>
              {ed.degree}, {ed.org}
            </Text>
            <Text style={styles.entryYears}>{ed.years}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
