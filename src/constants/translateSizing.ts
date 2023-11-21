export function translateSizing(size:string) {
    return(size.split("x").map(Number))
}