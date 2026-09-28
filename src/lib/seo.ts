import { CONTACT } from "@/data/content";

/** schema.org Person for Mario Yael, used by every page's structured data. */
export const PERSON = {
  "@type": "Person",
  name: "Mario Yael Gordillo García",
  alternateName: "MAEL",
  jobTitle: "Software Developer",
  url: CONTACT.site,
  email: `mailto:${CONTACT.email}`,
  sameAs: [CONTACT.github],
  address: { "@type": "PostalAddress", addressCountry: "MX" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "UPIICSA — Instituto Politécnico Nacional" },
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "Backend Development",
    "System Integration",
    "Business Applications",
    "Software Architecture",
    "Java",
    "Spring Boot",
    "Quarkus",
    "Angular",
    "React",
    "Python",
    "PostgreSQL",
  ],
};
