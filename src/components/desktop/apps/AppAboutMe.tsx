import { AppMarkdownLayout } from "@/components/desktop/apps/layout/AppMarkdownLayout";

const md = `
## **About me**
Fahru, Tucson, AZ, USA  
Origin: Indonesia

<br />

## **Professional Headline**
Engineer. Researcher.

<br />

## **What I am**
- A muslim
- A dad of 8 year old
- A husband
- I may or may not have an ADHD, but my kid (probably) has it

<br />

## **What I am not**
- Techbro; I loathe the idea of modern techbro. The philosophical type. The one with "feel the AGI"-esque personality or whatever BS they spew. "Tech shouldn't be depressing" is a twt that I saw once in twitter and I can relate to the notion because right now (2026), tech feels bleak; it was not as fun and positive as it was in 2022.
- AI maximalist. Specifically, I don't think the current LLM will give birth to conscious/sentient robot. They're tools. Clankers. Whatever. It does the job, or it doesn't. They may be correct, or they may not. They're literally just math. AI has its uses, but getting into the realm of consciousness from LLM is just wasting time.

<br />

## **What I like to do (or what I think I like to do...)**
- Write poems (in both my native language -- Indonesian -- or English)
- Read book (I like fiction books, I hate self-help books).
- I collect textbooks for the love of the game (they're nice to look at).

`;

export function AppAboutMe() {
  return <AppMarkdownLayout title="About Me" markdown={md} />;
}
