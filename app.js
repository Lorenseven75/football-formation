
async function loadTeam() {
  const response = await fetch("team.json");
  const team = await response.json();

  document.getElementById("team-name").textContent = team.name;
  document.getElementById("formation-label").textContent = `Modulo ${team.formation}`;
  const logo = document.getElementById("team-logo");
  logo.src = team.logo;
  logo.alt = `Stemma ${team.name}`;

  const playersLayer = document.getElementById("players-layer");

  for (const player of team.players) {
    const a = document.createElement("a");
    a.className = `player ${player.role}`;
    a.href = player.notionUrl || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.style.left = `${player.x}%`;
    a.style.top = `${player.y}%`;
    a.title = `Apri la scheda di ${player.name}`;

    a.innerHTML = `
      <span class="player-card">
        <img class="player-photo" src="${player.photo}" alt="${player.name}" />
        <span class="player-name">${player.name}</span>
        <span class="player-role">${player.position}</span>
      </span>
    `;
    playersLayer.appendChild(a);
  }

  const staffList = document.getElementById("staff-list");
  for (const member of team.staff) {
    const a = document.createElement("a");
    a.className = `staff-member ${member.role}`;
    a.href = member.notionUrl || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.style.setProperty("--role-color",
      member.role === "coach" ? "var(--coach)" : "var(--staff)"
    );
    a.innerHTML = `
      <img src="${member.photo}" alt="${member.name}" />
      <span>
        <strong>${member.name}</strong>
        <small>${member.job}</small>
      </span>
    `;
    staffList.appendChild(a);
  }
}

loadTeam().catch(error => {
  console.error(error);
  document.body.insertAdjacentHTML("beforeend",
    "<p style='padding:20px'>Errore nel caricamento di team.json.</p>"
  );
});
