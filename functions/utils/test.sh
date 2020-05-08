# curl -v \
#   -X GET \
#   'https://communitymap.online/api/v0/object/3nSfDkdCNqVIAwcydGgP?token=123'

# curl -v \
#   -X GET \
#   'https://community-map-dev.web.app/api/v0/object/gubNm3vRJcg0jybPBoEf?token=123'

# curl -v \
#   -H "Content-Type: application/json" \
#   -d '{"title":"Fireball Hall","description":"Biggest squash center in Bulgaria - 5 courts, 2 badminton cours, volleyball, ping-pong","loc":{"latitude":42.69060327973972,"longitude":23.321947283744777},"type":"place"}' \
#   'https://community-map-dev.web.app/api?token=123'

# curl \
#   -X PUT \
#   -H "Content-Type: application/json" \
#   -d '{"title":"Soon new Fireball Hall!", "loc":{"latitude":42.69060327973942,"longitude":23.321847283744742}}' \
#   'http://localhost:5001/community-map-dev/us-central1/object/api/v0/object/A9NSU6tja06NeJwzLfGt?token=123'

# curl -v \
#   -X GET \
#   'http://localhost:5001/community-map-dev/us-central1/object/api/v0/object/RPX3p8f0U5q9l9SU2Oop?token=123'

# curl -v \
#   -X DELETE \
#   'http://localhost:5001/community-map-dev/us-central1/object/api/v0/object/A9NSU6tja06NeJwzLfGt?token=123'
