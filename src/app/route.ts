import { NextResponse } from 'next/server';

interface Episode {
  title: string;
  description: string;
  pubDate: string;
  guid: string;
  url: string;
  duration: string;
}

export async function GET() {
  const episodes = generateEpisodes();
  const feed = generateRSSFeed(episodes);

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

function generateEpisodes(): Episode[] {
  const episodes: Episode[] = [];
  const now = new Date();
  const startTime = new Date(now.getTime() - (100 * 60 * 1000)); // 100 minutes ago

  for (let i = 0; i < 100; i++) {
    const episodeDate = new Date(startTime.getTime() + (i * 60 * 1000));
    const episode = {
      title: `Daily Update - ${episodeDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })} ${episodeDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })}`,
      description: `Daily podcast episode from ${episodeDate.toLocaleDateString()}`,
      pubDate: episodeDate.toUTCString(),
      guid: `episode-${episodeDate.getTime()}`,
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      duration: '00:02:30'
    };
    episodes.push(episode);
  }

  return episodes.reverse(); // Most recent first
}

function generateRSSFeed(episodes: Episode[]) {
  const now = new Date();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>EverPod - Daily Updates</title>
    <link>https://localhost:3000</link>
    <description>A podcast that updates every minute with fresh content</description>
    <language>en-us</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
    <pubDate>${now.toUTCString()}</pubDate>
    <ttl>1</ttl>
    <itunes:author>EverPod</itunes:author>
    <itunes:summary>A podcast that updates every minute with fresh content</itunes:summary>
    <itunes:category text="News"/>
    <itunes:explicit>false</itunes:explicit>
    <image>
      <url>https://placehold.co/1200x1200/000/ff0000?text=Everpod</url>
      <title>EverPod</title>
      <link>https://localhost:3000</link>
    </image>
    ${episodes.map(episode => `
    <item>
      <title><![CDATA[${episode.title}]]></title>
      <description><![CDATA[${episode.description}]]></description>
      <pubDate>${episode.pubDate}</pubDate>
      <guid isPermaLink="false">${episode.guid}</guid>
      <enclosure url="${episode.url}" type="audio/mpeg" length="1000000"/>
      <itunes:duration>${episode.duration}</itunes:duration>
      <itunes:explicit>false</itunes:explicit>
    </item>`).join('')}
  </channel>
</rss>`;
}