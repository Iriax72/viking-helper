//erreur js classiques (exeptions)
window.onerror = function (message, src, lineno, colno, error) {
    alert(
        "Erreur détéctée: \n\n" +
        message + "\n" +
        "Fichier: " + src + "\n" +
        "Ligne: " + lineno + ", colone :" + colno +
        (error && error.stack ? "\nStack: \n" + error.stack : "")
    );
    return false; // laisse aussi la console afficher l'erreur
}
// erreur dans les promises non catchées:
window.addEventListener("unhandledrejection", function (event) {
    alert(
        "Erreur dans un promise: \n\n" +
        (event.reason && event.reason.message ? event.reason : "")
    );
});