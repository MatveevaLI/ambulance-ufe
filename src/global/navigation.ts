class PolyNavigationDestination {
    constructor(url: string) {
        this.url = url;
    }
    url: string;
}

class PolyNavigateEvent extends Event {
    constructor(destination: string | URL, info?: any) {
        super('navigate', { bubbles: true, cancelable: true });

        let rebased  = new URL(destination,  document.baseURI)
        this.canIntercept = location.protocol === rebased.protocol
        && location.host === rebased.host && location.port === rebased.port;
        this.destination = new PolyNavigationDestination(rebased.href);
        this.info = info;
    }

    destination: PolyNavigationDestination;
    canIntercept: boolean = true;
    info: any
    isIntercepted = false;

    intercept(_options?: any ) {
        this.isIntercepted = true;
        // options are ignored in this implementation, e.g. no handler or scroll
    }

    scroll(_options?: any ) {
        // not implemented
    }
}

declare global {
  interface Window { navigation: any; }
}

export function registerNavigationApi() {
   if (!window.navigation) { // provide pollyfill only if not present
       // simplified version of navigation api
       window.navigation = new EventTarget();
       const oldPushState = window.history.pushState.bind(window.history);

       window.history.pushState = (f => function pushState() {
           var ret = f.apply(this, arguments);
           let url = arguments[2];
           window.navigation.dispatchEvent(new PolyNavigateEvent(url));
           return ret;
       })(window.history.pushState);

       window.addEventListener("popstate", () => {
           window.navigation.dispatchEvent(new PolyNavigateEvent(document.location.href));
       });

       let previousUrl = '';
       const observer = new MutationObserver(function () {
           if (location.href !== previousUrl) {
               previousUrl = location.href;
               window.navigation.dispatchEvent(new PolyNavigateEvent(location.href));
           }
       });

       const config = { subtree: true, childList: true };
       observer.observe(document, config);
       window.onunload = () => {
           observer.disconnect();
       }

       window.navigation.navigate = (
           url: string,
           options: {state?: any; info?: any; history?: "auto" | "replace" | "push";}
       ) => {
         const ev = new PolyNavigateEvent(url, options?.info);
         window.navigation.dispatchEvent(ev);
         if (ev.isIntercepted) {
             oldPushState(options?.state || {}, '', url);
         } else {
             window.open(url, "_self");
         }
       }

       window.navigation.back = (
         _options?: {info?: any;}
       ) => {
           window.history.back();
           return {
               commited: Promise.resolve(),
               finished: new Promise<void>( resolve => setTimeout( () => resolve()  , 0))
           }
       }
   }
}