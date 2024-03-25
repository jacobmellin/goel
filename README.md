# Goel (WIP)

Goel is a small tool that helps you keep track of your life goals.

TODO: Image / Animated WebP

## Features

- Goel lets you define your life goals and will remind you of them regularly at specified intervals.
- It will regularly ask you what your barriers and achievements you had since the last reminder, so as to give you a sense of what is holding you back and what is facilitating your progress.

⚠️ Since possibly any tool can be used wrongly: Please do your own research on productivity and motivation and perhaps consult a mental health professional that you trust first if you're struggling with mental health issues and are thinking about using Goel!

⚠️ If Goel makes you feel guilty about not achieving your goals, you should probably not use it, since a big part of self-actualization consists in accepting who we are, not trying to achieve something with much pressure (talking from experience). Working through your feelings with self-compassion is probably much healthier in the long run.

## Installation

### Windows 

Download the Installer from the Releases section and install it.

### macOS

Download the .dmg-file from the Releases section and move the contained Application to your Applications folder.

### Linux

Currently, there is only an AppImage and a Binary available for Linux. Download the package you would like to use from the Releases section and run it.

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

- [ ] Test on Windows/macOS
- [ ] Open Window on tray icon left / double click

#### Priority: Medium

- [ ] Implement: Start with system setting
- [ ] Character limit for goals descriptions and reflect input
- [ ] Delete button in goal reflect view
- [ ] Manual track progress for goal
- [ ] Ensure correct formatting for displayed reflections
- [ ] Fix display of switch when changed font size
- [ ] Fade gradients at top and bottom of scroll areas

#### Priority: Low

- [ ] Start implementing localization
- [ ] Support Mouse Back button where applicable
- [ ] Goal steps to completion
- [ ] Store all dates/times in UTC
- [ ] Nice looking scroll bars cross platform
- [ ] Display special screen after finishing tracking all pending goals
- [ ] Make skip goal undoable
- [ ] Advanced form validation
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
