// ==UserScript==
// @id              unifi-webmail-autologin
// @name            UniFi Webmail AutoLogin
// @namespace       https://github.com/regi18
// @version         1.1
// @author          regi18
// @description     Automatically login to UniFi's webmail portal (the same login system is used to log into the Gsuite, i.e. Google, account)
// @match           https://shibboleth2-mail.unifi.it/idp/Authn/UserPassword
// @match           https://shibbidp-mail.unifi.it/idp/Authn/UserPassword
// @grant           GM.getValue
// @grant           GM_getValue
// @grant           GM.setValue
// @grant           GM_setValue
// @grant           GM.deleteValue
// @grant           GM_deleteValue
// @run-at          document-idle
// @updateURL       https://github.com/regi18/unifi-webmail-autologin
// @downloadURL     https://github.com/regi18/unifi-webmail-autologin
// ==/UserScript==



/**
 * Asks the user for the credentials and saves them
 *
 * @param wasWrongCredentials Wether the prompt should show a "Wrong credentials" error
 */
async function setCredentials(wasWrongCredentials = false) {
    const wrongCredMsg = wasWrongCredentials ? '\n\nGiven wrong credentials' : '';

    await GM.setValue('username', prompt('[Webmail UniFi AutoLogin] Insert Matricola' + wrongCredMsg));
    await GM.setValue('password', prompt('[Webmail UniFi AutoLogin] Insert Password' + wrongCredMsg));
}

/**
 * Checks if the user has given correct or wrong credentials.
 * In case the credentials were wrong, ask for them again.
 */
async function checkIfWrongCredentials() {
    // Check the correctness of the credentials based on the presence of an error message
    let wrongCredentialsBanner = document
        .evaluate('//b[contains(., "Account non attivo o inesistente.")]', document, null, XPathResult.ANY_TYPE, null)
        .iterateNext();

    if (wrongCredentialsBanner) {
        // Deletes the saved (wrong) credentials
        await GM.deleteValue('username');
        await GM.deleteValue('password');

        // Deletes the error message to avoid redetection
        wrongCredentialsBanner.innerHTML = '';

        // Asks the credentials again
        await setCredentials(true);
    }
}

/**
 * Auto-logins on load
 */
(async () => {
    // If credentials are not saved, ask the user to enter them
    if (!(await GM.getValue('username'))) await setCredentials(false);
    else await checkIfWrongCredentials();

    // Fills in the username and password
    document.querySelector('input[name="j_username"]').value = await GM.getValue('username');
    document.querySelector('input[name="j_password"]').value = await GM.getValue('password');

    // Clicks the 'Login' button
    document.querySelector("input[type='submit'][value='Login']")?.click();
})();
