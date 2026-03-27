# dbackup-ui

Frontend for dBackUp Cloud Services.

## Scripts

### `npm start`

Runs the Vite dev server on `http://localhost:3000`.

### `npm run build`

Builds the production bundle into the `build` directory.

### `npm run preview`

Serves the production bundle locally on `http://localhost:4173`.

### `npm test`

Placeholder script. No automated test suite is currently configured.

## Security Notes

- The app no longer depends on `react-scripts`; production builds are handled by Vite.
- Frontend OAuth and tracking values are kept in `sessionStorage` instead of browser-set cookies.
- The HTML entrypoint defines a restrictive Content Security Policy and basic browser hardening metadata.
