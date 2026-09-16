import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

/**
 * The notes feed, advertised by `<link rel="alternate">` in Layout.astro.
 *
 * Item links are built absolute and slash-free here rather than left for
 * @astrojs/rss to resolve. Astro's own RSS documentation uses relative links,
 * and a relative link resolves against the default `trailingSlash: true` to
 * `/blog/x/` — which is copied verbatim into the item's `<guid>`. Aggregators
 * dedupe on `<guid>`, so acquiring a slash there republishes the whole back
 * catalogue as new. `trailingSlash: false` is set as a second guard.
 */
export const GET = async (context: APIContext) => {
  const site = context.site ?? new URL('https://derechtevunos.com');
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = [...posts].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Derech Tevunos',
    description:
      'Notes on labelling dialectical text with Ramchal\u2019s Derech Tevunos, and on the visualization built from it.',
    site,
    trailingSlash: false,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      author: post.data.author,
      categories: [...post.data.tags],
      link: new URL(`/blog/${post.slug}`, site).href,
    })),
  });
};
