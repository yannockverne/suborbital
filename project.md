---
title: Across the Clouds
permalink: /project/
body_class: release-page
excerpt: Across the Clouds, SOR-001 — twelve tracks recorded around The People’s Radio in Levski in October 2955.
---

<article class="release" id="top">
  <header class="release-hero">
    <div class="release-shell release-hero-grid reveal">
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
    <div class="release-shell release-editorial-grid reveal">
      <div><p class="eyebrow warm">THE RECORD // SOR-001</p><h2 id="record-heading">A gathering, not a compilation</h2></div>
      <div class="release-prose">
        <p class="release-lead">It is not an album in the traditional sense. It is a gathering.</p>
        <p>Across Stanton, voices that rarely meet found themselves in the same room: pilots, drifters, mechanics and observers, without a shared plan or any intention of becoming part of the same record.</p>
        <p><em>Across the Clouds</em> was shaped by those encounters—by distance, memory, work, movement and people briefly sharing the same place. Its common thread is not genre, but sincerity: a trace of a journey and a collective breath held in time.</p>
      </div>
    </div>
  </section>

  <section class="release-section release-tracklist" aria-labelledby="tracklist-heading">
    <div class="release-shell reveal">
      <div class="release-section-heading">
        <div><p class="eyebrow">ARCHIVE SEQUENCE // 12 ENTRIES</p><h2 id="tracklist-heading">Tracklist</h2></div>
        <p>Filed in the order preserved from the session.</p>
      </div>
      {% assign tracks = "Leaving Pyro|Lyra Nhadra|https://soundcloud.com/yannock-708281134/leaving-pyro-1~My Ship My Mess|The Scrapliners|https://soundcloud.com/yannock-708281134/my-ship-my-mess-2~Hunter’s Line|Kovah Redd|https://soundcloud.com/yannock-708281134/hunter-s-line-3~Duct Tape Dream|The Scrapliners, featuring Madi Roa|https://soundcloud.com/yannock-708281134/duct-tape-dreams-4~Burning Thrust|SubLight Shift &amp; Kovah Redd|https://soundcloud.com/yannock-708281134/burning-thrust-5~Frontier Blues|Darren Anders|https://soundcloud.com/yannock-708281134/frontier-blues-6~Still My Mess|The Scrapliners|https://soundcloud.com/yannock-708281134/still-my-mess-7~Same Sky|Lyra Nhadra with Jax &amp; Rigg Rourke|https://soundcloud.com/yannock-708281134/same-sky-8~My Mess in Flame|The Scrapliners|https://soundcloud.com/yannock-708281134/my-mess-in-flame-9~The Line Below|SubLight Shift, with vocal textures by Madi Roa · Remix and final structure by Nok Varen|https://soundcloud.com/yannock-708281134/the-line-below-nkvn-remix-10~No Safe Jump|Nok Varen|https://soundcloud.com/yannock-708281134/no-safe-jump-11~Across the Clouds|Session listening day, curated by Nok Varen|https://soundcloud.com/yannock-708281134/across-the-clouds-12" | split: "~" %}
      <ol class="release-tracks">
        {% for track in tracks %}{% assign details = track | split: "|" %}
        <li class="reveal reveal-stagger{% if forloop.last %} title-track{% endif %}" data-track-row>
          <span class="track-number" aria-hidden="true">{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}</span><span class="track-title">{{ details[0] }}</span><span class="track-artist">{{ details[1] }}</span>
          <button class="track-listen" type="button" data-track-url="{{ details[2] }}" data-track-title="{{ details[0] }}" aria-pressed="false"><span>Listen</span><i aria-hidden="true">▶</i></button>
        </li>
        {% endfor %}
      </ol>
      <div class="release-player" data-soundcloud-player hidden>
        <div class="release-player-heading"><p><span class="eyebrow">NOW LISTENING</span><strong data-player-title></strong></p><a data-player-fallback href="https://soundcloud.com/yannock-708281134" target="_blank" rel="noopener">Open on SoundCloud <span aria-hidden="true">↗</span></a></div>
        <iframe data-player-frame title="SoundCloud player" width="100%" height="166" allow="autoplay" loading="lazy"></iframe>
        <p class="player-note">If the player is unavailable, use the SoundCloud link above.</p>
      </div>
    </div>
  </section>

  <section class="release-section release-voices" aria-labelledby="voices-heading">
    <div class="release-shell reveal">
      <div class="release-section-heading">
        <div><p class="eyebrow">ARTIST FILES // 7 IDENTITIES</p><h2 id="voices-heading">The Voices</h2></div>
        <a class="text-link" href="{{ '/artists/' | relative_url }}">All artist files <span aria-hidden="true">↗</span></a>
      </div>
      {% assign voices = "Lyra Nhadra|/artists/lyra-nhadra/|lyra-nhadra.webp~Kovah Redd|/archive/artists/kovah-redd.html|kovah-redd.webp~Madi Roa|/archive/artists/madi-roa.html|madi-roa.webp~Nok Varen|/artists/nok-varen/|nok-varen.webp~SubLight Shift|/archive/artists/sublightshift.html|sublight-shift.webp~Darren Anders|/archive/artists/darren-anders.html|darren-anders.webp~The Scrapliners|/artists/the-scrapliners/|the-scrapliners.webp" | split: "~" %}
      <div class="release-voice-grid">
        {% for voice in voices %}{% assign bits = voice | split: "|" %}
        <a class="release-voice reveal reveal-stagger" href="{{ bits[1] | relative_url }}">
          <img src="{{ '/assets/img/v2/artists/' | append: bits[2] | relative_url }}" alt="Portrait of {{ bits[0] }}" loading="lazy" width="600" height="600">
          <span><small>FILE // 0{{ forloop.index }}</small>{{ bits[0] }}</span>
        </a>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="release-section release-session" aria-labelledby="session-heading">
    <div class="release-shell release-session-grid reveal">
      <figure><img src="{{ '/assets/img/v2/session-group.webp' | relative_url }}" alt="The eleven participants gathered during the Across the Clouds session" loading="lazy" width="1536" height="1024"></figure>
      <div class="release-session-copy">
        <p class="eyebrow warm">SESSION FILE // THE PEOPLE’S RADIO</p>
        <h2 id="session-heading">One room. Seven days.</h2>
        <p>Eleven people, working through seven artist identities, gathered around The People’s Radio in Levski. During that week, the first eleven tracks emerged—not from a commercial plan, but from the time, trust and proximity the room allowed.</p>
        <p>One week later, everyone returned for a final listening day. A spontaneous collective improvisation began in the room and became the twelfth track, “Across the Clouds.”</p>
        <p>That last performance gave the record its name. It also crystallized what the project had become: not a set of separate contributions, but the sound of people finding a shared identity for a moment.</p>
        <a class="text-link warm-link" href="{{ '/sessions/' | relative_url }}">Open the session archive <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>

  <section class="release-section release-context" aria-labelledby="context-heading">
    <div class="release-shell release-editorial-grid reveal">
      <div><p class="eyebrow">PRODUCTION NOTE // TRANSPARENT RECORD</p><h2 id="context-heading">Behind the fiction</h2></div>
      <div class="release-prose">
        <p>SubOrbital Records, its artists, characters and stories are fictional and inspired by the <em>Star Citizen</em> universe. Music creation uses AI-assisted and generative music tools.</p>
        <p>Writing, artistic direction, thematic choices, selection, arrangement, editing, mixing and mastering are human-led. The photography and community participation are real.</p>
        <p>SubOrbital Records is an independent project and is not affiliated with Cloud Imperium Games.</p>
      </div>
    </div>
  </section>

  <nav class="release-onward" aria-label="Continue through the archive">
    <div class="release-shell reveal">
      <p class="eyebrow">CONTINUE // ARCHIVE INDEX</p>
      <div class="release-onward-links">
        <a href="{{ '/artists/' | relative_url }}"><span>01</span>Artists</a>
        <a href="{{ '/sessions/' | relative_url }}"><span>02</span>Sessions</a>
        <a href="{{ '/tpr/' | relative_url }}"><span>03</span>The People’s Radio</a>
      </div>
    </div>
  </nav>
</article>
