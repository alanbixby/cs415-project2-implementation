import json
from typing import Any, Dict

from pymongo import MongoClient

client: MongoClient[Dict[str, Any]] = MongoClient("mongodb://172.20.176.1:27017")
db = client["cs415_production"]
coll = db["twitter_stream"]

json_data = json.load(open("teamToEntitlementIds.json"))

print("connected")

for team_name in json_data:
    print(team_name)
    # print(json_data[team_name])
    # print()
    result = list(
        client["cs415_production"]["twitter_stream"].find(
            {"context_annotations.entity.id": {"$in": json_data[team_name]}}
        )
    )

    with open(f"{team_name}_tweets.json", "w") as outfile:
        outfile.write(json.dumps(result, indent=2, default=str))
    print(len(result))
