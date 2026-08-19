---
title: Across the Clouds
permalink: /project/
body_class: release-page
excerpt: Across the Clouds, SOR-001 — twelve tracks recorded around The People’s Radio in Levski in October 2955.
---

<article class="release" id="top">
  <header class="release-hero">
    <div class="release-shell release-hero-grid">
      <div class="release-hero-copy">
        <p class="eyebrow warm">CURRENT RECORD // SOR-001</p>
        <h1>Across the Clouds</h1>
        <p class="release-deck">Eleven lives. One room. Seven days.<br>And a record that was never supposed to exist.</p>
        <p class="release-intro">A collective chronicle made around The People’s Radio: twelve tracks shaped by seven artist identities, gathered in Levski for one week in October 2955.</p>
        <dl class="release-facts release-hero-facts">
          <div><dt>Filed</dt><dd>October 2955</dd></div>
          <div><dt>Recorded around</dt><dd>The People’s Radio / Levski</dd></div>
          <div><dt>Tracks</dt><dd>12</dd></div>
          <div><dt>Artist identities</dt><dd>7</dd></div>
        </dl>
      </div>
      <figure class="release-cover">
        <img src="{{ '/assets/img/v2/across-the-clouds-cover.webp' | relative_url }}" alt="Official cover artwork for Across the Clouds" width="1024" height="1024">
        <figcaption>SOR-001 // Official archive cover</figcaption>
      </figure>
    </div>
  </header>

  <section class="release-section release-record" aria-labelledby="record-heading">
    <div class="release-shell release-editorial-grid">
      <div><p class="eyebrow warm">THE RECORD // SOR-001</p><h2 id="record-heading">A gathering, not a compilation</h2></div>
      <div class="release-prose">
        <p class="release-lead">It is not an album in the traditional sense. It is a gathering.</p>
        <p>Across Stanton, voices that rarely meet found themselves in the same room: pilots, drifters, mechanics and observers, without a shared plan or any intention of becoming part of the same record.</p>
        <p><em>Across the Clouds</em> was shaped by those encounters—by distance, memory, work, movement and people briefly sharing the same place. Its common thread is not genre, but sincerity: a trace of a journey and a collective breath held in time.</p>
      </div>
    </div>
  </section>

  <section class="release-section release-tracklist" aria-labelledby="tracklist-heading">
    <div class="release-shell">
      <div class="release-section-heading">
        <div><p class="eyebrow">ARCHIVE SEQUENCE // 12 ENTRIES</p><h2 id="tracklist-heading">Tracklist</h2></div>
        <p>Filed in the order preserved from the session.</p>
      </div>
      <ol class="release-tracks">
        <li><span class="track-number" aria-hidden="true">01</span><span class="track-title">Leaving Pyro</span><span class="track-artist">Lyra Nhadra</span></li>
        <li><span class="track-number" aria-hidden="true">02</span><span class="track-title">My Ship My Mess</span><span class="track-artist">The Scrapliners</span></li>
        <li><span class="track-number" aria-hidden="true">03</span><span class="track-title">Hunter’s Line</span><span class="track-artist">Kovah Redd</span></li>
        <li><span class="track-number" aria-hidden="true">04</span><span class="track-title">Duct Tape Dream</span><span class="track-artist">The Scrapliners, featuring Madi Roa</span></li>
        <li><span class="track-number" aria-hidden="true">05</span><span class="track-title">Burning Thrust</span><span class="track-artist">SubLight Shift &amp; Kovah Redd</span></li>
        <li><span class="track-number" aria-hidden="true">06</span><span class="track-title">Frontier Blues</span><span class="track-artist">Darren Anders</span></li>
        <li><span class="track-number" aria-hidden="true">07</span><span class="track-title">Still My Mess</span><span class="track-artist">The Scrapliners</span></li>
        <li><span class="track-number" aria-hidden="true">08</span><span class="track-title">Same Sky</span><span class="track-artist">Lyra Nhadra with Jax &amp; Rigg Rourke</span></li>
        <li><span class="track-number" aria-hidden="true">09</span><span class="track-title">My Mess in Flame</span><span class="track-artist">The Scrapliners</span></li>
        <li><span class="track-number" aria-hidden="true">10</span><span class="track-title">The Line Below</span><span class="track-artist">SubLight Shift, with vocal textures by Madi Roa · Remix and final structure by Nok Varen</span></li>
        <li><span class="track-number" aria-hidden="true">11</span><span class="track-title">No Safe Jump</span><span class="track-artist">Nok Varen</span></li>
        <li class="title-track"><span class="track-number" aria-hidden="true">12</span><span class="track-title">Across the Clouds</span><span class="track-artist">Session listening day, curated by Nok Varen</span></li>
      </ol>
    </div>
  </section>

  <section class="release-section release-voices" aria-labelledby="voices-heading">
    <div class="release-shell">
      <div class="release-section-heading">
        <div><p class="eyebrow">ARTIST FILES // 7 IDENTITIES</p><h2 id="voices-heading">The Voices</h2></div>
        <a class="text-link" href="{{ '/artists/' | relative_url }}">All artist files <span aria-hidden="true">↗</span></a>
      </div>
      {% assign voices = "Lyra Nhadra|/artists/lyra-nhadra/|lyra-nhadra.webp~Kovah Redd|/archive/artists/kovah-redd.html|kovah-redd.webp~Madi Roa|/archive/artists/madi-roa.html|madi-roa.webp~Nok Varen|/artists/nok-varen/|nok-varen.webp~SubLight Shift|/archive/artists/sublightshift.html|sublight-shift.webp~Darren Anders|/archive/artists/darren-anders.html|darren-anders.webp~The Scrapliners|/artists/the-scrapliners/|the-scrapliners.webp" | split: "~" %}
      <div class="release-voice-grid">
        {% for voice in voices %}{% assign bits = voice | split: "|" %}
        <a class="release-voice" href="{{ bits[1] | relative_url }}">
          <img src="{{ '/assets/img/v2/artists/' | append: bits[2] | relative_url }}" alt="Portrait of {{ bits[0] }}" loading="lazy" width="600" height="600">
          <span><small>FILE // 0{{ forloop.index }}</small>{{ bits[0] }}</span>
        </a>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="release-section release-session" aria-labelledby="session-heading">
    <div class="release-shell release-session-grid">
      <figure><img src="{{ '/assets/img/v2/session-group.webp' | relative_url }}" alt="The eleven participants gathered during the Across the Clouds session" loading="lazy" width="1536" height="1024"></figure>
      <div class="release-session-copy">
        <p class="eyebrow warm">SESSION FILE // THE PEOPLE’S RADIO</p>
        <h2 id="session-heading">One room. Seven days.</h2>
        <p>Eleven people, working through seven artist identities, gathered around The People’s Radio in Levski. During that week, the first eleven tracks emerged—not from a commercial plan, but from the time, trust and proximity the room allowed.</p>
        <p>One week later, everyone returned for a final listening day. A spontaneous collective improvisation began in the room and became the twelfth track, “Across the Clouds.”</p>
        <p>That last performance gave the record its name. It also crystallized what the project had become: not a set of separate contributions, but the sound of people finding a shared identity for a moment.</p>
        <a class="text-link warm-link" href="{{ '/session/' | relative_url }}">Open the session archive <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>

  <section class="release-section release-context" aria-labelledby="context-heading">
    <div class="release-shell release-editorial-grid">
      <div><p class="eyebrow">PRODUCTION NOTE // TRANSPARENT RECORD</p><h2 id="context-heading">Behind the fiction</h2></div>
      <div class="release-prose">
        <p>SubOrbital Records, its artists, characters and stories are fictional and inspired by the <em>Star Citizen</em> universe. Music creation uses AI-assisted and generative music tools.</p>
        <p>Writing, artistic direction, thematic choices, selection, arrangement, editing, mixing and mastering are human-led. The photography and community participation are real.</p>
        <p>SubOrbital Records is an independent project and is not affiliated with Cloud Imperium Games.</p>
      </div>
    </div>
  </section>

  <nav class="release-onward" aria-label="Continue through the archive">
    <div class="release-shell">
      <p class="eyebrow">CONTINUE // ARCHIVE INDEX</p>
      <div class="release-onward-links">
        <a href="{{ '/artists/' | relative_url }}"><span>01</span>Artists</a>
        <a href="{{ '/session/' | relative_url }}"><span>02</span>The Session</a>
        <a href="{{ '/tpr/' | relative_url }}"><span>03</span>The People’s Radio</a>
      </div>
    </div>
  </nav>
</article>
