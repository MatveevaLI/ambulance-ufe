import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'matveevali-ambulance-wl-app',
  styleUrl: 'matveevali-ambulance-wl-app.css',
  shadow: true,
})

export class MatveevaliAmbulanceWlApp {

  @State() private relativePath = "";
  @Prop() basePath: string = "";
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname)
  }

  render() {
    let element = "list"
    let entryId = "@new"

    if (this.relativePath.startsWith("entry/")) {
      element = "editor";
      entryId = this.relativePath.split("/")[1]
    }

    const navigate = (path: string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }

    return (
      <Host>
        {element === "editor"
          ? <matveevali-ambulance-wl-editor entry-id={entryId}
            oneditor-closed={() => navigate("./list")} >
          </matveevali-ambulance-wl-editor>
          : <matveevali-ambulance-wl-list ambulance-id={this.ambulanceId} api-base={this.apiBase}
            onentry-clicked={(ev: CustomEvent<string>) => navigate("./entry/" + ev.detail)} >
          </matveevali-ambulance-wl-list>
        }

      </Host>
    );
  }

}
