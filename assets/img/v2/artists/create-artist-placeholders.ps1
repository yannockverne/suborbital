$artists = @(
    "lyra",
    "kovah",
    "madi",
    "darren",
    "scrapliners",
    "sublight-shift",
    "nok"
)

foreach ($artist in $artists) {
    Copy-Item ".\placeholder-hero.webp"     ".\$artist-hero.webp"
    Copy-Item ".\placeholder-portrait.webp" ".\$artist-portrait.webp"
    Copy-Item ".\placeholder-ending.webp"   ".\$artist-ending.webp"
}