# Missed Call Calculator — free VC2 lead magnet

Built 2026-08-14. Installable web app, no App Store, no signup, no backend.
**Live URL once deployed: `vanwaynechaney.com/tools/missed-call/`**

This is the "Free Missed-Call Check" the Smart Calls Ohio teardown said VC2 already
owned but was not using as an offer. Now it is the offer.

## Why this one

- It is the argument, not a brochure. A contractor puts in his own numbers and reaches
  his own conclusion. Nobody has to be convinced of anything.
- It ends on the **demo line**, which is the actual product experience.
- Handing out a link at a chamber meeting costs nothing and needs no follow-up.

## Security — verified 2026-08-14

| Check | Result |
|---|---|
| External network requests | **NONE.** Fully self-contained. |
| `connect-src 'none'` in CSP | Yes — the page *cannot* transmit the user's numbers, by policy, not just by intent |
| localStorage / sessionStorage / cookies | **All zero.** Nothing about the visitor is retained |
| Inline event handlers | None |
| `eval` / dynamic code | None |
| Third-party scripts, fonts, analytics | None |
| Console errors | Zero |
| Service worker | Active, offline load confirmed |

Real HTTP headers ship from `VanWayne/_headers` — `frame-ancestors`, `X-Frame-Options`,
HSTS, and `Permissions-Policy` are ignored inside a `<meta>` tag and must be headers.

**The privacy claim on the page is literally true**, which matters because the buyer is
a contractor already suspicious of AI. "Your numbers never leave this device" is
enforced by CSP, not just promised.

## Internal copy was stripped

The source in `NebulaOS/projects/nebula/tools/vc2-missed-call-roi-calculator.html` is
Wayne's **internal** call tool and still contains sales coaching. The public copy had to
have it removed:

- Deleted the **"Use this line on the call"** box, which was showing the prospect Wayne's
  own script (*"...whether this is a $500 annoyance or a five-figure leak"*). A prospect
  reading that knows they are being worked.
- "VC2 Monthly Fee" → "Monthly cost of an answering service"
- "Deals Needed To Pay For VC2" → "Jobs per month needed to cover it"
- Headline changed from the internal *"seriousness calculator"* framing to
  "What are missed calls costing you?"

**Keep the two versions separate.** If the internal one is ever re-copied over this,
re-strip it.

## Deploy

It sits inside the existing site repo, so it ships with the next Cloudflare Pages deploy
of `vanwaynechaney.com`. No new hosting, no new domain.

**Bump `CACHE_VERSION` in `sw.js` on every redeploy** or installed users keep the old code.

## Still open

- Not deployed yet
- No link to it from the homepage or services page
- No way to know who used it — that is the tradeoff for having no tracking, and it is
  the right tradeoff for this buyer. The demo line is the conversion event.
