import cheerio from 'cheerio'
import fs from 'fs/promises'
import { gotScraping } from 'got-scraping'
import { setTimeout } from 'timers/promises'

const teams = [
  'https://www.footballdb.com/teams/nfl/buffalo-bills/roster',
  'https://www.footballdb.com/teams/nfl/miami-dolphins/roster',
  'https://www.footballdb.com/teams/nfl/new-england-patriots/roster',
  'https://www.footballdb.com/teams/nfl/new-york-jets/roster',
  'https://www.footballdb.com/teams/nfl/baltimore-ravens/roster',
  'https://www.footballdb.com/teams/nfl/cincinnati-bengals/roster',
  'https://www.footballdb.com/teams/nfl/cleveland-browns/roster',
  'https://www.footballdb.com/teams/nfl/pittsburgh-steelers/roster',
  'https://www.footballdb.com/teams/nfl/houston-texans/roster',
  'https://www.footballdb.com/teams/nfl/indianapolis-colts/roster',
  'https://www.footballdb.com/teams/nfl/jacksonville-jaguars/roster',
  'https://www.footballdb.com/teams/nfl/tennessee-titans/roster',
  'https://www.footballdb.com/teams/nfl/denver-broncos/roster',
  'https://www.footballdb.com/teams/nfl/kansas-city-chiefs/roster',
  'https://www.footballdb.com/teams/nfl/las-vegas-raiders/roster',
  'https://www.footballdb.com/teams/nfl/los-angeles-chargers/roster',
  'https://www.footballdb.com/teams/nfl/dallas-cowboys/roster',
  'https://www.footballdb.com/teams/nfl/new-york-giants/roster',
  'https://www.footballdb.com/teams/nfl/philadelphia-eagles/roster',
  'https://www.footballdb.com/teams/nfl/washington-commanders/roster',
  'https://www.footballdb.com/teams/nfl/chicago-bears/roster',
  'https://www.footballdb.com/teams/nfl/detroit-lions/roster',
  'https://www.footballdb.com/teams/nfl/green-bay-packers/roster',
  'https://www.footballdb.com/teams/nfl/minnesota-vikings/roster',
  'https://www.footballdb.com/teams/nfl/atlanta-falcons/roster',
  'https://www.footballdb.com/teams/nfl/carolina-panthers/roster',
  'https://www.footballdb.com/teams/nfl/new-orleans-saints/roster',
  'https://www.footballdb.com/teams/nfl/tampa-bay-buccaneers/roster',
  'https://www.footballdb.com/teams/nfl/arizona-cardinals/roster',
  'https://www.footballdb.com/teams/nfl/los-angeles-rams/roster',
  'https://www.footballdb.com/teams/nfl/san-francisco-49ers/roster',
  'https://www.footballdb.com/teams/nfl/seattle-seahawks/roster',
]

const teamRosters: { [key: string]: any } = {}
for (const team of teams) {
  const teamName = team.split('/').at(-2) || team
  console.log(`fetching ${teamName}`)
  const html = await gotScraping.get(team, { resolveBodyOnly: true })
  const roster: string[] = []
  const links: string[] = []
  const $ = cheerio.load(html)
  $('.rostplayer>b>a').each((index, value) => {
    const link = $(value).attr('href')
    if (link?.startsWith('/players/')) {
      const playerName = $(value).text()
      roster.push(playerName)
      links.push(link)
    }
  })
  teamRosters[teamName] = {
    roster,
    links,
  }
  await setTimeout(3 * 1000)
}

console.log(teamRosters)
fs.writeFile('teamrosters.json', JSON.stringify(teamRosters))
