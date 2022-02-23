grammar Uxifier
hidden(WS, SL_COMMENT, ML_COMMENT)

App:
    'app' name=ID 
        '{'
            "workingDirectory=>" path=STRING?
            theme=Theme
            header=Header
            hide=Hidden
            menu=Menu
            plugins=Plugins?
        '}';

Plugins:
    'plugins{'
            (modes+=ModeType)+
            '}';

ModeType:
    mode=Mode 'X' posX=Position;


Theme:
    'theme' name=ID 
        '{'
            'colors''{'
                (colors+=Color)+
            '}'
        '}';

Hidden:
    'hide' name=ID
        '{'
            (widgets+=AbstractWidget)*
        '}';


Color:
    'color' name=ID 'code' code=STRING;

Header: 
    'header' name=ID 'title' title=STRING 'logo' logo=STRING 'level' level=INT color=[Color|FQN];

AbstractWidget:
    ClassicWidget | LineChartWidget | PolarChartWidget | ColumnChartWidget;

ClassicWidget:
    'classic' name=ID;

ColumnChartWidget:
    'columnchart' name=ID
        ("{" ( optionsFilters=OptionsFilters )? ("column" "width" "measures" columnWidth=STRING)? ('downloadeable' downloadeable=STRING)? "}")?;

LineChartWidget: 
    'linechart' name=ID ("{" (optionsFilters=OptionsFilters)?  "}" )?;

PolarChartWidget:
    'polarchart' name=ID ("{"(optionsFilters=OptionsFilters )? "}" )?;

OptionsFilters: "filters" "on" "the" position=Position;

WidgetWrapper:
    'widgetWrapper' name=ID "width:" width=INT 'px' '{' 
        widgets+=Widget
        (widgets+=Widget)*
    '}';

Popup:
  'popup' name=ID "=>" popup=[AbstractWidget|FQN]? base=AbstractWidget;

Widget:
    AbstractWidget | Popup;

Page:
    'page' name=ID title=STRING '{' 
        widgetWrappers+=WidgetWrapper* 
        (platforms+=Platform*)?
    '}';

Platform:
    'platform' '[' screenSize=('small' | 'medium' | 'large') ']' ':' '{' lines+=Line* '}';

Line: 
    'line' widgetWrappers+=[WidgetWrapper|ID] ('|' widgetWrappers+=[WidgetWrapper|ID])*;


Menu:
    'menu' name=ID '{' 
        (pages+=Page)* 
    '}';

FQN:
    {FQN}
	ID ('.' ID)*
;

Position returns string: 'left' | 'top' | 'bottom' | 'right';

Mode returns string: 'DarkMode' | 'DaltonienMode' | 'VisionReduiteMode';

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;
terminal BOOLEAN: /([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;

terminal URL: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
