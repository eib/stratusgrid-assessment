/**
 * Enumifically-named routes.
 * String values *coincidentally* happens to be the route's URL path segment.
 */
export enum Routes {
    ROOT = "/",
    SHOWS = "shows",
}

export function join(base: string, segment: string): string {
    // TODO: sanitize parts (esp segment), check for convention conformance: [-a-Z0-9]+
    if (segment === "/" && !base.endsWith('/')) {
        return `${base}/`;
    }
    if (segment.length > 0 && segment !== "/") {
        return `${base}/${segment}`;
    }
    return base;
}
