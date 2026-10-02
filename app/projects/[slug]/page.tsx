import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProjectGallery from '../../../components/ProjectGallery';
import {getProjects} from '../../../lib/content';
import {notFound} from 'next/navigation';

export default async function Project({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return notFound();

  const gallery = [
    project.cover_image,
    ...(project.project_images || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => image.image_url),
  ].filter(Boolean);

  const images = [...new Set(gallery)];

  return (
    <>
      <Header />

      <main>
        <section className="project-detail">
          <div className="container">
            <div className="detail-grid">
              <div>
                <ProjectGallery title={project.title} images={images} />
              </div>

              <aside className="detail-panel">
                <div className="eyebrow">Project</div>
                <h1 className="serif">{project.title}</h1>
                <p className="muted">{project.description}</p>

                <div className="detail-row">
                  <span>Category</span>
                  <b>{project.category}</b>
                </div>

                <div className="detail-row">
                  <span>Location</span>
                  <b>{project.location}</b>
                </div>

                <p className="gallery-hint">
                  Click any photo to view the full gallery.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
