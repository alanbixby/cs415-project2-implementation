import fs from 'fs/promises'
import teamRosters from './teamRosterMappings.json'

enum Domains {
  'TV Shows' = 3,
  'TV Episodes' = 4,
  'Sports Events' = 6,
  'Person' = 10,
  'Sport' = 11,
  'Sports Team' = 12,
  'Place' = 13,
  'TV Genres' = 22,
  'TV Channels' = 23,
  'Sports League' = 26,
  'American Football Game' = 27,
  'NFL Football Game' = 28,
  'Events' = 29,
  'Community' = 31,
  'Politicians' = 35,
  'Political Race' = 38,
  'Basketball Game' = 39,
  'Sports Series' = 40,
  'Soccer Match' = 43,
  'Baseball Game' = 44,
  'Brand Vertical' = 45,
  'Brand Category' = 46,
  'Brand' = 47,
  'Product' = 48,
  'Musician' = 54,
  'Music Genre' = 55,
  'Actor' = 56,
  'Entertainment Personality' = 58,
  'Athlete' = 60,
  'Interests and Hobbies Vertical' = 65,
  'Interests and Hobbies Category' = 66,
  'Interests and Hobbies' = 67,
  'Hockey Game' = 68,
  'Video Game' = 71,
  'Video Game Publisher' = 78,
  'Video Game Hardware' = 79,
  'Cricket Match' = 83,
  'Book' = 84,
  'Book Genre' = 85,
  'Movie' = 86,
  'Movie Genre' = 87,
  'Political Body' = 88,
  'Music Album' = 89,
  'Radio Station' = 90,
  'Podcast' = 91,
  'Sports Personality' = 92,
  'Coach' = 93,
  'Journalist' = 94,
  'TV Channel [Entity Service]' = 95,
  'Reoccurring Trends' = 109,
  'Viral Accounts' = 110,
  'Concert' = 114,
  'Video Game Conference' = 115,
  'Video Game Tournament' = 116,
  'Movie Festival' = 117,
  'Award Show' = 118,
  'Holiday' = 119,
  'Digital Creator' = 120,
  'Fictional Character' = 122,
  'Multimedia Franchise' = 130,
  'Unified Twitter Taxonomy' = 131,
  'Video Game Personality' = 136,
  'eSports Team' = 137,
  'eSports Player' = 138,
  'Fan Community' = 139,
  'Esports League' = 149,
  'Food' = 152,
  'Weather' = 155,
  'Cities' = 156,
  'Colleges & Universities' = 157,
  'Points of Interest' = 158,
  'States' = 159,
  'Countries' = 160,
  'Exercise & fitness' = 162,
  'Travel' = 163,
  'Fields of study' = 164,
  'Technology' = 165,
  'Stocks' = 166,
  'Animals' = 167,
  'Local News' = 171,
  'Global TV Show' = 172,
  'Google Product Taxonomy' = 173,
  'Digital Assets & Crypto' = 174,
  'Emergency Events' = 175,
}

const output: { [key: string]: string[] } = {}

for (const teamName in teamRosters) {
  const teamData = teamRosters[teamName as keyof typeof teamRosters]
  const ids: string[] = []
  output[teamName] = []
  for (const entityName in teamData) {
    // @ts-ignore
    let entities: any[] = teamData[entityName]
    if (entities.length > 1) {
      entities = entities.filter((e) => e?.score < 0.1)
    }
    output[teamName] = [...output[teamName], ...entities.map((e) => e.item.entity_id)]
    // console.log(output[teamName])
  }
}

console.log(output)

await fs.writeFile('./src/teamToEntitlementIds.json', JSON.stringify(output))
