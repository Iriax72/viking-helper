export const datas = {
    winCards : [
        "VICTOIRE !\n+2 or",
        "VICTOIRE !\n+2 prisonniers",
        "VICTOIRE !\n+2 moutons",
        "VICTOIRE !\n+2 forces armées",
        "VICTOIRE !\n+2 gloire",
        "VICTOIRE !\n+2 matériaux",
        "VICTOIRE !\nAu prochain tour, vous pouvez naviguer comme si votre port était un niveau de plus que ce qu’il est au moment où vous avez pioché cette carte.",
        "VICTOIRE !\nAu prochain tour, améliorer un bâtiment coûte 3 or de moins.",
        "VICTOIRE !\nAu prochain tour, si vous attaquez un joueur, lancez un d3 à la plage d’un d6.",
        "VICTOIRE !\nConservez cette carte durant toute la partie, quand vous êtes attaqués, vous pouvez défausser cette carte pour relancer votre jet de dé. (x2)",
        "VICTOIRE !\nConservez cette carte durant toute la partie, quand vous êtes attaqués, vous pouvez défausser cette carte pour relancer votre jet de dé. (x2)",
        "VICTOIRE !\nForce écrasante:\nConservez cette carte jusqu’à la fin de la partie. Elle est nécessaire pour obtenir la faveur de Thor. Vous pouvez à tout moment la défausser pour obtenir 1 or ou 1 mouton ou 1 prisonnier ou 1 force armée. (x3)",
        "VICTOIRE !\nForce écrasante:\nConservez cette carte jusqu’à la fin de la partie. Elle est nécessaire pour obtenir la faveur de Thor. Vous pouvez à tout moment la défausser pour obtenir 1 or ou 1 mouton ou 1 prisonnier ou 1 force armée. (x3)",
        "VICTOIRE !\nForce écrasante:\nConservez cette carte jusqu’à la fin de la partie. Elle est nécessaire pour obtenir la faveur de Thor. Vous pouvez à tout moment la défausser pour obtenir 1 or ou 1 mouton ou 1 prisonnier ou 1 force armée. (x3)"
    ],
    
    loseCards : [
        "DÉFAITE !\n-2 or",
        "DÉFAITE !\n-2 prisonniers",
        "DÉFAITE !\n-2 moutons",
        "DÉFAITE !\n-2 forces armées",
        "DÉFAITE !\n-2 gloire",
        "DÉFAITE !\n-2 matériaux",
        "DÉFAITE !\nAu prochain tour, si vous naviguez, faite le comme si votre port était un niveau de moins que ce qu’il est au moment où vous avez pioché cette carte.",
        "DÉFAITE !\nAu prochain tour, améliorer un bâtiment coûte 3 or de plus.",
        "DÉFAITE !\nAu prochain tour, si vous êtes attaqué, lancez un d10 à la plage d’un d6.",
        "DÉFAITE !\nAu prochain tour, si vous attaquez un joueur, votre adversaire lance un d3 à la plage d’un d6.",
        "DÉFAITE !\nDéfaite honteuse:\nConservez cette carte jusqu’à la fin de la partie. vous ne pouvez pas attirer la faveur de Thor. Quand vous gagnez une attaque, vous pouvez défausser cette carte à la place de piocher une carte victoire ou de faire piocher une carte défaite. (x3)",
        "DÉFAITE !\nDéfaite honteuse:\nConservez cette carte jusqu’à la fin de la partie. vous ne pouvez pas attirer la faveur de Thor. Quand vous gagnez une attaque, vous pouvez défausser cette carte à la place de piocher une carte victoire ou de faire piocher une carte défaite. (x3)",
        "DÉFAITE !\nDéfaite honteuse:\nConservez cette carte jusqu’à la fin de la partie. vous ne pouvez pas attirer la faveur de Thor. Quand vous gagnez une attaque, vous pouvez défausser cette carte à la place de piocher une carte victoire ou de faire piocher une carte défaite. (x3)"
    ],
    
    ressources : [
        "or",
        "prisonniers",
        "moutons",
        "force armées",
        "matériaux"
    ],
    
    technologies : [
        "TECHNOLOGIE:\n+4 or",
        "TECHNOLOGIE:\n+3 moutons",
        "TECHNOLOGIE:\nAméliorez un bâtiment gratuitement, sans en obtenir les bonus. Si tous vos bâtiments sont niveau 4, cette carte ne fait rien",
        "TECHNOLOGIE:\nObtenez de l’or jusqu’à ce que vous en ayez autant que le joueur à votre gauche. S’il en a moins ou autant que vous, prenez lui un or. S’il n’en a pas, cette carte ne fait rien.",
        "TECHNOLOGIE:\nTechnologie avancée:\nConservez cette carte jusqu’à la fin de la partie. Elle est nécessaire pour obtenir la faveur de Loki. Vous pouvez à tout moment la défausser pour obtenir 1 or ou 1 mouton ou 1 prisonnier ou 1 force armée. (x3)",
        "TECHNOLOGIE:\nTechnologie avancée:\nConservez cette carte jusqu’à la fin de la partie. Elle est nécessaire pour obtenir la faveur de Loki. Vous pouvez à tout moment la défausser pour obtenir 1 or ou 1 mouton ou 1 prisonnier ou 1 force armée. (x3)",
        "TECHNOLOGIE:\nTechnologie avancée:\nConservez cette carte jusqu’à la fin de la partie. Elle est nécessaire pour obtenir la faveur de Loki. Vous pouvez à tout moment la défausser pour obtenir 1 or ou 1 mouton ou 1 prisonnier ou 1 force armée. (x3)"
    ],
    
    batiments : [
        "mairie",
        "port",
        "forte",
        "temple",
        "champ"
    ],

    gods: [
        "odin",
        "njörd",
        "thor",
        "loki",
        "freyr"
    ],

    separateurX: [
        0.08,
        0.31,
        0.50,
        0.64,
        0.77
    ],

    messageStyle: `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 18px;
        text-align: center;
        z-index: 1000;
    `,

    raidsButtonStyle: {
        position: 'absolute',
        zIndex: 1000,
        width: '80px',
        height: '80px',
        padding: '0',
        cursor: 'pointer',
        background: '#4a90e2',
        color: '#ffffff',
        border: '3px solid #2e5c8a',
        borderRadius: '12px',
        fontSize: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
    }
};