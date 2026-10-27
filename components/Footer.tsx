'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabaseBrowser } from '../lib/supabase-browser';
import { defaultContact } from '../lib/types';
import type { ContactSettings } from '../lib/types';

export default function Footer() {
  const [contact, setContact] =
    useState<ContactSettings>(defaultContact);

  useEffect(() => {
    let active = true;

    async function loadContact() {
      try {
        const supabase = supabaseBrowser();

        const { data, error } = await supabase
          .from('contact_settings')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error(
            'Failed to load contact settings:',
            error
          );
          return;
        }

        if (active && data) {
          setContact((previous) => ({
            ...previous,
            ...data,
          }));
        }
      } catch (error) {
        console.error(
          'Could not initialize Supabase:',
          error
        );
      }
    }

    loadContact();

    return () => {
      active = false;
    };
  }, []);

  const phoneLink = (contact.phone || '').replace(
    /[^\d+]/g,
    ''
  );

  const whatsappNumber = (contact.whatsapp || '').replace(
    /\D/g,
    ''
  );

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">AK</span>
            <span>
              <strong>AKRAM</strong>
              <small>INTERIOR</small>
            </span>
          </div>

          <p>
            Premium interior design and execution for homes
            across Delhi NCR.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Get a Quote</Link>
        </div>

        <div>
          <h4>Contact</h4>

          {contact.address && <span>{contact.address}</span>}

          {contact.phone && (
            <a href={`tel:${phoneLink}`}>
              {contact.phone}
            </a>
          )}

          {contact.email && (
            <a href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          )}

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
    target="_blank"
rel="noreferrer"
    >
    </a>
)}
</div>
</div>

<div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} AKRAM INTERIOR
        </span>
    <span>Designed for better living.</span>
</div>
</footer>
);
}