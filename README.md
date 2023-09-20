[![Jesuisen.live wordmark](doc/wordmark.svg)](https://jesuisen.live)

[![Hacktoberfest 2023](doc/hacktoberfest.png)](https://hacktoberfest.com/)
This project is open for Hacktoberfest 2023! Feel free to contribute

![Preview](https://github.com/thomasbnt/jesuisen.live/assets/14293805/96880a50-143b-4ac9-902b-982afed05114)
> **Note**
>
> jesuisen.live means "I'm live". Show us with a simple link your Twitch Stream with beautiful informations in the embed
> SEO.

Will Build with :

- Fastify
- Twitch API
- Awesome devs

## Why?

It was created because when you want to share a Twitch URL, the information displayed is basic. No description, just a
large image of the channel. In short, it's not pretty.

## How to start?

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

- [ ] Don't use ` TwitchAPI(username)` on every request in `username.js` route, use a cache system for the OAuth token.
- [ ] Sometime, we've got an error on fetching data from Twitch API with `/u/:username` route.
- [ ] More information on the embed
- [ ] Add redirect HTML page for `/u/:username` route

### Routes

- [x] /
- [x] /u/:username
- [x] /u/
- [x] /about