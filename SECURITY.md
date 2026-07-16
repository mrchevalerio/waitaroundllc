# Security notes for the waitAround LLC site

## What this site is

A static HTML/CSS/JS marketing site. No backend, no server-side code, no
database, no user accounts, no authentication, no forms that submit data
anywhere, no file uploads, no payment processing, and no build step or
package dependencies. It is hosted on GitHub Pages behind the custom domain
`waitaroundllc.com` (see the `CNAME` file in the deployed repo).

This matters because most standard web-app security controls (secrets
management, session/auth hardening, CSRF, rate limiting, SQL/NoSQL
injection defense, ORM usage, file-upload validation, webhook signature
verification, database row-level security) apply to backends, databases,
and forms this site does not have. Where a control doesn't apply, that's
called out explicitly rather than implemented as theater.

## The actual credentials involved

There is no application secret, API key, or database credential anywhere
in this project. The two real "credentials" that matter for this site are:

1. **The GitHub account/token used to push to `mrchevalerio/waitaroundllc`.**
   If that account or a personal access token used for pushing is ever
   compromised, rotate it immediately (Settings → Password and
   authentication / Settings → Developer settings → Personal access
   tokens on GitHub), and review the repo's commit history for
   unauthorized changes.
2. **The WhatsApp Business number embedded in the "Let's Build" /
   "Get in touch" links** (`+1 856 448 4646`). This is intentionally
   public (it's how visitors contact the business) — it is not a secret
   and does not need rotation unless the business itself changes numbers.

## Incident checklist (for if either of the above is ever compromised)

- [ ] Revoke/rotate the affected GitHub credential (password, PAT, or SSH key).
- [ ] Enable 2FA on the GitHub account if not already on.
- [ ] Review `git log` on `main` for commits you don't recognize.
- [ ] Check GitHub → Settings → Pages to confirm the custom domain and
      "Enforce HTTPS" setting haven't been changed.
- [ ] Check the DNS records for `waitaroundllc.com` at your registrar for
      unauthorized changes to the CNAME/A records.
- [ ] Rotate the WhatsApp number only if it's actually been taken over;
      otherwise no action needed.

## Repository hygiene

- Scanned full git history (`git log --all -p`) for API keys, private keys,
  connection strings, and tokens — none found as of this review.
- `.gitignore` added to prevent future accidental commits of `.env` files,
  private keys, or credential JSON files, in case a build step or backend
  is ever added to this project.
- Recommend enabling **GitHub secret scanning** and **Dependabot alerts**
  under the repo's Settings → Code security — both are free for public
  repos and will flag any future accidental secret commit or vulnerable
  dependency automatically.
- The repo also contains files unrelated to this site (`bio.html`, other
  client project images, a duplicate zip of an earlier site export). These
  weren't touched by this review since they belong to different work, but
  since GitHub Pages serves the entire repo publicly, consider removing
  anything you don't want publicly downloadable.

## If backend features are added later

Before adding a contact form, booking system, login, or any server-side
code to this site, revisit: secrets in server-side env vars only (never
`NEXT_PUBLIC_`/`VITE_`-style public prefixes for anything sensitive),
server-side input validation, rate limiting on any public endpoint, CSRF
protection if cookie-based sessions are introduced, and webhook signature
verification for any third-party integration (payment processor, CRM,
etc.).
