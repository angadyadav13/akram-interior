'use client';

import {useEffect, useState} from 'react';
import {supabaseBrowser} from '../../../lib/supabase-browser';
import {Plus, Trash2, Upload, Save, Star} from 'lucide-react';

type ImageRow = {
  id: string;
  project_id: string;
  image_url: string;
  sort_order: number;
};

type P = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  location: string;
  cover_image: string;
  published: boolean;
  project_images?: ImageRow[];
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<P[]>([]);
  const [editing, setEditing] = useState<P | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [msg, setMsg] = useState('');
  const db = supabaseBrowser();

  async function load() {
    const {data, error} = await db
      .from('projects')
      .select('*,project_images(*)')
      .order('created_at', {ascending: false});

    if (error) {
      setMsg(error.message);
      return;
    }

    setProjects(
      (data || []).map((p: P) => ({
        ...p,
        project_images: [...(p.project_images || [])].sort(
          (a, b) => a.sort_order - b.sort_order
        ),
      }))
    );
  }

  useEffect(() => {
    load();
  }, []);

  function blank() {
    setMsg('');
    setEditing({
      id: '',
      title: '',
      slug: '',
      description: '',
      category: 'Full Home',
      location: '',
      cover_image: '',
      published: true,
    });
  }

  async function save() {
    if (!editing) return;

    setMsg('');

    let cover = editing.cover_image;

    if (files?.length) {
      const f = files[0];
      const path = `projects/${crypto.randomUUID()}-${f.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
      const up = await db.storage.from('project-images').upload(path, f);

      if (up.error) {
        setMsg(up.error.message);
        return;
      }

      cover = db.storage.from('project-images').getPublicUrl(path).data.publicUrl;
    }

    const row = {
      title: editing.title,
      slug:
        editing.slug ||
        editing.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      description: editing.description,
      category: editing.category,
      location: editing.location,
      cover_image: cover,
      published: editing.published,
    };

    const result = editing.id
      ? await db.from('projects').update(row).eq('id', editing.id)
      : await db.from('projects').insert(row);

    if (result.error) {
      setMsg(result.error.message);
      return;
    }

    setEditing(null);
    setFiles(null);
    setMsg('Project saved successfully.');
    await load();
  }

  async function remove(id: string) {
    if (!confirm('Delete this project and all its gallery records?')) return;

    const {error} = await db.from('projects').delete().eq('id', id);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg('Project deleted.');
    await load();
  }

  async function uploadGallery(project: P) {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';

    input.onchange = async () => {
      if (!input.files?.length) return;

      setMsg(`Uploading ${input.files.length} photo(s)...`);

      const existingCount = project.project_images?.length || 0;
      let uploaded = 0;

      for (const [index, file] of Array.from(input.files).entries()) {
        const path = `projects/${project.id}/${crypto.randomUUID()}-${file.name.replace(
          /[^a-zA-Z0-9.-]/g,
          '-'
        )}`;

        const upload = await db.storage.from('project-images').upload(path, file);

        if (upload.error) {
          setMsg(`Upload failed: ${upload.error.message}`);
          continue;
        }

        const url = db.storage.from('project-images').getPublicUrl(path).data.publicUrl;

        const insert = await db.from('project_images').insert({
          project_id: project.id,
          image_url: url,
          sort_order: existingCount + index,
        });

        if (!insert.error) uploaded++;
      }

      setMsg(`${uploaded} photo(s) uploaded successfully.`);
      await load();
    };

    input.click();
  }

  async function deleteGalleryImage(image: ImageRow) {
    if (!confirm('Delete this photo from the project gallery?')) return;

    const {error} = await db.from('project_images').delete().eq('id', image.id);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg('Photo deleted.');
    await load();
  }

  async function setCover(project: P, image: ImageRow) {
    const {error} = await db
      .from('projects')
      .update({cover_image: image.image_url})
      .eq('id', project.id);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg('Cover photo updated.');
    await load();
  }

  return (
    <>
      <div className="admin-title">
        <div>
          <div className="eyebrow">Content</div>
          <h1 className="serif">Projects & Gallery</h1>
        </div>
        <button className="btn gold" onClick={blank}>
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {msg && <div className="notice">{msg}</div>}

      {editing && (
        <section className="admin-card editor">
          <h2>{editing.id ? 'Edit' : 'New'} Project</h2>

          <div className="form-row">
            <div className="field">
              <label>Title</label>
              <input
                value={editing.title}
                onChange={(x) => setEditing({...editing, title: x.target.value})}
              />
            </div>

            <div className="field">
              <label>Category</label>
              <input
                value={editing.category}
                onChange={(x) => setEditing({...editing, category: x.target.value})}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Location</label>
              <input
                value={editing.location}
                onChange={(x) => setEditing({...editing, location: x.target.value})}
              />
            </div>

            <div className="field">
              <label>Cover URL</label>
              <input
                value={editing.cover_image}
                onChange={(x) => setEditing({...editing, cover_image: x.target.value})}
              />
            </div>
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              rows={4}
              value={editing.description}
              onChange={(x) => setEditing({...editing, description: x.target.value})}
            />
          </div>

          <div className="field">
            <label>Cover Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={(x) => setFiles(x.target.files)}
            />
          </div>

          <label className="check">
            <input
              type="checkbox"
              checked={editing.published}
              onChange={(x) => setEditing({...editing, published: x.target.checked})}
            />
            Published
          </label>

          <div className="editor-actions">
            <button className="btn gold" onClick={save}>
              <Save size={16} />
              Save
            </button>
            <button className="btn" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </section>
      )}

      {projects.map((project) => {
        const images = project.project_images || [];

        return (
          <section className="admin-card project-admin" key={project.id}>
            <div className="admin-row">
              <div>
                <b>{project.title}</b>
                <span>
                  {project.location} · {project.category}
                </span>
              </div>

              <span>{images.length} photos</span>
              <span>{project.published ? 'Published' : 'Draft'}</span>

              <div className="row-actions">
                <button onClick={() => setEditing(project)}>Edit</button>
                <button onClick={() => uploadGallery(project)}>
                  <Upload size={15} />
                  Photos
                </button>
                <button onClick={() => remove(project.id)}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {images.length > 0 && (
              <div className="mini-gallery">
                {images.map((image) => (
                  <div className="mini-gallery-item" key={image.id}>
                    <a href={image.image_url} target="_blank" rel="noreferrer">
                      <img src={image.image_url} alt={`${project.title} gallery`} />
                    </a>

                    {project.cover_image === image.image_url && (
                      <span className="cover-badge">Cover</span>
                    )}

                    <div className="mini-gallery-actions">
                      <button
                        title="Set as cover"
                        onClick={() => setCover(project, image)}
                      >
                        <Star size={13} />
                      </button>
                      <button
                        title="Delete photo"
                        onClick={() => deleteGalleryImage(image)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
