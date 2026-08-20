---
layout: release
release: sor-001
body_class: release-page
excerpt: Across the Clouds, SOR-001 — twelve tracks recorded around The People’s Radio in Levski in October 2955.
---

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

  {% include release-tracklist.html %}

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
