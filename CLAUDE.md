# EverPod - Next.js Podcast Feed App

## Project Overview
This is a Next.js application that serves a podcast RSS feed that generates fake episodes with date-based titles, updating every minute.

## Key Features
- **API Endpoint**: `/api/feed` - serves a valid podcast RSS feed
- **Episode Generation**: Creates 100 episodes with timestamps going back 100 minutes from current time
- **Date-based Titles**: Episode titles include date and time (e.g., "Daily Update - September 25, 2025 01:55 PM")
- **Auto-updating**: Feed regenerates fresh episodes on each request based on current time
- **Single Audio File**: All episodes reference the same MP3 file: `https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3`
- **100 Episode Limit**: Maintains exactly 100 episodes, most recent first

## File Structure
```
src/app/api/feed/route.ts - Main API endpoint that generates the RSS feed
```

## How It Works
1. `generateEpisodes()` creates 100 episodes with timestamps from 100 minutes ago to now (1 minute intervals)
2. `generateRSSFeed()` converts episodes into valid RSS XML format
3. Episodes are returned in reverse chronological order (newest first)
4. Each episode has a unique GUID based on timestamp
5. Feed includes proper RSS metadata and iTunes podcast tags

## Development Commands
- `npm run dev` - Start development server (runs on http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server

## Testing
- Visit `http://localhost:3000/api/feed` to see the RSS feed
- Episodes update automatically based on current time
- Feed validates as proper RSS 2.0 with iTunes extensions

## Technical Details
- Uses Next.js 15.5.4 with App Router
- TypeScript enabled
- RSS feed has TTL of 1 minute (suggests checking every minute)
- Episodes have 2:30 duration
- Feed includes proper caching headers (no-cache) for fresh content