import * as moment from "./main";

export function prepareGlobalVars(mainWindow: Window): void {
    ;(function parseWindowLocationQuery(w){
        var d=decodeURIComponent,
            q=(w.location as any).query=(w.location as any).query||{},
            pairs=w.location.search.substr(1).split('&'),
            i;
        while(i=pairs.pop()) {
            var keyValue=i.match(/([^=]*)=?(.*)/);
            if(keyValue) q[d(keyValue[1]).toLowerCase()]=d(keyValue[2]);
        }
    })(mainWindow);
    const locale = (mainWindow.location as any).query.language || (mainWindow.location as any).query.locale || 'en';
    if(mainWindow.numeral.locales[locale]) mainWindow.numeral.locale(locale);
    (moment as any).locale(locale);
}
