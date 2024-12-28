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
    iconSvg : any,
    subTitle? : Title[]
}

export type {
    Menu,
    MegaMenu,
    Title
}