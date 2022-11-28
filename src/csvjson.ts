import csv from 'csvtojson'
import fs from 'fs/promises'
const json = (await csv().fromFile('data.csv')).map((j) => {
  const domains: number[] = j.domains.split(',').map((d: string) => +d)
  return {
    domains,
    entity_id: j.entity_id,
    entity_name: j.entity_name,
  }
})
console.log(json)
await fs.writeFile('twitter_entities.json', JSON.stringify(json, null, 2))
