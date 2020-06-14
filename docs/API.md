# API

The API allows the 3rd parties to manage their objects in Open Community Map (OCM) platform.

Currently the access is restricted for registered parters only.

Use the access token as query parameter to identify yourself.

```
https://communitymap.online/api/v0/object/12345?token=<your_token>
```

## Objects

### Add

HTTP POST request with JSON content. Fields:

-   type - _string, mandatory, currently supported ones: chat, help, offer, place_
-   title - _mandatory_
-   short_description - optional, if exists will be shown on map when mouse is hovering over object
-   description - _if missing, title will be used_
-   loc - _object: {latitude: number, longitude: number}_
-   logoURL - optional, if exists, will be shown on map
-   url - optional, external link to object's website or page in partner platform
-   external_data - optional, some blackbox data stored by 3rd party

Returns the created object with id.

```
curl -v \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","description":"Great news!","loc":{"latitude":42.690603279,"longitude":23.3219472837},"type":"chat"}' \
  'https://communitymap.online/api/v0/object?token=<your_token>'
```

### Update

HTTP PUT request with same structure as in **Add**, _id_ is specified in the URL. You can modify only the objects created by you.

Returns the modified object.

```
curl -v \
  -X PUT \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","description":"More great news!","loc":{"latitude":42.690603279,"longitude":23.3219472837},"type":"chat"}' \
  'https://communitymap.online/api/v0/object/A9NSU6tja06Ne211JwzLfGt?token=<your_token>'
```

### Delete

HTTP DELETE request with _id_ in the url. You can delete only the objects created by you.

```
curl -v \
  -X DELETE \
  'https://communitymap.online/api/v0/object/A9NSU6tja06Ne211JwzLfGt?token=<your_token>'
```

### Read object

HTTP GET request with object _id_ in the URL. You can currently read any object existing in the platform.

```
curl -v \
  -X GET \
  'https://communitymap.online/api/v0/object/A9NSU6tja06Ne211JwzLfGt?token=<your_token>'
```
