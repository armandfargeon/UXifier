/******************************************************************************
 * This file was generated by langium-cli 0.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { AstNode, AstReflection, Reference, isAstNode } from 'langium';

export interface AbstractWidget extends AstNode {
    readonly $container: WidgetWrapper;
    name: string
}

export const AbstractWidget = 'AbstractWidget';

export function isAbstractWidget(item: unknown): item is AbstractWidget {
    return reflection.isInstance(item, AbstractWidget);
}

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

export interface FQN extends AstNode {
}

export const FQN = 'FQN';

export function isFQN(item: unknown): item is FQN {
    return reflection.isInstance(item, FQN);
}

export interface Header extends AstNode {
    readonly $container: App;
    color: Reference<Color>
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

export interface WidgetWrapper extends AstNode {
    readonly $container: Page;
    name: string
    widgets: Array<AbstractWidget>
    width: number
}

export const WidgetWrapper = 'WidgetWrapper';

export function isWidgetWrapper(item: unknown): item is WidgetWrapper {
    return reflection.isInstance(item, WidgetWrapper);
}

export interface ClassicWidget extends AbstractWidget {
}

export const ClassicWidget = 'ClassicWidget';

export function isClassicWidget(item: unknown): item is ClassicWidget {
    return reflection.isInstance(item, ClassicWidget);
}

export interface ColumnChartWidget extends AbstractWidget {
    downloadeable: string
    position: Position
}

export const ColumnChartWidget = 'ColumnChartWidget';

export function isColumnChartWidget(item: unknown): item is ColumnChartWidget {
    return reflection.isInstance(item, ColumnChartWidget);
}

export interface LineChartWidget extends AbstractWidget {
    position: Position
}

export const LineChartWidget = 'LineChartWidget';

export function isLineChartWidget(item: unknown): item is LineChartWidget {
    return reflection.isInstance(item, LineChartWidget);
}

export interface PolarChartWidget extends AbstractWidget {
    position: Position
}

export const PolarChartWidget = 'PolarChartWidget';

export function isPolarChartWidget(item: unknown): item is PolarChartWidget {
    return reflection.isInstance(item, PolarChartWidget);
}

export type Position = 'left' | 'top' | 'bottom' | 'right'

export type UxifierAstType = 'AbstractWidget' | 'App' | 'Color' | 'FQN' | 'Header' | 'Menu' | 'Page' | 'Theme' | 'WidgetWrapper' | 'ClassicWidget' | 'ColumnChartWidget' | 'LineChartWidget' | 'PolarChartWidget';

export type UxifierAstReference = 'Header:color';

export class UxifierAstReflection implements AstReflection {

    getAllTypes(): string[] {
        return ['AbstractWidget', 'App', 'Color', 'FQN', 'Header', 'Menu', 'Page', 'Theme', 'WidgetWrapper', 'ClassicWidget', 'ColumnChartWidget', 'LineChartWidget', 'PolarChartWidget'];
    }

    isInstance(node: unknown, type: string): boolean {
        return isAstNode(node) && this.isSubtype(node.$type, type);
    }

    isSubtype(subtype: string, supertype: string): boolean {
        if (subtype === supertype) {
            return true;
        }
        switch (subtype) {
            case ClassicWidget:
            case ColumnChartWidget:
            case LineChartWidget:
            case PolarChartWidget: {
                return this.isSubtype(AbstractWidget, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(referenceId: UxifierAstReference): string {
        switch (referenceId) {
            case 'Header:color': {
                return Color;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }
}

export const reflection = new UxifierAstReflection();
