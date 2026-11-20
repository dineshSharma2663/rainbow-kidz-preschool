# Rainbow Kidz Pre School website

Static website for Rainbow Kidz Pre School, Gurugram. Built with Astro and Tailwind CSS, hosted on GitHub Pages.

## Updating content

Everything on the site comes from `src/data/school-data.json`:

- **New event:** add an entry to `events` and put its photos in `src/assets/events/<folder>/`. The first image is the cover. A page is created at `/events/<id>/`.
- **Phone numbers, branches, classes, testimonials, colours:** edit the matching section of the JSON.
- **Going public:** while `_meta.status` is `"demo-draft"`, every page carries `noindex`. Change it to `"live"` once the school has approved the photos and quotes.

Photos are converted to AVIF and WebP at several sizes during the build, so original JPG or PNG files can be added as they are.

## Running locally

Needs Node.js 22.23 or newer.

```bash
npm install
npm run dev
```

## Deploying

Every push to `main` builds and deploys through `.github/workflows/deploy.yml`.

### Moving to a custom domain (for example with Cloudflare)

1. In the repo's **Settings → Secrets and variables → Actions → Variables**, add `SITE_URL` = `https://yourdomain.in` and `BASE_PATH` = `/`.
2. Add `public/CNAME` containing the domain, and set the custom domain under **Settings → Pages**.
3. In Cloudflare DNS, point a `CNAME` record for the domain at `<github-username>.github.io`.
