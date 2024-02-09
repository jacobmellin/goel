# Goel (WIP)

Goel is a little tool that helps you keep track of your life goals.

TODO: Image / Animated WebP

## Features

- Goel lets you define your life goals and will remind you of them regularly at specified intervals.
- It will regularly ask you what your barriers and achievements you had since the last reminder, so as to give you a sense of what is holding you back and what is facilitating your progress.

Since possibly any tool can be used wrongly: Please do your own research on productivity and motivation and consult a mental health professional first if you're dealing with mental health issues and think that Goel can help you!

## Installation

### Windows & macOS

TODO

### Linux

TODO

## Development

Goel is based on [Tauri](https://tauri.app) and uses [Solid.js](https://www.solidjs.com) for the web based frontend. To start a development server, run:

```bash
npm install
npm run tauri dev
```

### Local Database for Development

By default, Goel will use the user's AppCache directory for storing application data. For development, you can place a `.env` file in `src-tauri` with a `DATABASE_URL` environment variable set.

**Example:**

```bash
DATABASE_URL=./development.sqlite
```

## Testing

### Rust

Simply run `cargo test` in the `src-tauri` directory.

### Frontend

Before tests can be run, tauri-driver needs to be installed using `cargo install tauri-driver`. Also, you need to run `npm install` in the `webdriver/webdriverio` directory.

To run tests, change into the `webdriver/webdriverio` directory and run `npm test`.

## To do

#### Priority: High

- [ ] Implement: Start with system setting
- [ ] Changeable font size
- [ ] Implement trash with restore and permanent delete
- [ ] Switch for enabling/disabling reminder
- [ ] Special window decoration based on platform

#### Priority: Medium

- [ ] Manual track progress for goal
- [ ] Ensure correct formatting for displayed reflections

#### Priority: Low

- [ ] Start implementing localization
- [ ] Support Mouse Back button where applicable
- [ ] Goal steps to completion
- [ ] Store all dates/times in UTC
- [ ] Nice looking scroll bars cross platform
- [ ] Display special screen after finishing tracking all pending goals
- [ ] Make skip goal undoable
- [ ] Advanced form validation
- [ ] Font scale setting
- [ ] Open Window on tray icon left / double click
- [ ] Animations for everything
- [ ] Add shortcuts handling
- [ ] Close add goal modal on esc
- [ ] Add tooltips
- [ ] Show some info regarding goal progress when finishing tracking a goal
- [ ] Automatic update
- [ ] Selectable display types for goel track history (horizontal, vertical, thread)
- [ ] Convert db and tauri command errors to an error type that supports previous errors

#### Ideas

- Display quotes from literature about reaching your goals when finishing the tracking
