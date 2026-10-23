import Image from "next/image";
import { CustomCursor } from "@/components/custom-cursor";
import { InteractiveShowcase } from "@/components/interactive-showcase";
import { ScrollDistortionPortrait } from "@/components/scroll-distortion-portrait";
import { SiteNavigation } from "@/components/site-navigation";
import { portfolio } from "@/data/portfolio";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function PortfolioPage() {
  return (
    <>
      <SiteNavigation />\n      <CustomCursor />
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Eyebrow><span className="status-dot" aria-hidden="true" /> PORTFOLIO / 2026</Eyebrow>
            <h1 id="hero-title" className="hero-title"><span>Shaurya</span><span className="hero-last-name">Gupta<span className="title-period">.</span></span></h1>
            <ul className="hero-roles" aria-label="Role titles">
              {portfolio.roles.map((role) => <li key={role}>{role}</li>)}
            </ul>
            <div className="hero-actions">
              <a className="button button--light" href="#work"><span>Explore work</span><span aria-hidden="true">↘</span></a>
              <a className="text-link" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <figure className="hero-portrait-stage" aria-label="Portrait artwork of Shaurya Gupta">
            <span className="portrait-backdrop" aria-hidden="true" />
            <span className="portrait-orbit portrait-orbit--one" aria-hidden="true" />
            <span className="portrait-coordinate" aria-hidden="true">IDENTITY STUDY / 01</span>
            <ScrollDistortionPortrait src={portfolio.heroImage.src} alt={portfolio.heroImage.alt} width={portfolio.heroImage.width} height={portfolio.heroImage.height} />
            <figcaption className="portrait-caption">A portrait in pixels <span>— SG</span></figcaption>
          </figure>

          <div className="hero-footnote" aria-hidden="true"><span>DESIGN / CODE / SYSTEMS</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="work-section page-gutter" id="work" aria-labelledby="work-title">
          <div className="section-topline"><Eyebrow>01 / SELECTED WORK</Eyebrow><span className="section-rule" /><span className="muted-note">THREE PROJECTS</span></div>
          <div className="work-heading-row">
            <div><p className="section-kicker">Things I have made</p><h2 id="work-title" className="display-heading">Selected <em>work.</em></h2></div>
            <InteractiveShowcase className="orbit-stage--compact" />
          </div>
          <div className="project-grid">
            {portfolio.projects.map((project) => (
              <article className={`project project--${project.visual}`} key={project.name}>
                <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name}`}>
                  <div className={`project-art project-art--${project.visual}`} aria-hidden="true">
                    {project.visual === "packport" ? <><span className="packport-cube packport-cube--back" /><span className="packport-cube packport-cube--front" /><span className="packport-route" /></> : null}
                    {project.visual === "mvf" ? <><span className="mvf-ring mvf-ring--outer" /><span className="mvf-ring mvf-ring--inner" /><span className="mvf-orb" /><span className="mvf-crosshair" /></> : null}
                    {project.visual === "strome" ? <><span className="strome-sun" /><span className="strome-contour strome-contour--one" /><span className="strome-contour strome-contour--two" /><span className="strome-contour strome-contour--three" /></> : null}
                    <span className="art-index">{project.index} / VISUAL STUDY</span>
                  </div>
                  <div className="project-label"><span className="project-index">{project.index}</span><h3>{project.name}</h3><span className="project-open">Visit <span aria-hidden="true">↗</span></span></div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="stack-section page-gutter" id="stack" aria-labelledby="stack-title">
          <div className="section-topline"><Eyebrow>02 / TECHNOLOGY</Eyebrow><span className="section-rule" /><span className="muted-note">TOOLS I WORK WITH</span></div>
          <div className="stack-heading-row"><p className="section-kicker">A working vocabulary</p><h2 id="stack-title" className="display-heading">The stack<span className="stack-period">.</span></h2></div>
          <div className="technology-groups" aria-label="Technology stack">
            {portfolio.technologyGroups.map((group, index) => (
              <section className="technology-group" key={group.name} aria-labelledby={`tech-${index}`}>
                <h3 id={`tech-${index}`}><span>{String(index + 1).padStart(2, "0")}</span>{group.name}</h3>
                <ul>{group.entries.map((entry) => <li key={entry}>{entry}</li>)}</ul>
              </section>
            ))}
          </div>
          <p className="technology-note">Names and groupings are presented as supplied.</p>
        </section>

        <section className="experience-section page-gutter" id="experience" aria-labelledby="experience-title">
          <span className="about-anchor" id="about" aria-hidden="true" />
          <div className="section-topline"><Eyebrow>03 / EXPERIENCE</Eyebrow><span className="section-rule" /></div>
          <div className="experience-layout">
            <div className="experience-column">
              <p className="section-kicker">A little about my path</p><h2 id="experience-title" className="display-heading">Experience<span className="title-period">.</span></h2>
              <div className="experience-list">
                {portfolio.experience.map((item) => <article className="experience-item" key={item.role}><span className="experience-marker" aria-hidden="true" /><div><h3>{item.role}</h3>{item.organization ? <p>{item.organization}</p> : null}{item.description ? <p>{item.description}</p> : null}</div><span className="experience-arrow" aria-hidden="true">↗</span></article>)}
              </div>
            </div>
            <figure className="experience-character">
              <span className="character-caption">A small alter ego</span>
              <Image src={portfolio.cartoonImage.src} alt={portfolio.cartoonImage.alt} width={portfolio.cartoonImage.width} height={portfolio.cartoonImage.height} sizes="(max-width: 700px) 34vw, 22vw" />
            </figure>
          </div>
        </section>

        <section className="contact-section page-gutter" id="contact" aria-labelledby="contact-title">
          <div className="section-topline"><Eyebrow>04 / CONTACT</Eyebrow><span className="section-rule" /><span className="muted-note">SHAURYA GUPTA</span></div>
          <p className="section-kicker">Have a project in mind?</p><h2 id="contact-title" className="contact-heading">Get in<br /><em>touch.</em></h2>
          <div className="contact-bottom">
            <a className="contact-email" href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}<span aria-hidden="true">↗</span></a>
            <div className="social-links" aria-label="Professional profiles">{portfolio.contact.profiles.map((profile) => <a href={profile.href} key={profile.label} target="_blank" rel="noopener noreferrer">{profile.label}<span aria-hidden="true">↗</span></a>)}</div>
          </div>
        </section>
      </main>
      <footer className="site-footer page-gutter"><a className="footer-name" href="#top">{portfolio.name}<span className="title-period">.</span></a><span>© {new Date().getFullYear()}</span><a className="back-to-top" href="#top">Back to top <span aria-hidden="true">↑</span></a></footer>
    </>
  );
}

