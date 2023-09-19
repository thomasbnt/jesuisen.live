# [Jesuisen.live](https://jesuisen.live)

![Preview](https://github.com/thomasbnt/jesuisen.live/assets/14293805/96880a50-143b-4ac9-902b-982afed05114)
> **Note**
> 
> jesuisen.live means "I'm live". Show us with a simple link your Twitch Stream with beautiful informations in the embed SEO.

Will  Build with :
- Fastify
- Twitch API
- Awesome devs

## How to start ?

1. Register your Twitch Application [here](https://dev.twitch.tv/console/apps/create) and get your Client ID.
2. And get your **Client ID** and **Client Secret**.
3. Create a `.env` file and add your **Client ID** and **Client Secret** like this :
```dotenv
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
```



## Development

Install dependencies : 
```bash
yarn
```

Run the server : 
```bash
yarn serve
```
## Todo

### Routes

- [ ] /
- [ ] /u/:username
- [ ] /u/
- [ ] /about