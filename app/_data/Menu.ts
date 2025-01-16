type Title = {
    name : string,
    route : string
}

type Menu = {
    title : string,
    iconSvg : any
}

type MegaMenu = {
    mainTitle : string,
    mainTitleRoute : string,
    iconSvg? : any,
    subTitle? : Title[],
    disabled : boolean
}

export type {
    Menu,
    MegaMenu,
    Title
}