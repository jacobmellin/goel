# WIP: Goel

## Development

### Local Database for Development

By default, Goel will use the user's AppCache directory for storing application data. For development, you can place a `.env` file in `src-tauri` with a `DATABASE_URL` environment variable set.

**Example:**

```bash
DATABASE_URL=./development.sqlite
```

### Todo

#### Priority: High

- [ ] Settings view with nagging time
- [ ] Automatic reminder when it's time to track goals (nagging)

#### Priority: Medium

- [ ] Goal date preview function implementation
- [ ] Conceptualize and implement goal reflection view
- [ ] Ensure appdata directory is created on first launch
- [ ] Fix my footer

#### Priority: Low

- [ ] Display special screen after finishing tracking all pending goals
- [ ] Make skip goal undoable
- [ ] Move happiness bar on drag
- [ ] Advanced form validation
- [ ] Internationalization
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

### Ideas

- Display quotes from literature about reaching your goals when finishing the tracking
