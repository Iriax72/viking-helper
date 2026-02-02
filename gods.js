export function gods (gameElements) {
    // Récupérer les valeur des ressources
    const gloire = gameElements.gloire.getValue();
    const gold = gameElements.ressourcesCounters[0].getValue();
    const prisonniers = gameElements.ressourcesCounters[1].getValue();
    const moutons = gameElements.ressourcesCounters[2].getValue();
    const forcesArmee = gameElements.ressourcesCounters[3].getValue();
    const materiaux = gameElements.ressourcesCounters[4].getValue();

    // Récupérer les toggles des dieux
    const odin = gameElements.toggles.find(toggle => toggle.label === 'odin');
    const njord = gameElements.toggles.find(toggle => toggle.label === 'njord');
    const thor = gameElements.toggles.find(toggle => toggle.label === 'thor');
    const loki = gameElements.toggles.find(toggle => toggle.label === 'loki');
    const freyr = gameElements.toggles.find(toggle => toggle.label === 'freyr');

    // récupérer les batiments
    const buildings = gameElements.buildings;

    // automatiquement cocher les toggles
    if (!odin.getState() && buildings.every(build => build.getValue() >= 3)) {
        odin.setState(true);
    }

    if (!njord.getState() && gold >= 10 && moutons >= 5) {
        njord.setState('possible');
    }

    if (!thor.getState() && gloire >= 12 && forcesArmee >= 6 && prisonniers >= 3) {
        thor.setState('possible');
    }

    if (!loki.getState() && gloire < 18) {
        loki.setState('possible');
    }

    if (!freyr.getState() && moutons >= 10 && materiaux >= 6) {
        freyr.setState(true);
    }

    // TODO: remplir les conditions avec carte pour ofin et thor
}