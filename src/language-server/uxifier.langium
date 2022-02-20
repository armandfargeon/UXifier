grammar Uxifier
hidden(WS, SL_COMMENT, ML_COMMENT)

App:
    'app' name=ID 
        '{'
            theme=Theme
            header=Header
            hide=Hidden
            menu=Menu
            
        '}';
Theme:
    'theme' name=ID 
        '{'
            'colors{' 
                colors+=Color
                (colors+=Color)*
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
    'header' name=ID 'title' title=STRING 'logo' logo=STRING 'level' level=INT;    

AbstractWidget:
    ClassicWidget | LineChartWidget | PolarChartWidget | ColumnChartWidget;

ClassicWidget:
    'classic' name=ID "icon:" icon=STRING;

ColumnChartWidget:
    'columnchart' name=ID 'downloadeable' downloadeable=STRING;

LineChartWidget:
    'linechart' name=ID "x:" x_axis=STRING "y:" y_axis=STRING ("filters:" (filters+=STRING ",")*)?;

PolarChartWidget:
    'polarchart' name=ID ("filters:" (filters+=STRING ",")*)?;

WidgetWrapper:
    'widgetWrapper' name=ID "width:" width=INT 'px' '{' 
        widgets+=Widget
        (widgets+=Widget)*
    '}';

Popup:
  'popup' name=ID  base=AbstractWidget "=>" popup=[AbstractWidget|FQN]?;

Widget:
    AbstractWidget | Popup;

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
