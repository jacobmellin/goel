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

Goel is based on Tauri and uses Solid.js for the web based frontend. To start a development server, run:

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

### Feature wishlist / Yet to implement

#### Priority: High

- [ ] Automatic reminder when it's time to track goals (nagging)

#### Priority: Medium

- [ ] Goal date preview function implementation
- [ ] Conceptualize and implement goal reflection view
- [ ] Ensure appdata directory is created on first launch
- [ ] Move happiness bar on drag
- [ ] Goal edit function
- [ ] Start implementing tests

#### Priority: Low

- [ ] Manual track progress for goal
- [ ] Special window decoration based on platform
- [ ] Switch for enabling/disabling reminder
- [ ] Store all dates/times in UTC
- [ ] Nice looking scroll bars cross platform
- [ ] Display special screen after finishing tracking all pending goals
- [ ] Make skip goal undoable
- [ ] Advanced form validation
- [ ] Localization
- [ ] Font scale setting
- [ ] Open Window on tray icon left / double click
- [ ] Animations for everything
- [ ] Add shortcuts handling
- [ ] Close add goal modal on esc
- [ ] Add tooltips
- [ ] Focus trap for modal
- [ ] Implement trash with restore and permanent delete
- [ ] Show some info regarding goal progress when finishing tracking a goal
- [ ] Ensure data is not deleted on close in goal tracking view
- [ ] Automatic update
- [ ] Handle invalid config file

### Ideas

- Display quotes from literature about reaching your goals when finishing the tracking
