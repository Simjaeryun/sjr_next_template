export interface ISideMenu {
	name: string;
	index: number;
	children: ISideMenuChild[];
}

export interface ISideMenuProps {
	width: string;
	sideMenuList: ISideMenu[];
	setActiveMenu: any;
}

export interface ISideMenuStyle {
	width: string;
}

export interface ISideMenuChild {
	name: string;
	index: number;
}
