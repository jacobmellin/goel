# Goel

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

TODO: Don't compile this into production

### To do

#### Priority: High

- [ ] Add Github Actions

#### Priority: Medium

- [ ] Ensure correct formatting for displayed reflections
- [ ] Ensure appdata directory is created on first launch
- [ ] Start implementing tests
- [ ] Start implementing localization
- [ ] Handle invalid config file
- [ ] Support Mouse Back button where applicable
- [ ] Dropdown button for remind interval select

#### Priority: Low

- [ ] Goal steps to completion
- [ ] Manual track progress for goal
- [ ] Special window decoration based on platform
- [ ] Switch for enabling/disabling reminder
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
- [ ] Implement trash with restore and permanent delete
- [ ] Show some info regarding goal progress when finishing tracking a goal
- [ ] Automatic update
- [ ] Selectable display types for goel track history (horizontal, vertical, thread)
- [ ] Convert db and tauri command errors to an error type that supports previous errors

#### Ideas

- Display quotes from literature about reaching your goals when finishing the tracking
