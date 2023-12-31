<p align="center">
<a href="https://jesuisen.live" target="_blank" rel="noopener noreferrer">
<img src="doc/wordmark.png" width="200" alt="Jesuisen.live logo">
</a>
</p>

This project is open for [Hacktoberfest](https://hacktoberfest.com/) 2023! Feel free to contribute

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

- [ ] Don't use `TwitchAPI(username)` on every request in `username.js` route, use a cache system for the OAuth token. [#1](https://github.com/thomasbnt/jesuisen.live/issues/1)
- [ ] Sometime, we've got an error on fetching data from Twitch API with `/u/:username` route. [#2](https://github.com/thomasbnt/jesuisen.live/issues/2)
- [x] More information on the embed [#3](https://github.com/thomasbnt/jesuisen.live/issues/3)
- [x] Add redirect HTML page for `/:username` route [#3](https://github.com/thomasbnt/jesuisen.live/issues/3)

### Routes

- [x] /:username
- [x] /:username/json
- [x] /p/about
