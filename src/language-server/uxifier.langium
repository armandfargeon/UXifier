grammar Uxifier
hidden(WS, SL_COMMENT, ML_COMMENT)

App:
    'app' name=ID 
        '{'
            theme=Theme
            header=Header
            menu=Menu
        '}';
Theme:
    'theme' name=ID 
        '{'
            'colors''{' 
                (colors+=Color)+
            '}'
        '}';

Color:
    'color' name=ID 'code' code=STRING;
//color=[Color|FQN]
Header: 
    'header' name=ID 'title' title=STRING 'logo' logo=STRING 'level' level=INT ; 

AbstractWidget:
    ClassicWidget | LineChartWidget | PolarChartWidget | ColumnChartWidget;

ClassicWidget:
    'classic' name=ID "icon:" icon=STRING;

ColumnChartWidget:
    'columnchart' name=ID 'downloadeable' downloadeable=STRING;

LineChartWidget:
    'linechart' name=ID;

PolarChartWidget:
    'polarchart' name=ID "{"
        "filters{"
            "position" position=STRING
        "}"
    "}";

WidgetWrapper:
    'widgetWrapper' name=ID "width:" width=INT 'px' '{' 
        widgets+=AbstractWidget
        (widgets+=AbstractWidget)*
    '}';

Page:
    'page' name=ID title=STRING '{' 
        widgetWrappers+=WidgetWrapper 
    '}';

Menu:
    'menu' name=ID '{' 
        (pages+=Page)* 
    '}';

FQN:
    {FQN}
	ID ('.' ID)*
;

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;
//terminal BOOLEAN: /([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;

terminal URL: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
