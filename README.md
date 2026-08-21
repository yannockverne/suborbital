# SubOrbital Records

SubOrbital Records is a fictional music-label and archive project inspired by the *Star Citizen* universe.

The site documents releases, artists, sessions and the people behind the project through a custom Jekyll site. The current V2 direction is built around a full-width editorial design rather than a traditional blog layout.

## Quick start — Windows / PowerShell

Open PowerShell in the repository folder.

### 1. Check Ruby and Bundler

```powershell
ruby -v
bundle -v
```

If Bundler is missing:

```powershell
gem install bundler
```

### 2. Install the project dependencies

Usually only needed after cloning the repository or when the `Gemfile` / `Gemfile.lock` changes.

```powershell
bundle install
```

### 3. Run the site locally

```powershell
bundle exec jekyll serve
```

Then open:

```text
http://localhost:4000
```

Jekyll watches the project files and normally rebuilds the site automatically when something changes.

Stop the local server with:

```text
Ctrl+C
```

### Useful commands

Run the local server with a full stack trace if something behaves strangely:

```powershell
bundle exec jekyll serve --trace
```

Build the site without starting the local server:

```powershell
bundle exec jekyll build
```

The generated site is written to:

```text
_site/
```

## Typical update workflow

```powershell
git pull
bundle install
bundle exec jekyll serve
```

`bundle install` is not required after every pull. Run it when Ruby dependencies have changed or when Bundler tells you the bundle is incomplete.

## Project structure

A few useful locations:

```text
_data/          Site data and navigation
_artists/       Artist source files
_includes/      Shared navigation/footer components
_layouts/       Jekyll page layouts
assets/css/     Main site styles
assets/img/v2/  V2 photography, artwork and logos
releases/       Release pages
sessions/       Session pages
```

The main V2 pages include the homepage, releases, artists, sessions, The People's Radio and the About / Credits page.

## Notes

- Keep image and internal page URLs compatible with Jekyll's `relative_url` filter where appropriate.
- The project is designed for GitHub Pages / Jekyll deployment.
- SubOrbital Records is an independent fictional project and is not affiliated with Cloud Imperium Games.
