import { AppMarkdownLayout } from "@/components/desktop/apps/layout/AppMarkdownLayout";

const md = `
## **About site**

This is Fahru personal site

<br />

## **Source Code**

Available on github:

[https://github.com/mfakhrusy/linux.fahru.me](https://github.com/mfakhrusy/linux.fahru.me) <ExternalLinkIcon />

<br />

## **Tech Stack & Libraries**

- typescript
- reactJS
- <s>nextJS</s> <a href="https://github.com/cloudflare/vinext" target="_blank" rel="noopener noreferrer">vinext</a> <ExternalLinkIcon />
- <s>vercel</s> Cloudflare :)
- xtermjs
- chakra-ui
- framer-motion

<br />

## **Icons**

[Moka Icons](https://snwh.org/moka) by [Sam Hewitt](https://samuelhewitt.com) | Update 2026: The project had been discontinued!

licensed under [CC-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/) <ExternalLinkIcon />

<br />

## **Background**

<s>[GitHub](https://github.com/PineAndApplePizza/open-wallpapers/) by PineAndApplePizza</s> it's gone (≧︿≦)

licensed under [GPL](https://www.gnu.org/licenses/gpl-3.0.html)

original logo creator [u/Ishaan_P](https://www.reddit.com/user/Ishaan_P)

<br />

<br /> 
`;

export function AppAboutSite() {
  return <AppMarkdownLayout markdown={md} title="About Site" />;
}
