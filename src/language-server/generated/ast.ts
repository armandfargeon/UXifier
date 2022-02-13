/******************************************************************************
 * This file was generated by langium-cli 0.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { AstNode, AstReflection, isAstNode } from 'langium';

export interface App extends AstNode {
    header: Header
    menu: Menu
    name: string
    theme: Theme
}

export const App = 'App';

export function isApp(item: unknown): item is App {
    return reflection.isInstance(item, App);
}

export interface Color extends AstNode {
    readonly $container: Theme;
    code: string
    name: string
}

export const Color = 'Color';

export function isColor(item: unknown): item is Color {
    return reflection.isInstance(item, Color);
}

export interface Header extends AstNode {
    readonly $container: App;
    level: number
    logo: string
    name: string
    title: string
}

export const Header = 'Header';

export function isHeader(item: unknown): item is Header {
    return reflection.isInstance(item, Header);
}

export interface Menu extends AstNode {
    readonly $container: App;
    name: string
    pages: Array<Page>
}

export const Menu = 'Menu';

export function isMenu(item: unknown): item is Menu {
    return reflection.isInstance(item, Menu);
}

export interface Page extends AstNode {
    readonly $container: Menu;
    name: string
    title: string
    widgetWrappers: Array<WidgetWrapper>
}

export const Page = 'Page';

export function isPage(item: unknown): item is Page {
    return reflection.isInstance(item, Page);
}

export interface Theme extends AstNode {
    readonly $container: App;
    colors: Array<Color>
    name: string
}

export const Theme = 'Theme';

export function isTheme(item: unknown): item is Theme {
    return reflection.isInstance(item, Theme);
}

export interface Widget extends AstNode {
    readonly $container: WidgetWrapper;
    description: string
    name: string
    title: string
}

export const Widget = 'Widget';

export function isWidget(item: unknown): item is Widget {
    return reflection.isInstance(item, Widget);
}

export interface WidgetClassique extends AstNode {
    content: string
}

export const WidgetClassique = 'WidgetClassique';

export function isWidgetClassique(item: unknown): item is WidgetClassique {
    return reflection.isInstance(item, WidgetClassique);
}

export interface WidgetWrapper extends AstNode {
    readonly $container: Page;
    name: string
    widgets: Array<Widget>
    width: number
}

export const WidgetWrapper = 'WidgetWrapper';

export function isWidgetWrapper(item: unknown): item is WidgetWrapper {
    return reflection.isInstance(item, WidgetWrapper);
}

export type UxifierAstType = 'App' | 'Color' | 'Header' | 'Menu' | 'Page' | 'Theme' | 'Widget' | 'WidgetClassique' | 'WidgetWrapper';

export type UxifierAstReference = never;

export class UxifierAstReflection implements AstReflection {

    getAllTypes(): string[] {
        return ['App', 'Color', 'Header', 'Menu', 'Page', 'Theme', 'Widget', 'WidgetClassique', 'WidgetWrapper'];
    }

    isInstance(node: unknown, type: string): boolean {
        return isAstNode(node) && this.isSubtype(node.$type, type);
    }

    isSubtype(subtype: string, supertype: string): boolean {
        if (subtype === supertype) {
            return true;
        }
        switch (subtype) {
            default: {
                return false;
            }
        }
    }

    getReferenceType(referenceId: UxifierAstReference): string {
        switch (referenceId) {
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }
}

export const reflection = new UxifierAstReflection();
